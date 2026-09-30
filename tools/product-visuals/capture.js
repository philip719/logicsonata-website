// Renders every scene and mockup page to PNG in ./out.
// Usage: node capture.js [name ...]   (default: all)
const { chromium } = require('playwright-core');

const PAGES = {
  'img-prints': { path: '/scenes/prints.html', w: 1600, h: 1000 },
  'vision-floor': { path: '/scenes/factory.html', w: 1600, h: 1000 },
  'vision-feed': { path: '/scenes/factory.html?cctv=1', w: 1280, h: 720 },
  patterns: { path: '/scenes/patterns.html', w: 1560, h: 520 },
  'kb-ui': { path: '/mockups/kb-chat.html', w: 1600, h: 1000 },
  'kb-security': { path: '/mockups/kb-security.html', w: 1600, h: 1000 },
  'vision-ui': { path: '/mockups/vision.html', w: 1600, h: 1000 },
  'code-ui': { path: '/mockups/code.html', w: 1600, h: 1000 },
  'code-flow': { path: '/mockups/code-flow.html', w: 1600, h: 1000 },
  'agent-ui': { path: '/mockups/agent.html', w: 1600, h: 1000 },
  'agent-flow': { path: '/mockups/agent-flow.html', w: 1600, h: 1000 },
  'img-ui': { path: '/mockups/comfy.html', w: 1600, h: 1000 },
};

(async () => {
  const wanted = process.argv.slice(2);
  const names = wanted.length ? wanted : Object.keys(PAGES);
  const browser = await chromium.launch({
    executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  for (const name of names) {
    const cfg = PAGES[name];
    const page = await browser.newPage({ viewport: { width: cfg.w, height: cfg.h } });
    page.on('pageerror', (e) => console.log(name, 'pageerror:', e.message));
    page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && console.log(name, 'console:', m.text()));
    await page.goto(`http://localhost:4181${cfg.path}`);
    await page.waitForFunction(() => window.sceneReady === true || document.readyState === 'complete', null, { timeout: 180000 });
    await page.evaluate(() => (window.sceneReady === undefined ? document.fonts.ready : new Promise((r) => {
      const t = setInterval(() => { if (window.sceneReady) { clearInterval(t); r(); } }, 100);
    })));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `out/${name}.png` });
    console.log('rendered', name);
    await page.close();
  }
  await browser.close();
})();
