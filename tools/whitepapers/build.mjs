// Builds the five product whitepapers (PDF) and their cover images.
// Usage: node tools/whitepapers/build.mjs   (from the repo root)
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EXTRA } from './extra.mjs';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const cache = path.join(here, '.cache');
mkdirSync(cache, { recursive: true });

// Compile the product data straight from the site so whitepapers never drift from the pages.
execSync(`npx tsc ${path.join(root, 'src/lib/products.ts')} --outDir ${cache} --module commonjs --target es2020 --skipLibCheck`, { stdio: 'inherit' });
const { PRODUCTS } = require(path.join(cache, 'products.js'));

const fileUrl = (p) => pathToFileURL(path.join(root, p)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const EDITION = '2026 edition';

const CSS = `
@font-face { font-family: 'Inter'; src: url(${fileUrl('src/fonts/inter-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: 'SG'; src: url(${fileUrl('src/fonts/space-grotesk-latin-wght-normal.woff2')}); font-weight: 300 700; }
@font-face { font-family: 'JB'; src: url(${fileUrl('src/fonts/jetbrains-mono-latin-500-normal.woff2')}); font-weight: 500; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; color: #1b1c21; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 210mm; height: 297mm; padding: 22mm 20mm 24mm; overflow: hidden; page-break-after: always; background: #ffffff; }
.page:last-child { page-break-after: auto; }
h1, h2, h3 { font-family: 'SG', sans-serif; margin: 0; letter-spacing: -0.02em; }
h2 { font-size: 26pt; line-height: 1.1; margin-bottom: 6mm; }
h3 { font-size: 12.5pt; margin-bottom: 1.5mm; }
p { margin: 0 0 4mm; font-size: 10.5pt; line-height: 1.6; color: #33353d; }
.kicker { font-family: 'JB', monospace; font-size: 8pt; letter-spacing: .16em; text-transform: uppercase; color: #e0342a; margin-bottom: 4mm; display: flex; align-items: center; gap: 2.5mm; }
.kicker::before { content: ''; width: 2.2mm; height: 2.2mm; background: #ff3b30; display: inline-block; }
.lead { font-size: 12.5pt; line-height: 1.55; color: #1b1c21; }
.foot { position: absolute; left: 20mm; right: 20mm; bottom: 11mm; display: flex; justify-content: space-between; font-family: 'JB', monospace; font-size: 7.5pt; color: #8a8b92; border-top: 0.3mm solid #e4e4e8; padding-top: 3mm; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; }
.card { border: 0.3mm solid #e2e2e7; border-radius: 2mm; padding: 5mm; background: #fafafb; }
.card p { font-size: 9.5pt; margin: 0; }
.num { font-family: 'JB', monospace; font-size: 8pt; color: #e0342a; display: block; margin-bottom: 2mm; }
.box { border-left: 1.2mm solid #ff3b30; background: #fff4f3; padding: 5mm 6mm; border-radius: 0 2mm 2mm 0; margin: 5mm 0; }
.box li { font-size: 10.5pt; line-height: 1.55; margin: 1.5mm 0; }
ul.ticks { list-style: none; padding: 0; margin: 0; }
ul.ticks li { position: relative; padding-left: 7mm; margin: 2.2mm 0; font-size: 10.5pt; line-height: 1.5; color: #2a2c33; }
ul.ticks li::before { content: '✓'; position: absolute; left: 0; color: #e0342a; font-weight: 700; }
ul.checks li::before { content: '☐'; color: #e0342a; }
img.shot { width: 100%; border-radius: 2mm; border: 0.3mm solid #d8d8de; display: block; }
.cap { font-family: 'JB', monospace; font-size: 7.5pt; color: #8a8b92; margin-top: 2mm; }
.flow { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3mm; margin: 4mm 0 7mm; }
.flow div { border: 0.3mm solid #f0b3ae; background: #fff7f6; border-radius: 2mm; padding: 3.5mm; }
.flow b { display: block; font-family: 'SG'; font-size: 10pt; margin-bottom: 1mm; }
.flow span { font-size: 8.5pt; color: #55575f; line-height: 1.4; display: block; }
.steps { counter-reset: s; display: grid; gap: 3mm; }
.steps > div { display: grid; grid-template-columns: 9mm 1fr; gap: 3mm; align-items: start; }
.steps > div::before { counter-increment: s; content: counter(s, decimal-leading-zero); font-family: 'JB'; font-size: 9pt; color: #e0342a; padding-top: 0.6mm; }
.steps b { font-family: 'SG'; font-size: 11pt; display: block; color: #1b1c21; }
.steps span { font-size: 9.8pt; color: #44464e; line-height: 1.5; }
.dark { background: #0b0c11; color: #f2f1ee; }
.dark p { color: #b9b8b3; }
.dark .foot { border-top-color: rgba(255,255,255,.12); color: #7b7a76; }
.cover { padding: 20mm; display: flex; flex-direction: column; background:
  radial-gradient(ellipse 80% 60% at 100% 0%, rgba(255,59,48,.28), transparent 60%), #0b0c11; color: #f2f1ee; }
.cover .logo { width: 62mm; }
.cover .code { margin-top: 30mm; font-family: 'JB'; font-size: 9pt; letter-spacing: .2em; color: #ff5a4f; }
.cover h1 { font-size: 40pt; line-height: 1.02; margin: 5mm 0 6mm; letter-spacing: -0.03em; }
.cover .sub { font-size: 15pt; line-height: 1.4; color: #cfceca; max-width: 150mm; }
.cover .art { margin-top: auto; border-radius: 3mm; overflow: hidden; border: 0.3mm solid rgba(255,255,255,.14); }
.cover .art img { width: 100%; display: block; }
.cover .meta { display: flex; justify-content: space-between; margin-top: 7mm; font-family: 'JB'; font-size: 8pt; color: #8d8c87; letter-spacing: .08em; }
.roadmap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 3mm 0 6mm; }
.roadmap div { border-top: 1mm solid #ff3b30; background: #fafafb; padding: 4mm; border-radius: 0 0 2mm 2mm; }
.roadmap b { font-family: 'SG'; font-size: 11pt; display: block; margin-bottom: 1.5mm; }
.roadmap span { font-size: 9pt; color: #44464e; line-height: 1.45; display: block; }
.qa { margin-bottom: 4mm; } .qa b { font-family: 'SG'; font-size: 11pt; display: block; margin-bottom: 1mm; }
.qa p { font-size: 9.8pt; margin: 0; }
.contact { margin-top: 8mm; display: grid; gap: 2mm; font-family: 'JB'; font-size: 10pt; color: #f2f1ee; }
`;

const DEPLOY = [
  ['On-premise', 'Dedicated hardware inside your building for the most sensitive data. Nothing leaves your network.'],
  ['Hosted private', 'Dedicated capacity on managed private GPU infrastructure, isolated from public AI services. No hardware purchase.'],
  ['Hybrid', 'Sensitive workloads on-site, everything else hosted, under one set of policies and one audit trail.'],
];
const ROADMAP = [
  ['Assess', 'Review current AI use, data exposure and priority use cases. Deliver a 30/60/90-day roadmap.'],
  ['Pilot', 'Deploy one working use case with real users and agreed success measures.'],
  ['Roll out', 'Extend to more teams with governance, integration and role-based training.'],
  ['Manage', 'Monitoring, model updates, knowledge refreshes and quarterly reviews.'],
];

function page(n, title, body, cls = '') {
  return `<section class="page ${cls}">${body}<div class="foot"><span>Logic Sonata · ${esc(title)}</span><span>${String(n).padStart(2, '0')}</span></div></section>`;
}

function build(p) {
  const x = EXTRA[p.id];
  const t = p.whitepaper.title;
  const pages = [];
  pages.push(`<section class="page cover">
    <img class="logo" src="${fileUrl('public/images/logo-horizontal.png')}" alt="Logic Sonata">
    <div class="code">WHITEPAPER · ${esc(p.code)}</div>
    <h1>${esc(t)}</h1>
    <div class="sub">${esc(p.whitepaper.subtitle)}.</div>
    <div class="art"><img src="${fileUrl(`public${p.visuals.ui.src}`)}" alt=""></div>
    <div class="meta"><span>${EDITION.toUpperCase()}</span><span>WWW.LOGICSONATA.COM</span></div>
  </section>`);
  pages.push(page(2, t, `<div class="kicker">Executive summary</div><h2>${esc(p.tagline)}</h2>
    ${x.summary.map((s) => `<p class="lead">${esc(s)}</p>`).join('')}
    <div class="box"><h3>Key takeaways</h3><ul class="ticks">${x.takeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>
    <p>This paper explains how the ${esc(p.name)} works, the controls that keep data private, where it delivers value first, and how to evaluate and roll it out.</p>`));
  pages.push(page(3, t, `<div class="kicker">The challenge</div><h2>${esc(p.problem.title)}</h2>
    <p class="lead">${esc(p.problem.body)}</p>
    <ul class="ticks">${x.challenge.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <div style="margin-top:8mm"><img class="shot" src="${fileUrl(`public${p.visuals.photo.src}`)}" alt=""><div class="cap">Illustration · ${esc(p.visuals.photo.caption)}</div></div>`));
  pages.push(page(4, t, `<div class="kicker">How it works</div><h2>From request to result, inside your walls.</h2>
    <p>${esc(p.builtOn)}</p>
    <div class="flow">${p.flow.map((f) => `<div><b>${esc(f.title)}</b><span>${esc(f.detail)}</span></div>`).join('')}</div>
    <div class="steps">${p.steps.map((s) => `<div><p style="margin:0"><b>${esc(s.title)}</b><span>${esc(s.detail)}</span></p></div>`).join('')}</div>
    ${p.steps.length <= 5 ? `<div style="margin-top:8mm"><img class="shot" src="${fileUrl(`public${p.visuals.ui.src}`)}" alt="" style="max-height:70mm;object-fit:cover;object-position:top"><div class="cap">Illustration · ${esc(p.visuals.ui.caption)}</div></div>` : ''}`));
  pages.push(page(5, t, `<div class="kicker">Capabilities</div><h2>What the ${esc(p.name)} does.</h2>
    <div class="grid2">${p.capabilities.map((c) => `<div class="card"><h3>${esc(c.title)}</h3><p>${esc(c.detail)}</p></div>`).join('')}</div>
    ${p.capabilities.length <= 6 ? `<div class="box" style="margin-top:7mm"><h3>Built on proven open foundations</h3><p style="margin:0">${esc(p.builtOn)}</p></div>` : ''}`));
  pages.push(page(6, t, `<div class="kicker">Security and governance</div><h2>Controls built in, not bolted on.</h2>
    <p class="lead">Every Logic Sonata system runs on infrastructure you control. Data boundaries, access and audit are designed in from the start rather than added later.</p>
    <ul class="ticks">${p.controls.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <div class="box"><h3>Data boundary</h3><p style="margin:0">Prompts, documents, images and results are processed on your appliance or dedicated private infrastructure. They are not sent to public AI services and are never used to train third-party models.</p></div>
    <h3 style="margin-top:6mm">${esc(p.spotlight.title)}</h3><p>${esc(p.spotlight.lead)}</p>
    <div class="grid2">${p.spotlight.items.map((i) => `<div class="card"><span class="num">${esc(i.label)}</span><p>${esc(i.text)}</p></div>`).join('')}</div>`));
  pages.push(page(7, t, `<div class="kicker">Use cases</div><h2>Where it pays off first.</h2>
    <div class="grid2">${p.useCases.map((u) => `<div class="card"><h3>${esc(u.title)}</h3><p>${esc(u.detail)}</p></div>`).join('')}</div>
    <h3 style="margin-top:8mm">Measuring the pilot</h3><p>We agree success measures before the pilot starts. Typical measures include:</p>
    <ul class="ticks">${x.metrics.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`));
  pages.push(page(8, t, `<div class="kicker">Deployment and rollout</div><h2>Deploy where your data needs to live.</h2>
    <div class="grid3">${DEPLOY.map(([a, b]) => `<div class="card"><h3>${a}</h3><p>${b}</p></div>`).join('')}</div>
    <h3 style="margin-top:7mm">Hardware, sized to the workload</h3>
    <p>Logic Sonata is hardware-neutral. Smaller teams often start with a compact AI workstation such as NVIDIA DGX Spark or an AMD Ryzen AI Max+ system, both with up to 128 GB of unified memory in a desktop-sized unit. Larger rollouts use multi-GPU servers or a private cloud cluster.</p>
    <h3 style="margin-top:5mm">A proven rollout path</h3>
    <div class="roadmap">${ROADMAP.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
    <p>One partner is accountable for the whole stack: hardware, software and models, your company knowledge, access controls, implementation, training and ongoing support.</p>`));
  pages.push(page(9, t, `<div class="kicker">Evaluation checklist</div><h2>Questions to ask any vendor.</h2>
    <p>Use this checklist when comparing options, including ours.</p>
    <ul class="ticks checks">${x.checklist.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    <h3 style="margin-top:8mm">Frequently asked questions</h3>
    ${p.faq.map((f) => `<div class="qa"><b>${esc(f.q)}</b><p>${esc(f.a)}</p></div>`).join('')}`));
  pages.push(page(10, t, `<div class="kicker">About Logic Sonata</div><h2 style="color:#f2f1ee">Private AI, built inside your walls.</h2>
    <p class="lead" style="color:#d9d8d4">Logic Sonata delivers secure private AI for businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand. Each solution combines hardware, software, company knowledge, access controls, implementation, training and ongoing support, deployed on-premise, hosted or hybrid.</p>
    <p>Our product portfolio: Private Knowledge Assistant, Private Vision Intelligence, Private Coding Assistant, Private AI Agent Platform and Private Image Generation Studio.</p>
    <div class="box" style="background:rgba(255,59,48,.08)"><h3 style="color:#f2f1ee">Next step: a 30-minute consultation</h3><p style="margin:0">We will show the ${esc(p.name)} working, discuss your data and requirements, and scope a pilot around your use case.</p></div>
    <div class="contact"><span>www.logicsonata.com/contact</span><span>sales@logicsonata.com</span></div>
    <p style="margin-top:14mm;font-size:8pt;color:#7b7a76">Product names mentioned are trademarks of their respective owners. Illustrations show representative interfaces and synthetic data. This document is for information only and does not constitute an offer.</p>`, 'dark'));
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(t)}</title><style>${CSS}</style></head><body>${pages.join('')}</body></html>`;
}

const { chromium } = require(path.join(root, 'tools/product-visuals/node_modules/playwright-core'));
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
mkdirSync(path.join(root, 'public/whitepapers/files'), { recursive: true });
mkdirSync(path.join(root, 'public/images/whitepapers'), { recursive: true });
for (const p of PRODUCTS) {
  const htmlPath = path.join(cache, `${p.id}.html`);
  writeFileSync(htmlPath, build(p));
  const pg = await browser.newPage();
  await pg.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  const pdfPath = path.join(root, 'public', p.whitepaper.file);
  await pg.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
  // Cover image: render the first page at A4 proportions.
  await pg.setViewportSize({ width: 794, height: 1123 });
  await pg.screenshot({ path: path.join(cache, `${p.id}-cover.png`), clip: { x: 0, y: 0, width: 794, height: 1123 } });
  console.log('built', p.id, (readFileSync(pdfPath).length / 1024).toFixed(0) + ' KB');
  await pg.close();
}
await browser.close();
