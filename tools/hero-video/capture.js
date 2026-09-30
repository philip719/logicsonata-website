const { chromium } = require('playwright-core');
// Usage: node capture.js test t1 t2 ...   |   node capture.js frames <fps> <outdir> [labels]
(async () => {
  const [mode, ...rest] = process.argv.slice(2);
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
  });
  const labels = mode === 'frames' ? (rest[2] ?? '1') : '1';
  const page = await browser.newPage({ viewport: { width: 1200, height: 1080 } });
  page.on('console', (m) => m.type() === 'error' && console.log('console:', m.text()));
  page.on('pageerror', (e) => console.log('pageerror:', e.message));
  await page.goto(`http://localhost:4180/?labels=${labels}&bg=${encodeURIComponent(process.env.BG || '#1c1d22')}`);
  await page.waitForFunction(() => window.sceneReady === true, null, { timeout: 120000 });
  const stage = await page.$('#stage');
  const shoot = async (t, path, type = 'png') => {
    await page.evaluate((t) => window.renderAt(t), t);
    await stage.screenshot({ path, type, ...(type === 'jpeg' ? { quality: 94 } : {}) });
  };
  if (mode === 'test') {
    for (const t of rest) { const s = Date.now(); await shoot(+t, `test-${t}.png`); console.log('t', t, Date.now() - s, 'ms'); }
  } else {
    const [fps, outdir] = rest;
    const n = 8 * +fps;
    for (let i = 0; i < n; i++) {
      await shoot(i / +fps, `${outdir}/f${String(i).padStart(4, '0')}.jpg`, 'jpeg');
      if (i % 30 === 0) console.log('frame', i, '/', n);
    }
  }
  await browser.close();
})();
