// Renders build/manifest.json: print pieces to PDF (vector, fonts embedded) and digital pieces to PNG.
// Also writes page previews to build/previews for the brand guide.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'out');
const PREVIEWS = path.join(ROOT, 'build', 'previews');
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const only = process.argv[2];

(async () => {
  const manifest = JSON.parse(fs.readFileSync(process.env.MANIFEST || path.join(ROOT, 'build', 'manifest.json'), 'utf8'));
  fs.mkdirSync(PREVIEWS, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
  for (const d of manifest) {
    if (only && !d.name.includes(only)) continue;
    const dir = path.join(OUT, d.folder);
    fs.mkdirSync(dir, { recursive: true });
    const pxW = d.unit === 'mm' ? (d.w * 96) / 25.4 : d.w;
    const pxH = d.unit === 'mm' ? (d.h * 96) / 25.4 : d.h;
    const scale = d.kind === 'png' ? 1 : Math.max(0.35, Math.min(4, 1600 / pxW));
    const ctx = await browser.newContext({ viewport: { width: Math.ceil(pxW), height: Math.ceil(pxH) }, deviceScaleFactor: scale });
    const page = await ctx.newPage();
    await page.goto('file://' + d.html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    if (d.kind === 'pdf') {
      await page.pdf({ path: path.join(dir, `${d.name}.pdf`), width: `${d.w}mm`, height: `${d.h}mm`, printBackground: true, preferCSSPageSize: true });
      const pages = await page.$$('.page');
      for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(PREVIEWS, `${d.name}-${i + 1}.png`) });
    } else {
      await page.screenshot({ path: path.join(dir, `${d.name}.png`), clip: { x: 0, y: 0, width: d.w, height: d.h } });
      fs.copyFileSync(path.join(dir, `${d.name}.png`), path.join(PREVIEWS, `${d.name}-1.png`));
    }
    await ctx.close();
    console.log('rendered', d.name);
  }
  await browser.close();
})();
