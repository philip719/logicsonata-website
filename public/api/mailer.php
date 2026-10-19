<?php
/**
 * Logic Sonata website email: sends through Hostinger's authenticated SMTP server, so every message
 * is signed with the domain's DKIM key and passes SPF and DMARC (PHP's mail() is not signed and often
 * lands in spam). Used by chat.php and apply.php.
 *
 * The mailbox passwords live in mail-config.php in the private folder beside public_html (template:
 * deploy/mail-config.example.php). A sender without a password, or an SMTP failure, falls back to
 * PHP's mail() so a lead is never lost.
 */

declare(strict_types=1);

/**
 * Header text such as a subject or display name: plain when it is simple ASCII, otherwise UTF-8 encoded.
 * Needless encoding of plain English is one of the signals spam filters score.
 */
function mail_header_text(string $text, bool $displayName = false): string
{
    $text = trim((string)preg_replace('/[\x00-\x1F\x7F]+/', ' ', $text)); // never a line break in a header
    if (preg_match('/^[\x20-\x7E]*$/', $text) === 1) {
        return $displayName ? '"' . str_replace(['\\', '"'], '', $text) . '"' : $text;
    }
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/** SMTP settings: defaults, overridden by the private mail-config.php. */
function mail_settings(): array
{
    $defaults = ['host' => 'smtp.hostinger.com', 'port' => 465, 'passwords' => []];
    $candidates = [
        (string)getenv('LS_MAIL_CONFIG'),
        dirname(__DIR__, 2) . '/private/mail-config.php', // beside public_html: never reachable from the web
        __DIR__ . '/mail-config.php',                       // fallback; blocked from the web by .htaccess
    ];
    foreach ($candidates as $file) {
        if ($file !== '' && @is_file($file)) {
            $loaded = require $file;
            if (is_array($loaded)) {
                return array_merge($defaults, $loaded);
            }
        }
    }
    return $defaults;
}

/**
 * Sends one email. $subject is already encoded; $headers are complete header lines (From, Reply-To,
 * MIME and content headers, optional Message-ID). Returns true once the message is accepted.
 */
function ls_send_mail(string $from, string $to, string $subject, string $body, array $headers): bool
{
    $cfg = mail_settings();
    $password = (string)($cfg['passwords'][$from] ?? '');
    if ($password !== '' && !str_starts_with($password, 'PASTE')) { // the template's placeholder
        $hasId = (bool)preg_grep('/^Message-ID:/i', $headers);
        $message = implode("\r\n", array_merge(
            ['Date: ' . date('r'), 'To: ' . $to, 'Subject: ' . $subject],
            $hasId ? [] : ['Message-ID: <' . bin2hex(random_bytes(12)) . '@logicsonata.com>'],
            $headers
        )) . "\r\n\r\n" . $body;
        if (smtp_send((string)$cfg['host'], (int)$cfg['port'], $from, $password, $to, $message)) {
            return true;
        }
        error_log('Logic Sonata mail: SMTP failed, falling back to mail()');
    }
    return mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $from);
}

/** A minimal SMTP client: implicit TLS on port 465, STARTTLS on 587, AUTH LOGIN with the mailbox. */
function smtp_send(string $host, int $port, string $user, string $password, string $to, string $message): bool
{
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host]]);
    $socket = @stream_socket_client(($port === 465 ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $error, 15, STREAM_CLIENT_CONNECT, $context);
    if ($socket === false) {
        error_log('Logic Sonata mail: cannot reach ' . $host . ':' . $port . ' (' . $error . ')');
        return false;
    }
    stream_set_timeout($socket, 30);

    $write = static function (string $data) use ($socket): bool {
        for ($done = 0, $len = strlen($data); $done < $len; $done += $sent) {
            $sent = fwrite($socket, substr($data, $done, 65536));
            if ($sent === false || $sent === 0) {
                return false;
            }
        }
        return true;
    };
    // Sends a command (logged by its label only, never its content) and checks the reply code.
    $step = static function (string $label, ?string $line, array $expect) use ($socket, $write): bool {
        if ($line !== null && !$write($line . "\r\n")) {
            return false;
        }
        $code = 0;
        $reply = '';
        while (($row = fgets($socket, 2048)) !== false) {
            $reply .= $row;
            $code = (int)substr($row, 0, 3);
            if (strlen($row) < 4 || $row[3] !== '-') {
                break;
            }
        }
        if (!in_array($code, $expect, true)) {
            error_log('Logic Sonata mail: SMTP ' . $label . ' refused: ' . trim(substr($reply, 0, 300)));
            return false;
        }
        return true;
    };

    $ehlo = 'EHLO ' . preg_replace('/[^a-z0-9.-]/i', '', (string)($_SERVER['SERVER_NAME'] ?? 'logicsonata.com'));
    $ok = $step('greeting', null, [220]) && $step('EHLO', $ehlo, [250]);
    if ($ok && $port !== 465) {
        $ok = $step('STARTTLS', 'STARTTLS', [220])
            && stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $step('EHLO', $ehlo, [250]);
    }
    // Lines starting with a dot are doubled, as SMTP requires; all line endings become CRLF.
    $data = preg_replace('/^\./m', '..', (string)preg_replace("/\r?\n/", "\r\n", rtrim($message, "\r\n")));
    $ok = $ok
        && $step('AUTH', 'AUTH LOGIN', [334])
        && $step('user', base64_encode($user), [334])
        && $step('password', base64_encode($password), [235])
        && $step('MAIL FROM', 'MAIL FROM:<' . $user . '>', [250])
        && $step('RCPT TO', 'RCPT TO:<' . $to . '>', [250, 251])
        && $step('DATA', 'DATA', [354])
        && $step('message', $data . "\r\n.", [250]);
    if ($ok) {
        $write("QUIT\r\n");
    }
    fclose($socket);
    return $ok;
}
