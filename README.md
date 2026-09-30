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
| `src/i18n/locales/<lang>/` | The same files translated: `zh` (Simplified Chinese), `id` (Bahasa Indonesia), `ms` (Bahasa Melayu), `th` (Thai), `vi` (Vietnamese) |
| `src/i18n/config.ts` | Supported languages, URL rules and the language suggestion text |
| `src/lib/site.ts` | Language-independent settings: emails, form endpoint, market codes, navigation |
| `src/views/` | One component per page, shared by every language |
| `src/app/(en)/` | English routes, served from the site root (`/about`) |
| `src/app/[lang]/` | Translated routes (`/zh/about`, `/th/about` ...) |
| `src/components/HeroVideo.tsx` | Homepage hero video (a vendor-neutral private AI appliance exploding into parts), with mobile cut and reduced-motion still |
| `tools/hero-video/` | The 3D renderer that produces the hero video (see its README) |
| `tools/whitepapers/` | Builds the five whitepaper PDFs from the English product data |
| `src/components/graphics/` | Hand-built SVG illustrations (stack, deployment, data flow, map) |
| `src/app/globals.css` | Design system: colours, type, layout, animation, language-specific typography |
| `public/.htaccess` | Hostinger rules: clean URLs, 301s from the old `.html` URLs, www redirect, caching, security headers |
| `src/app/llms.txt/route.ts` | Generates `/llms.txt`, the plain-text company summary for AI assistants |
| `scripts/extract-logo.py` | Regenerates the transparent logo and favicons from `brand/` |

## Languages

English lives at the root (`/solutions`); every other language has its own prefix (`/zh/solutions`). Each page
lists its translations with `hreflang` tags and in the sitemap, so search engines show the right language.
The header has a language menu, and first-time visitors whose browser uses another supported language see a
small bar offering that version (the site never redirects automatically). Whitepaper PDFs are English only.

To change text, edit the English file in `src/i18n/locales/en/` and the matching file in each language folder.
TypeScript and the build refuse a translation whose structure no longer matches English. For a deeper check
(markup, placeholders, dashes, untranslated leftovers) run:

```bash
node scripts/check-translations.mjs zh   # or id, ms, th, vi
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
- Open `/zh`, `/id`, `/ms`, `/th` and `/vi` and switch languages from the header menu.
- Submit `https://www.logicsonata.com/sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**
  (Bing's index also feeds ChatGPT search and Microsoft Copilot).
- Test structured data with Google's Rich Results Test (FAQ, JobPosting, Organization, Breadcrumbs).
- Send a test enquiry through `/contact` and confirm it arrives via Formspree.

## Forms

- **Consultation form** (`/contact`) posts to the existing Formspree endpoint set in `src/lib/site.ts`. Every form also sends a `language`
  field, and leads from translated pages carry the language code in the email subject (for example `[TH]`).
- **Job applications** (`/careers`) use the existing embedded Google Form.
