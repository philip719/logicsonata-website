// Adds the part labels to the rendered image (same style and layout as the earlier hero animation).
// Usage: node compose.js <render.png> <labels.json> <out.png> [fontDir]
// Output is 2x (2400x1800) for a 1200x900 CSS layout.
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

const [render, labelsFile, out, fontDir = path.join(__dirname, '../../out/_next/static/media')] = process.argv.slice(2);
const W = 1200;
const H = 900;
const LEFT_EDGE = 318;
const RIGHT_EDGE = 890;
const TEXT = [
  ['Aluminium chassis', 'Compact desktop footprint'],
  ['Fan and vapor chamber', 'Built for sustained load'],
  ['AI superchip', 'CPU, GPU and AI engines'],
  ['Up to 128 GB memory', 'Unified, for large models'],
  ['Local NVMe storage', 'Your data stays on-site'],
  ['High-speed networking', 'Link units as you grow'],
  ['Slotted airflow grilles', 'Front and rear intake'],
];

const font = (re) => {
  const f = fs.readdirSync(fontDir).find((n) => re.test(n));
  if (!f) throw new Error(`font not found: ${re}`);
  return 'data:font/woff2;base64,' + fs.readFileSync(path.join(fontDir, f)).toString('base64');
};

const items = JSON.parse(fs.readFileSync(labelsFile, 'utf8')).map((a, i) => ({
  side: a.side,
  ax: a.x * W,
  ay: a.y * H,
  title: TEXT[i][0],
  sub: TEXT[i][1],
}));
for (const side of ['left', 'right']) {
  const col = items.filter((i) => i.side === side).sort((a, b) => a.ay - b.ay);
  col.forEach((c) => (c.ly = c.ay));
  for (let pass = 0; pass < 8; pass++) {
    for (let i = 1; i < col.length; i++) {
      const gap = col[i].ly - col[i - 1].ly;
      if (gap < 86) {
        const push = (86 - gap) / 2;
        col[i - 1].ly -= push;
        col[i].ly += push;
      }
    }
  }
}

let svg = '';
let html = '';
for (const it of items) {
  const edge = it.side === 'left' ? LEFT_EDGE : RIGHT_EDGE;
  const knee = it.side === 'left' ? edge + 34 : edge - 34;
  svg += `<polyline points="${it.ax},${it.ay} ${knee},${it.ly} ${edge},${it.ly}" fill="none" stroke="rgba(242,241,238,0.6)" stroke-width="1.4"/>`;
  svg += `<circle cx="${it.ax}" cy="${it.ay}" r="11" fill="none" stroke="rgba(255,59,48,0.6)" stroke-width="1.5"/>`;
  svg += `<circle cx="${it.ax}" cy="${it.ay}" r="5" fill="#ff3b30"/>`;
  const pos = it.side === 'left' ? `right:${W - edge + 14}px` : `left:${edge + 14}px`;
  html += `<div class="lbl ${it.side}" style="top:${it.ly}px;${pos}"><b>${it.title}</b><i>${it.sub}</i></div>`;
}

const page = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: SG; src: url(${font(/^space_grotesk_latin_wght/)}); font-weight: 300 700; }
@font-face { font-family: JB; src: url(${font(/^jetbrains_mono_latin_400/)}); }
html, body { margin: 0; background: #0b0c11; }
#stage { position: relative; width: ${W}px; height: ${H}px; background: url(data:image/png;base64,${fs.readFileSync(render).toString('base64')}) 0 0 / ${W}px ${H}px; }
svg { position: absolute; inset: 0; }
.lbl { position: absolute; transform: translateY(-50%); white-space: nowrap; text-shadow: 0 1px 12px rgba(11,12,17,0.9); }
.lbl b { display: block; font: 600 22px/1.15 SG, sans-serif; color: #f2f1ee; letter-spacing: -0.01em; }
.lbl i { display: block; margin-top: 6px; font: 400 15px/1.2 JB, monospace; font-style: normal; color: #a7a6a1; letter-spacing: 0.02em; }
.lbl.left { text-align: right; }
</style></head><body><div id="stage"><svg width="${W}" height="${H}">${svg}</svg>${html}</div></body></html>`;

(async () => {
  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await p.setContent(page);
  await p.evaluate(() => document.fonts.ready);
  await (await p.$('#stage')).screenshot({ path: out });
  await browser.close();
  console.log('labelled image written to', out);
})();
