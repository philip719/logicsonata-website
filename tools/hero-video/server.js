// Static server for the render page. /fonts is mapped to the site's font files.
const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2' };
const FONTS = path.join(__dirname, '../../src/fonts');

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = url.startsWith('/fonts/')
      ? path.join(FONTS, path.basename(url))
      : path.join(__dirname, url === '/' ? 'index.html' : url);
    fs.readFile(file, (err, data) => {
      if (err) return res.writeHead(404).end();
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }).end(data);
    });
  })
  .listen(4180, () => console.log('Render page on http://localhost:4180'));
