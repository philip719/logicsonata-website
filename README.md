# Logic Sonata website

Corporate website for [www.logicsonata.com](https://www.logicsonata.com): secure private AI for businesses in
Singapore, Vietnam, Indonesia, Malaysia and Thailand.

Built with **Next.js (React)** as a **static export**. Every page is pre-rendered to complete HTML, so search
engines and AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) can read all content without
running JavaScript, and the site runs on standard Hostinger shared hosting with no Node.js server.

## Project structure

| Path | What it holds |
| --- | --- |
| `src/i18n/locales/en/` | **All English text**: one file per page plus `common.ts` (navigation, footer, forms), `data.ts` (FAQ, markets, stack, industries) and `products.ts` (the five products) |
| `src/i18n/locales/<lang>/` | The same files translated: `cn` (Simplified Chinese), `id` (Bahasa Indonesia), `my` (Bahasa Melayu), `th` (Thai), `vn` (Vietnamese) |
| `src/i18n/config.ts` | Supported languages, URL rules and the language suggestion text |
| `src/lib/site.ts` | Language-independent settings: emails, form endpoint, market codes, navigation |
| `src/views/` | One component per page, shared by every language |
| `src/app/(en)/` | English routes, served from the site root (`/about`) |
| `src/app/[lang]/` | Translated routes (`/cn/about`, `/th/about` ...) |
| `src/components/HeroVideo.tsx` | Homepage hero video (a vendor-neutral private AI appliance exploding into parts), with mobile cut and reduced-motion still |
| `tools/hero-video/` | The 3D renderer that produces the hero video (see its README) |
| `tools/whitepapers/` | Builds the five whitepaper PDFs from the English product data |
| `src/components/graphics/` | Hand-built SVG illustrations (stack, deployment, data flow, map) |
| `src/app/globals.css` | Design system: colours, type, layout, animation, language-specific typography |
| `public/.htaccess` | Hostinger rules: clean URLs, 301s from the old `.html` URLs, www redirect, caching, security headers |
| `src/app/llms.txt/route.ts` | Generates `/llms.txt`, the plain-text company summary for AI assistants |
| `scripts/extract-logo.py` | Regenerates the transparent logo and favicons from `brand/` |
| `brand/kit/` | Generator for the full brand kit: vector logos, stationery, Office templates, social images (see its README) |
| `public/brand/` | Hosted brand files, such as the email signature logo |
| `public/api/` | PHP for Hostinger: `apply.php` (job applications) and `chat.php` (the chat assistant) |
| `deploy/chat-config.example.php` | Template for the chat assistant's private settings file (API key, inbox, limits) |

## Languages

English lives at the root (`/solutions`); every other language has its own prefix (`/cn/solutions`). Each page
lists its translations with `hreflang` tags and in the sitemap, so search engines show the right language.
The header has a language menu, and first-time visitors whose browser uses another supported language see a
small bar offering that version (the site never redirects automatically). Whitepaper PDFs are English only.

To change text, edit the English file in `src/i18n/locales/en/` and the matching file in each language folder.
TypeScript and the build refuse a translation whose structure no longer matches English. For a deeper check
(markup, placeholders, dashes, untranslated leftovers) run:

```bash
node scripts/check-translations.mjs cn   # or id, my, th, vn
```

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type-check
npm run build    # writes the static site to ./out
```

## Deploying to Hostinger

### Option A: manual upload

1. Run `npm run build`.
2. In hPanel, open **File Manager > public_html**. Back up the current files first (select all, then Compress).
3. Upload the **contents** of `out/` (not the folder itself) into `public_html`, replacing existing files.
   Make sure the hidden `.htaccess` file is included.

### Option B: automatic deploys with GitHub Actions

1. In hPanel, go to **Files > FTP Accounts** and create a dedicated FTP account limited to `public_html`.
2. In GitHub, go to **Settings > Secrets and variables > Actions** and add:
   `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME`, `HOSTINGER_FTP_PASSWORD`.
   If the FTP account's root is already `public_html`, add a variable `HOSTINGER_FTP_DIR` set to `./`.
3. Every push to `main` then builds and deploys the site. Pull requests are built and type-checked only.

## After launch

- hPanel > **Security > SSL**: make sure **Force HTTPS** is on (the `.htaccess` relies on it).
- Check that `/about.html` redirects to `/about` and that `logicsonata.com` redirects to `www.logicsonata.com`.
- Open `/cn`, `/id`, `/my`, `/th` and `/vn` and switch languages from the header menu.
- Submit `https://www.logicsonata.com/sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**
  (Bing's index also feeds ChatGPT search and Microsoft Copilot).
- Test structured data with Google's Rich Results Test (FAQ, JobPosting, Organization, Breadcrumbs).
- Send a test enquiry through `/contact` and confirm it arrives via Formspree.
- Submit a test job application with a small PDF through `/careers` and confirm it reaches `careers@logicsonata.com`.

## Forms

- **Consultation form** (`/contact`) posts to the existing Formspree endpoint set in `src/lib/site.ts`. Every form also sends a `language`
  field, and leads from translated pages carry the language code in the email subject (for example `[TH]`).
- **Job applications** (`/careers`) use the site's own form. It posts to `public/api/apply.php`, a small PHP
  script that runs on the Hostinger plan and emails each application, with the CV attached, to
  `careers@logicsonata.com`. The script accepts PDF or Word files up to 5 MB, checks the real file type,
  blocks header injection and spam bots, limits each visitor to 5 applications per hour, and stores nothing
  on the server. The mailbox `careers@logicsonata.com` must exist in Hostinger Email, because it is also the
  sender address (this keeps the messages out of spam). To change the inbox, edit `TO_ADDRESS` and
  `FROM_ADDRESS` at the top of `apply.php`.
- **Email delivery** (job applications and chat emails): `public/api/mailer.php` signs in to the sender's
  mailbox on `smtp.hostinger.com` (port 465), so messages carry the domain's DKIM signature and pass SPF and
  DMARC instead of landing in spam. The mailbox passwords go in `mail-config.php` in the private folder beside
  `public_html` (template: `deploy/mail-config.example.php`). Without a password, or if the SMTP login fails,
  the scripts fall back to PHP `mail()`; the reason is written to the PHP error log, never the password.

## Chat assistant

An AI assistant answers visitors in all six languages, qualifies them and invites good prospects to book a
free demo. Before the conversation opens, the assistant asks a few quick questions in the chat itself, one at a
time: name and email (required), then company and country (each with a Skip button; country also as tap buttons).
Every answer is checked as it comes in (`src/lib/contactChecks.ts`, repeated on the server):

- **Name:** must contain letters and no email address, web address or digits. A greeting ("hi") is met with the
  question again; a question typed instead of a name is remembered and answered once the details are in.
- **Email:** must be in the form name@domain.com. Common typos are caught with a suggestion ("Did you mean
  jane@gmail.com?", "acme.con" becomes "acme.com"), and the server confirms the domain can receive email
  (MX or address record). If the server's DNS is down, addresses are accepted rather than visitors blocked.
- **Contact number:** offered only when booking the demo; optional, 7 to 15 digits, country code allowed.

A one-line notice under the email question explains how the email is used; sharing it is the visitor's consent.
Returning visitors see "Welcome back" with their saved details and continue with one tap. The assistant is given
the name, company and country (never the email or phone) and learns the job role during the conversation.

Sales (`sales@logicsonata.com`) receives two kinds of email:

- **Demo request**, sent the moment a visitor confirms the one-click demo offer (with an optional preferred
  time): contact details, lead grade (hot, warm or cold), qualification, AI summary and the conversation.
- **Website chat**, sent when the visitor closes the chat, switches away or leaves the site: the same layout,
  graded and summarised by AI at that point. If the visitor comes back and continues, an update with the full
  conversation follows under the same subject, so mail apps group it. Nothing is sent when there is nothing new.

- **Widget:** `src/components/ChatLauncher.tsx` (the button, loaded on every page) and `ChatPanel.tsx` (the
  conversation, downloaded only when a visitor opens it). Interface text is in the `chat` section of each
  `common.ts` dictionary.
- **Server:** `public/api/chat.php` calls the AI model, enforces limits (per visitor and per day) and sends the
  sales emails. The assistant's instructions (goals, qualifying questions, tone, when to offer the demo) are the
  `INSTRUCTIONS` text at the top of that file.
- **Knowledge:** `src/app/api/chat-knowledge.txt/route.ts` builds the assistant's reference text from the
  English site content at every build, so it never drifts from the website. `.htaccess` blocks it from the web.
- **Settings and key:** copy `deploy/chat-config.example.php` to `chat-config.php`, add the API key and upload it
  to a `private` folder beside `public_html` on Hostinger. The key is never stored in this repository. Until a
  valid key is installed the chat button simply does not appear.
- **Privacy:** conversations are not stored on the website server. Visitor messages are processed by the AI
  provider to generate replies and summaries; the only record kept is the email to sales, sent with the consent
  given at the start of the chat. Contact details are remembered in the visitor's own browser so returning
  visitors only need to confirm them.
- **Own appliance:** set `provider` to `openai` and `api_url` to any OpenAI-compatible server (for example a
  Logic Sonata appliance running vLLM or Ollama) to run the assistant on private infrastructure.
