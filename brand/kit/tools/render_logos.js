// Renders every logo SVG to transparent PNGs and a vector PDF (Chromium via Playwright).
// Usage: NODE_PATH=<dir with playwright-core> node tools/render_logos.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.resolve(__dirname, '..');
const LOGOS = path.join(ROOT, 'out/01-Logos');
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// PNG widths per lockup; icons are square.
const PNG_WIDTHS = { Mark: [512, 2048], 'App-Icon': [32, 180, 512, 1024], default: [1000, 3000] };
// Physical PDF widths (mm): large enough to place anywhere; the artwork is vector.
const PDF_WIDTH_MM = { Mark: 100, 'App-Icon': 100, default: 200 };

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  let count = 0;
  for (const lockup of fs.readdirSync(LOGOS)) {
    const svgDir = path.join(LOGOS, lockup, 'svg');
    if (!fs.existsSync(svgDir)) continue;
    for (const file of fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'))) {
      const svg = fs.readFileSync(path.join(svgDir, file), 'utf8');
      const [, , vw, vh] = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
      const base = file.replace(/\.svg$/, '');
      const html = (w) => `<html><body style="margin:0;background:transparent">${svg.replace(/width="[^"]+" height="[^"]+"/, `width="${w}" height="${(w * vh) / vw}"`)}</body></html>`;

      fs.mkdirSync(path.join(LOGOS, lockup, 'png'), { recursive: true });
      for (const w of PNG_WIDTHS[lockup] || PNG_WIDTHS.default) {
        const h = Math.round((w * vh) / vw);
        await page.setViewportSize({ width: w, height: h });
        await page.setContent(html(w));
        await page.screenshot({ path: path.join(LOGOS, lockup, 'png', `${base}-${w}px.png`), omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
        count++;
      }

      fs.mkdirSync(path.join(LOGOS, lockup, 'pdf'), { recursive: true });
      const mmW = PDF_WIDTH_MM[lockup] || PDF_WIDTH_MM.default;
      const mmH = (mmW * vh) / vw;
      const pxW = (mmW / 25.4) * 96;
      await page.setContent(`<html><head><style>@page{size:${mmW}mm ${mmH.toFixed(3)}mm;margin:0}html,body{margin:0}</style></head><body>${svg.replace(/width="[^"]+" height="[^"]+"/, `width="${pxW}" height="${(pxW * vh) / vw}"`)}</body></html>`);
      await page.pdf({ path: path.join(LOGOS, lockup, 'pdf', `${base}.pdf`), width: `${mmW}mm`, height: `${mmH.toFixed(3)}mm`, printBackground: true, pageRanges: '1' });
      count++;
    }
  }
  await browser.close();
  console.log(`${count} PNG/PDF files written`);
})();
