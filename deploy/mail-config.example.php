<?php
/**
 * Logic Sonata website email settings (keeps chat and careers emails out of spam).
 *
 * The website sends its emails by signing in to the mailboxes below on Hostinger's mail server,
 * so every message carries the domain's DKIM signature and passes SPF and DMARC.
 *
 * 1. Replace each placeholder with that mailbox's password (hPanel > Emails > the mailbox >
 *    change password if you do not know it; this is NOT your Hostinger account password).
 * 2. Save this file as mail-config.php.
 * 3. Upload it to the same "private" folder as chat-config.php (the folder that CONTAINS
 *    public_html, never inside it). Never email it and never commit it to GitHub.
 *
 * A mailbox left as a placeholder keeps the old sending method (PHP mail()), so nothing breaks.
 * If you change a mailbox password in hPanel later, update it here too.
 */

return [
    'host' => 'smtp.hostinger.com',
    'port' => 465,

    'passwords' => [
        'sales@logicsonata.com' => 'PASTE-THE-SALES-MAILBOX-PASSWORD',     // chat demo requests and transcripts
        'careers@logicsonata.com' => 'PASTE-THE-CAREERS-MAILBOX-PASSWORD', // job applications
    ],
];
