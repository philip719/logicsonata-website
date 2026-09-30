<?php
/**
 * Logic Sonata job applications.
 *
 * Receives the careers form (details plus a CV file) and emails it, with the CV
 * attached, to the careers inbox. Nothing is stored on the server: the upload
 * only lives in PHP's temporary folder for the length of the request.
 *
 * Runs on Hostinger's standard PHP. The From address must be a real mailbox on
 * the logicsonata.com domain so the message passes SPF and lands in the inbox.
 */

declare(strict_types=1);

const TO_ADDRESS = 'careers@logicsonata.com';
const FROM_ADDRESS = 'careers@logicsonata.com';
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/x-ole-storage', 'application/CDFV2'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'],
];
const ALLOWED_ORIGINS = ['https://www.logicsonata.com', 'https://logicsonata.com'];
const RATE_LIMIT = 5;          // applications per IP address...
const RATE_WINDOW = 3600;      // ...per hour

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

/** Ends the request with a JSON result, or a redirect back to the page for non-JavaScript visitors. */
function finish(bool $ok, string $code = 'ok', int $status = 200): never
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($ok ? 200 : $status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $ok ? null : $code]);
        exit;
    }
    $back = (string)($_POST['return'] ?? '/careers');
    if (!preg_match('#^/[a-z0-9/_-]*$#i', $back)) {
        $back = '/careers';
    }
    header('Location: ' . $back . ($ok ? '?applied=1' : '?apply_error=' . rawurlencode($code)) . '#apply', true, 303);
    exit;
}

/** Single-line header value: strips line breaks so nothing can be injected into mail headers. */
function clean_line(string $v, int $max = 200): string
{
    $v = trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? '');
    return mb_substr($v, 0, $max);
}

function field(string $name, int $max = 200): string
{
    return clean_line((string)($_POST[$name] ?? ''), $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    finish(false, 'method', 405);
}

// Only accept submissions from the website itself.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$localTest = preg_match('/^(localhost|127\.0\.0\.1)(:\d+)?$/', $_SERVER['HTTP_HOST'] ?? '') === 1;
if ($origin !== '' && !$localTest && !in_array(rtrim($origin, '/'), ALLOWED_ORIGINS, true)) {
    finish(false, 'origin', 403);
}

// Bots fill the hidden field; pretend success so they learn nothing.
if (($_POST['_gotcha'] ?? '') !== '') {
    finish(true);
}

// Simple per-IP rate limit, kept in the server's temporary folder.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/ls-apply-' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
    array_map('intval', is_file($bucket) ? (array)file($bucket, FILE_IGNORE_NEW_LINES) : []),
    static fn(int $t): bool => $t > $now - RATE_WINDOW
);
if (count($hits) >= RATE_LIMIT) {
    finish(false, 'rate', 429);
}

$name = field('name', 120);
$email = field('email', 200);
$phone = field('phone', 60);
$country = field('country', 80);
$position = field('position', 160);
$linkedin = field('linkedin', 300);
$language = field('language', 10);
$message = mb_substr(trim((string)($_POST['message'] ?? '')), 0, 4000);
$consent = ($_POST['consent'] ?? '') === 'yes';

if ($name === '' || $country === '' || $position === '' || !$consent) {
    finish(false, 'missing', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    finish(false, 'email', 422);
}
if ($linkedin !== '' && !preg_match('#^https?://#i', $linkedin)) {
    $linkedin = 'https://' . $linkedin;
}

// Validate the CV: present, uploaded through PHP, small enough, and really a PDF or Word file.
$file = $_FILES['cv'] ?? null;
if (!$file || !isset($file['error']) || is_array($file['error'])) {
    finish(false, 'file_missing', 422);
}
if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE || $file['size'] > MAX_BYTES) {
    finish(false, 'file_size', 413);
}
if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
    finish(false, 'file_missing', 422);
}
$ext = strtolower(pathinfo((string)$file['name'], PATHINFO_EXTENSION));
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']) ?: '';
if (!isset(ALLOWED[$ext]) || !in_array($mime, ALLOWED[$ext], true)) {
    finish(false, 'file_type', 415);
}
$data = file_get_contents($file['tmp_name']);
if ($data === false) {
    finish(false, 'server', 500);
}

// Safe attachment name: "CV - Jane Tan.pdf" style, ASCII only.
$ascii = function_exists('iconv') ? (string)@iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $name) : $name;
$safeName = trim(preg_replace('/[^A-Za-z0-9 ._-]+/', '', $ascii) ?? '') ?: 'Applicant';
$attachmentName = 'CV - ' . trim(mb_substr($safeName, 0, 60)) . '.' . $ext;

$lines = [
    'New job application from the Logic Sonata website.',
    '',
    'Position:  ' . $position,
    'Name:      ' . $name,
    'Email:     ' . $email,
    'Phone:     ' . ($phone !== '' ? $phone : '-'),
    'Country:   ' . $country,
    'LinkedIn:  ' . ($linkedin !== '' ? $linkedin : '-'),
    'Language:  ' . ($language !== '' ? strtoupper($language) : 'EN'),
    'Consent:   Applicant agreed to Logic Sonata processing this application.',
    '',
    'Message:',
    $message !== '' ? $message : '-',
    '',
    'The CV is attached (' . $attachmentName . ', ' . number_format($file['size'] / 1024, 0) . ' KB).',
];
$body = implode("\r\n", $lines);

$tag = ($language !== '' && strtolower($language) !== 'en') ? ' [' . strtoupper($language) . ']' : '';
$subject = 'Job application: ' . $position . ' - ' . $name . $tag;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$boundary = 'ls-' . bin2hex(random_bytes(12));
$headers = implode("\r\n", [
    'From: Logic Sonata Careers <' . FROM_ADDRESS . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    'X-Mailer: LogicSonata-Careers',
]);

$mimeType = $ext === 'pdf' ? 'application/pdf' : ($ext === 'doc' ? 'application/msword' : ALLOWED['docx'][0]);
$payload = implode("\r\n", [
    '--' . $boundary,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    chunk_split(base64_encode($body)),
    '--' . $boundary,
    'Content-Type: ' . $mimeType . '; name="' . $attachmentName . '"',
    'Content-Transfer-Encoding: base64',
    'Content-Disposition: attachment; filename="' . $attachmentName . '"',
    '',
    chunk_split(base64_encode($data)),
    '--' . $boundary . '--',
    '',
]);

$sent = mail(TO_ADDRESS, $encodedSubject, $payload, $headers, '-f' . FROM_ADDRESS);
if (!$sent) {
    finish(false, 'server', 500);
}

$hits[] = $now;
@file_put_contents($bucket, implode("\n", $hits), LOCK_EX);
finish(true);
