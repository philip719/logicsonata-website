# Redesign checkpoint (redesign LIVE since 2026-10-19; last update 2026-10-21)

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
- Imagery: "a lot of photos", photographic (not illustrations). Source changed to generated imagery on Comfy Cloud
  (Flux.1 Krea dev stills, Wan 2.2 video), graded into one red/cyan look (section 6).
- Arago-style scroll story: YES, as a scroll-scrubbed frame sequence from three Wan 2.2 clips (chip close-up →
  appliance assembling → server rack drawer). Hero itself stays a still image. Budget ~2-3 MB, lazy-loaded.

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

## 6. Imagery (Comfy Cloud, generated 2026-10-19)

Unsplash was dropped. All stills and videos are generated on Comfy Cloud (owner's Creator plan). The agent proxy adds
the `X-API-Key` header on cloud.comfy.org; no key lives in the repo or the environment.

- Client and tools: `tools/photos/` (`comfy.py` API client, `flux.py` Flux Krea workflows and prompt-pack parser,
  `wan.py` Wan 2.2 I2V/FLF workflows, `batch.py` 3-at-a-time runner, `sheet.py` contact sheets, `grade.py` brand
  grade, `finish.py` upscale + grade + WebP export + manifest). Prompt pack and hero sources: monsters-rolodex branch
  `claude/quirky-sagan-t2zhaz`, `deliverables/`.
- Credits: balance read via `GET /api/billing/usage/timeseries` (`summary.balance.amount_cents`). Start $35.08.
  One Flux still (28 steps, 1536x864) ~ $0.02; all stills incl. rerolls and upscales cost $1.54.
- Output: `public/images/photos/<slug>-{768,1536,3072}.webp`, manifest `tools/photos/manifest.json` (35 shots).
  Raw takes live only in the session (`/home/user/comfy/raw`), not in the repo.
- Decisions: HOME-01 = img2img seed 102 denoise 0.40 (0.45 deforms screws/grilles). HW-05 = assembled source, seed
  102, denoise 0.35, mangled lid logo retouched out (HOME-01 lid is blank too). CITY-SG: Flux always invents spires;
  replaced by an owner-supplied Marina Bay photograph (card focal point 64% in `src/lib/photos.ts`). CITY-BKK: reprompted without shops (sign gibberish). CITY-SZ: all
  takes show wrong landmarks; parked (not in the five-market carousel). SERV-01, PART-01, CAR-02, PROD-CA-WIDE
  re-prompted as Southeast Asian people. PROD-KA-CLOSE re-prompted for a text-free screen.

## 6b. Code state (uncommitted until owner approval of mockups)

- Tokens/fonts: `src/app/globals.css` :root retheme (teal-black, cyan accent), display font Archivo variable
  (width axis, `src/fonts/archivo-latin-wdth-normal.woff2` + `public/fonts/archivo-vietnamese-wdth-normal.woff2`),
  Space Grotesk removed.
- `src/app/cyber.css`: HUD layer (scanlines/grain, bracket labels, pills, chamfer, homepage sections xh/intro/story/
  xp/xd/xm/xs/xmq/xc, page-hero--photo, reduced motion).
- New components: `Photo`, `Statement` (word fill), `Fx` (decode + fill), `ScrollStory` (canvas frame sequence,
  expects `/images/story/{1280,720}/fNNN.webp` + `/images/story/poster.webp`, frame count in Home.tsx).
- `src/views/Home.tsx` rebuilt. New EN keys in `home.ts`; other locales carry English placeholders marked
  `TODO(redesign)` (translate at rollout).
- Mockup capture: `/home/user/shots/sections.js` (Playwright, per-section, eager images).

## 8. Next steps (in order)

1. DONE: stills (section 6).
2. DONE: videos. 9 Wan clips rendered (VID-01 rerolled). Real cost about $0.91 per 5 s clip (billing lags; the
   first reading looked like $0.22). Balance after all imagery: $25.35 of $35.08. Story: 136 frames, 2.52 MB desktop,
   1.08 MB phone. Loops in `public/video` (0.2 MB each). VID-07 (hero motion) and VID-08 (markets flyover) are not
   used. Mockups sent to the owner: `docs/mockups/` (2026-10-19). Owner approved the mockups (2026-10-19) and supplied the CITY-SG photo. Next: rollout (step 4).
   Rollout progress: homepage text translated (all 5 locales pass check-translations); photo heroes on About,
   Services, Partners, Investors, Careers, Solutions, Whitepapers, product pages; Contact uses a dimmed backdrop.
   Jakarta: owner-supplied photo (tokopedia sign retouched out, card focus 22%). Bangkok: owner-supplied Wat Arun photo, graded at 0.6. Ho Chi Minh City: owner-supplied Landmark 81 aerial photo (card focus 66%). All five market cards are real photos.
   QA done 2026-10-19: tsc, build, check-translations x5, no missing assets (116 pages), no horizontal overflow at
   360 px on 60 page/language combinations, 0 JS errors, reduced motion verified (no frame/video downloads),
   Lighthouse home: CLS 0, best practices/SEO 100, accessibility 96 (pre-existing lang-switch label). Decode effect
   moved to an overlay layer (was causing CLS 0.56). Zip `logicsonata-site-redesign.zip` (34.5 MB) handed to owner.
   LIVE 2026-10-19 (owner uploaded). Production Lighthouse (mobile): home perf 79, product page 81; accessibility,
   best practices, SEO 100; CLS 0. Merged `redesign/cyber` into `main`. Pending for the next upload: mp4 added to the
   30-day cache rule in `public/.htaccess`.
3. Build the new design system + homepage; screenshot desktop and phone mockups plus one inner page (Solutions or a
   product page) and send them to the owner for approval BEFORE deploying.
4. After approval: roll out to all pages and languages, QA (tsc, build, translations check, Lighthouse, reduced motion,
   phones), commit, push, zip, owner uploads.

## 9. Update 2 (2026-10-19, after launch)

- Hero: looping explode/assemble animation (`HeroLoop`, `tools/photos/hero_loop.py`, VID-02 forward + reversed,
  8.4 s, WebM 0.5 MB / MP4 0.9 MB). Still stays the LCP image and the reduced-motion / Save-Data fallback. Labels
  show only while exploded. Owner approved.
- Diagrams redrawn as coded illustrations (owner chose style A over AI-rendered): `StackIllustration` (glass slabs,
  layer icons, climbing red highlight, particles) and `FlowIllustration` (documents leaking to a red cloud vs a
  cyan dome around the appliance). Old `DataFlow` / `StackDiagram` removed. No new translation keys.
- Uploaded and live 2026-10-19; merged to main. Production Lighthouse home: perf 88 to 92 (one cold run 69), a11y,
  best practices, SEO 100, CLS 0. Pending for the next upload: webm cache rule, HeroLoop writes its phase only on change.

## 10. Update 3 (2026-10-21): diagrams as 3D worlds

- Owner asked for the two diagrams as "3D worlds" and chose option 1 (calm) with looping motion, stack included.
- `src/components/graphics/WorldDiagrams.tsx` (`FlowWorld`, `StackWorld`) replaces the coded illustrations. Stills
  `public/images/photos/world-{public,private,stack}-{1024,2048}.webp`, loops `public/video/world-*.{webm,mp4}`.
  Stack labels use the same isometric constants as `tools/photos/stack_world_base.py`; keep them in sync.
- Problem section restructured: heading and exposure list side by side, comparison panel full width below.
- BgVideo now prefers VP9 WebM (all loops have .webm and .mp4). Comfy balance after this round: $21.08.
- Live 2026-10-21, merged to main.
- Also open from the owner (2026-10-20): real demo near the top, delivery evidence on About, privacy boundaries
  page + privacy policy + chat disclosure. Proposal sent; waiting for the owner's answers and facts.

## 11. Update 4 (2026-10-21): product architecture as 3D-world pipelines

- `PipelineWorld` (src/components/graphics/PipelineWorld.tsx) replaces the flow cards on all five product pages.
  Layout from `tools/photos/pipeline_base.py` (stations at 10/30/50/70/90% so the five live text columns line up),
  Flux img2img per product (`PIPE-*` takes), band crop + upscale + grade via `pipeline_stills.py`, Wan loops cropped
  with `vfinish.py --crop=0,96,1536,544`. Pins per product in `PIPELINE_ART` (src/lib/photos.ts).
- Each step (pin + text column with title and detail) lights up in turn (7.5 s cycle) so the sequence reads without
  the video; off under reduced motion. Phones: the scene scrolls sideways, steps stack below.
- Owner asked for a straight line instead of ascending: `pipeline_base.py` now has a level x axis (A = 0); takes
  `PIPE2-*`, band crop (0, 224, 1536, 512) to 1536 x 288, pins share one height (`LEVEL_PINS`). Garbled sign text
  retouched in PIPE2-AP and PIPE2-KA (the `...r` raw frames) before the stills and videos were made.

## 12. Update 5 (2026-10-21): animated 3D scenes in every product step card

- 26 step cards (Knowledge 6, Vision, Coding, Agents, Image Studio 5 each) now open with a miniature 3D scene:
  still `public/images/photos/card-<ka|vi|ca|ap|is><n>-768.webp`, loop `public/video/card-<...>.{webm,mp4}`
  (Wan 2.2 with the lightx2v 6-step LoRA at 768x432: about $0.03 and 25 s per loop, quality fine at card size).
  Mapping in `STEP_CARD_PREFIX` (src/lib/photos.ts); markup in `src/views/Product.tsx` (`.step-media`).
- QA: build, check-translations x5, 60 page/language combinations at 360 px (no overflow, 0 JS errors), no missing
  assets. Every loop checked mid-clip for text artifacts (KA3 rerolled: Wan had written fake text in the bubble).
- Owner topped up Comfy credits; balance after this round about $33.

## 13. Update 6 (2026-10-21): studio orbit hero (LIVE 2026-10-21, merged to main)

- New hero video rendered in Blender, not Comfy: `tools/hero-orbit/orbit.py` (bpy 4.2 in
  `/home/user/blender-venv`, Cycles CPU, about 18 s per frame at 1440x810, 40 samples). Six-part LS-branded
  appliance (shell, fans, heatsink, module, mainboard, base), 336 frames at 24 fps: 2 s assembled, explode,
  one full orbit from high three-quarter to eye level to underside, reassemble; seamless loop.
- Labels follow the parts: `orbit.py labels_only=1` writes the right-hand silhouette edge of each part per frame;
  `tools/hero-orbit/finish.py frames=... labels=...` composites on #e4e7ea, encodes
  `public/video/hero-orbit.{webm,mp4}`, writes `hero-orbit.json` and the still `home-hero-*.webp`.
  `HeroLoop.tsx` moves the labels each frame and shows them only while the parts are apart.
- Scroll story chapter 2 (frames 44-91) re-rendered with the same appliance: `orbit.py scene=story` (dark set,
  teal and red pools, parts settle into one unit, 48 frames, about 35 s each), then
  `python tools/photos/story.py vid/VID-01_s11.mp4 story-ch2.mp4 vid/VID-03_s7.mp4`. Chapters 1 and 3 unchanged.
- Hero is now a light studio band (`.xh--studio` in cyber.css, local colour tokens). Six part labels and the hero
  alt text translated in all locales.
- ChatGPT design review (owner shared 2026-10-21): owner chose a refinement pass (keep the dark identity, calm effects,
  sentence case, demo-led hero with headline "Private AI that runs inside your business.", appliance moved to an
  "Explore the appliance" section, three-group stack, light Deployment section, Investors/Careers out of main nav,
  compact chat launcher). ON HOLD until the lab RAG is ready. Lab rules: never open port 12000; demo captures
  come from 12002/12003 ("Provisional Apparel Demo") only when the owner says so; never create accounts.

## 14. State and next steps (read this first in a new session)

- Branch `redesign/cyber` holds everything; `main` = last live (3D-world homepage diagrams, 2026-10-21).
  LIVE 2026-10-21 and merged to main: straight-line product pipelines + step-card scenes.
  LIVE 2026-10-21 and merged to main: studio orbit hero (light band, tracked labels) and scroll story
  chapter 2 re-rendered with the same appliance. Old
  `video/hero-loop.*` may still sit on the server unused; safe to delete. Zip was built
  2026-10-21 and sent to the owner. After the owner uploads: verify live, then merge `redesign/cyber` into `main`.
- Session-only files (lost when the container ends): `/home/user/comfy/raw` (all takes), `/home/user/comfy/vid`
  (raw Wan clips), `/home/user/shots/*.js` (Playwright capture scripts: sections.js, overflow.js, recp.js).
  Regenerate captures by rebuilding (`npm run build`, serve `out/` on :8080) and re-writing those small scripts.
- Open owner requests (waiting for owner facts): real demo near the top, delivery evidence on About, privacy
  boundaries section + privacy policy page + chat disclosure that the website chat uses a public AI (Claude).
- Workflow rules that worked: show previews before any zip; check takes at 100% for faces, hands, garbled text and
  landmark accuracy; log every still and loop in `tools/photos/manifest.json`; never use em dashes in copy.
