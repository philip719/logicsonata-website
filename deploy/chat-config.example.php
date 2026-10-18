<?php
/**
 * Logic Sonata chat assistant settings.
 *
 * 1. Replace the placeholder below with your Anthropic API key (console.anthropic.com > API keys).
 * 2. Save this file as chat-config.php.
 * 3. In Hostinger File Manager, open the folder that CONTAINS public_html (domains/logicsonata.com),
 *    create a folder named "private" there, and upload chat-config.php into it.
 *    Never put this file inside public_html, never email it, and never commit it to GitHub.
 *
 * The chat button appears on the website only once a valid key is in place.
 * To switch the assistant off, rename or delete this file.
 */

return [
    'api_key' => 'PASTE-YOUR-ANTHROPIC-API-KEY-HERE',

    // claude-sonnet-5-5 gives the best answers; claude-haiku-5-5 is faster and costs less.
    'model' => 'claude-sonnet-5-5',

    // Where demo requests and chat summaries are emailed, and the sender address (must be a real Hostinger mailbox).
    'sales_to' => 'sales@logicsonata.com',
    'mail_from' => 'sales@logicsonata.com',

    // Cost and abuse protection.
    'daily_limit' => 1500,          // messages per day across all visitors
    'messages_per_ip_hour' => 40,   // messages per visitor per hour
    'leads_per_ip_hour' => 5,       // demo requests per visitor per hour

    // Optional, for later: run the assistant on your own private AI appliance instead
    // (any OpenAI-compatible server, such as vLLM or Ollama, reachable from Hostinger).
    // 'provider' => 'openai',
    // 'api_url' => 'https://your-appliance.example.com/v1/chat/completions',
    // 'model' => 'your-model-name',
];
