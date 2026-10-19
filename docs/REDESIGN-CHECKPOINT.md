# Redesign checkpoint (2026-10-19)

Read this first when continuing the Logic Sonata website redesign in a new session.

## 1. Project facts

- Site: www.logicsonata.com, Next.js 16 static export (`npm run build` → `out/`), six languages (en, cn, id, my, th, vn),
  translations checked with `node scripts/check-translations.mjs <lang>`.
- Hosting: Hostinger shared hosting (LiteSpeed). Deploy = zip `out/` → user uploads to `public_html` in File Manager and
  extracts with overwrite. The server keeps `public_html/api/chat-config.php` and `public_html/api/mail-config.php`
  (not in the repo, never in the zip, blocked by `.htaccess`).
- Repo: github.com/philip719/logicsonata-website (public), branch `main`. Deliverables are copied to
  `/home/user/monsters-rolodex/deliverables` in the Claude session.
- Owner preferences: professional business English, no em dashes anywhere, ask clarifying questions until ~95% sure,
  show visuals (mockups) before deploying, checkpoint progress as context grows.

## 2. Live state (all working, verified 2026-10-19)

- Chat assistant (`public/api/chat.php`, Claude only). Knowledge built from site content
  (`src/app/api/chat-knowledge.txt/route.ts`) incl. live demo and "beyond standard RAG" capabilities.
- Email: `public/api/mailer.php` sends via Hostinger SMTP with app passwords (2FA mailboxes) from
  `mail-config.php`; DKIM/SPF/DMARC pass; DMARC policy `quarantine`. Bodies quoted-printable. Hostinger webmail filter
  on philip.lee@ moves website mail to Inbox. Optional later: DMARC `p=reject`.
- Hero: photoreal Blender render (`tools/hero-render`), still image (owner prefers image over video).
- DGX Spark (spark-2d83, via Desktop Commander): website AI fully removed. Read-only by agreement except tasks the owner
  approves. Never touch the LSAI stacks (12000/12002/12003). Spark use approved for: screenshots of reference sites,
  Unsplash photo sourcing. Always delete temporary files there afterwards.

## 3. Redesign brief (owner decisions)

- Theme: dystopian / cyberpunk future. "Borrow heavily from Arago (arago.inc) but theme with thenewaura (thenewaura.ca)."
- Colours: keep LS signal red (#ff3b30) as the brand colour (logo, primary CTAs) + ONE neon accent (acid cyan/teal,
  thenewaura style) on near-black teal backgrounds with HUD greys.
- Scope: whole site, all six languages. Homepage first as mockups for sign-off, then roll out.
- Effects: bold but business-safe (big type, glitch/decode headlines, scanlines/grain, HUD frames and readouts, scroll
  reveals, marquees). Must respect `prefers-reduced-motion`, stay fast on phones. No custom cursor / heavy WebGL.
- Imagery: "a lot of photos", real photographs (not illustrations). Source: Unsplash (free commercial licence, no
  attribution required), downloaded and graded into one red/cyan cyberpunk look. Exclude Unsplash+ / premium photos.
- Arago-style scroll story: YES, as a scroll-scrubbed pre-rendered frame sequence from Blender (chip close-up →
  appliance assembling → inside a server rack). Hero itself stays a still image. Budget ~2-3 MB, lazy-loaded.

## 4. What the references contribute

| Site | Borrow |
| --- | --- |
| arago.inc (primary structure) | Scroll-driven story around one hero object (iridescent photonic chip → data centre racks → drawer slides out revealing the chip). Minimal text per screen, "Scroll to discover", sections Introduction / Specificity / Advantages / Team / Contact. Macro chip photography (iridescent wafer). |
| thenewaura.ca (theme) | Teal-black, neon cyan, wide uppercase grotesque, bracket labels `[_SELECTED WORK]`, counters `[_001 / _003]`, chamfered (cut-corner) cards, tick-mark rulers / scroll scales, cinematic full-bleed photos, circular "VIEW" badge on hover, pill buttons, horizontal photo carousel. |
| trionn.com | Headline decode-in, paragraph colour-fill on scroll (grey → white per word), giant marquee words with + separators, dark → light section flips, stats cards. |
| caeli-energie.com | Product in front of giant type, product placed in real environments, tabbed list with photo swap. |
| fantik.studio, brik.space | Pixel/mono micro-type, HUD dotted rails, `{ braces }` labels, sticky list that swaps photos. |

## 5. Planned design system

- Tokens: bg `#05090b` (teal-black), surface `#0a1215`, line `rgba(62,240,224,0.14)`, text `#e9f1f0`, muted `#8aa3a1`,
  red `#ff3b30` (brand/CTA), cyan `#3ef0e0` (HUD/accents/links), warning amber sparingly.
- Type: display = wide uppercase grotesque (self-hosted; current fonts are local via `next/font/local` in
  `src/lib/fonts.ts`; add a wide/expanded face, e.g. Archivo Expanded or Unbounded, as local woff2), body = Inter,
  labels = JetBrains Mono uppercase with `[_ ]` brackets. Thai/Chinese/Vietnamese fallbacks must still render.
- Components: chamfered HUD cards (CSS clip-path), bracket section labels + counters, tick rulers, scanline + grain
  overlay, glitch/decode headline (JS, reduced-motion safe), word-fill paragraph on scroll, marquee band, photo cards with
  VIEW badge, horizontal snap carousel, stats readouts, red primary + cyan ghost buttons.
- Homepage (Arago order): hero still (render, relit cyberpunk) + "Scroll to discover" → introduction statement (word
  fill) → scroll-scrubbed story (chip → appliance → rack) → specificity (products as HUD cards with photos) →
  advantages / deployment (photo carousel, Southeast Asia cities) → stats readouts → whitepapers → CTA band.
- Hero render: re-light `tools/hero-render/render.py` in cyberpunk style (teal + red neon rims, wet reflective floor,
  haze), keep labels.

## 6. Photo plan (Unsplash)

Queries: Bangkok / Singapore / Kuala Lumpur / Jakarta / Ho Chi Minh City at night (neon), Hong Kong neon street,
neon rain street, server room, data center aisle, microchip / silicon wafer macro, circuit board macro, engineer in server
room, person at screens in the dark, factory automation / robot arm, warehouse at night, CCTV camera at night, code on
screen dark, office at night city view. ~25-35 final photos. Keep a manifest (id, photographer, URL) in
`tools/photos/manifest.json`. Grade consistently (teal shadows, red/cyan highlights, grain), export WebP 1x/2x.

## 7. Blocker and how to continue

The Claude cloud environment blocks unsplash.com, and the Spark has no GitHub credentials, so photos cannot reach the
session. Owner action: add `unsplash.com` and `images.unsplash.com` under Allowed domains in this cloud environment's
Network access settings (environment menu in the session title bar → Edit; keep "Allow package managers" ticked), then
start a new session and say "continue the redesign from docs/REDESIGN-CHECKPOINT.md".

## 8. Next steps (in order)

1. Source photos from Unsplash directly in the session (search API `unsplash.com/napi/search/photos?query=...`, skip
   `premium`/`plus`), build contact sheets, pick, grade, manifest.
2. Re-light the hero render (cyberpunk), render the scroll-story frame sequence (~48-72 frames, CPU ~1-2 h).
3. Build the new design system + homepage; screenshot desktop and phone mockups plus one inner page (Solutions or a
   product page) and send them to the owner for approval BEFORE deploying.
4. After approval: roll out to all pages and languages, QA (tsc, build, translations check, Lighthouse, reduced motion,
   phones), commit, push, zip, owner uploads.
