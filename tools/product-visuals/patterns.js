// Procedural textile prints used as illustrative "generated" outputs for the
// Private Image Generation Studio visuals. Deterministic (seeded) so renders repeat.

export function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function leaf(ctx, x, y, len, angle, color, vein) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(len * 0.25, -len * 0.42, len * 0.75, -len * 0.42, len, 0);
  ctx.bezierCurveTo(len * 0.75, len * 0.42, len * 0.25, len * 0.42, 0, 0);
  ctx.fill();
  ctx.strokeStyle = vein;
  ctx.lineWidth = Math.max(1.5, len * 0.02);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(len * 0.95, 0);
  for (let i = 1; i < 7; i++) {
    const px = (len * i) / 7.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px + len * 0.1, -len * 0.18);
    ctx.moveTo(px, 0);
    ctx.lineTo(px + len * 0.1, len * 0.18);
  }
  ctx.stroke();
  ctx.restore();
}

const PATTERNS = {
  tropical(ctx, s) {
    const r = rng(11);
    ctx.fillStyle = '#123428';
    ctx.fillRect(0, 0, s, s);
    const greens = ['#1f5a3f', '#2e7a4f', '#3f9a5c', '#246b4a', '#5fb36b'];
    for (let i = 0; i < 70; i++) {
      leaf(ctx, r() * s, r() * s, s * (0.12 + r() * 0.16), r() * Math.PI * 2, greens[(r() * greens.length) | 0], 'rgba(10,30,20,0.55)');
    }
    for (let i = 0; i < 26; i++) {
      const x = r() * s, y = r() * s, rad = s * (0.018 + r() * 0.02);
      ctx.fillStyle = r() > 0.5 ? '#ff6a4d' : '#f6b24a';
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * rad, y + Math.sin(a) * rad, rad * 0.9, rad * 0.5, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#fff1c9';
      ctx.beginPath(); ctx.arc(x, y, rad * 0.45, 0, Math.PI * 2); ctx.fill();
    }
  },
  deco(ctx, s) {
    ctx.fillStyle = '#18213d';
    ctx.fillRect(0, 0, s, s);
    const R = s / 10;
    for (let row = -1; row < 22; row++) {
      for (let col = -1; col < 12; col++) {
        const x = col * R * 2 + (row % 2 ? R : 0);
        const y = row * R * 0.9;
        ctx.fillStyle = row % 3 === 0 ? '#c9a45c' : '#2a3560';
        ctx.beginPath(); ctx.arc(x, y, R, Math.PI, 0); ctx.fill();
        ctx.strokeStyle = row % 3 === 0 ? '#18213d' : '#c9a45c';
        ctx.lineWidth = s / 400;
        for (let k = 1; k < 9; k++) {
          const a = Math.PI + (k / 9) * Math.PI;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * R * 0.95, y + Math.sin(a) * R * 0.95);
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(x, y, R * 0.55, Math.PI, 0); ctx.stroke();
      }
    }
  },
  batik(ctx, s) {
    ctx.fillStyle = '#efe4cb';
    ctx.fillRect(0, 0, s, s);
    const step = s / 8;
    for (let gy = 0; gy <= 8; gy++) {
      for (let gx = 0; gx <= 8; gx++) {
        const cx = gx * step, cy = gy * step;
        ctx.fillStyle = '#243263';
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2 + Math.PI / 4;
          ctx.beginPath();
          ctx.ellipse(cx + Math.cos(a) * step * 0.27, cy + Math.sin(a) * step * 0.27, step * 0.25, step * 0.14, a, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#b5652a';
        ctx.beginPath(); ctx.arc(cx, cy, step * 0.07, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#efe4cb';
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2 + Math.PI / 4;
          ctx.beginPath(); ctx.arc(cx + Math.cos(a) * step * 0.3, cy + Math.sin(a) * step * 0.3, step * 0.035, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#243263';
        ctx.beginPath(); ctx.arc(cx + step / 2, cy + step / 2, step * 0.04, 0, Math.PI * 2); ctx.fill();
      }
    }
  },
  floral(ctx, s) {
    const r = rng(5);
    ctx.fillStyle = '#f4ece0';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 90; i++) {
      const x = r() * s, y = r() * s;
      ctx.strokeStyle = '#8fa383';
      ctx.lineWidth = s / 260;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (r() - 0.5) * 80, y + 40, x + (r() - 0.5) * 60, y + 90); ctx.stroke();
    }
    for (let i = 0; i < 55; i++) {
      const x = r() * s, y = r() * s, rad = s * (0.02 + r() * 0.035);
      const petals = 5 + ((r() * 3) | 0);
      const col = ['#c4573a', '#e08a5c', '#d7a24a', '#9c3b2b'][(r() * 4) | 0];
      ctx.fillStyle = col;
      for (let k = 0; k < petals; k++) {
        const a = (k / petals) * Math.PI * 2 + r();
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * rad * 0.7, y + Math.sin(a) * rad * 0.7, rad * 0.65, rad * 0.38, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#3b2a20';
      ctx.beginPath(); ctx.arc(x, y, rad * 0.28, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < 40; i++) leaf(ctx, r() * s, r() * s, s * 0.05, r() * 7, '#8fa383', 'rgba(255,255,255,0.35)');
  },
  brush(ctx, s) {
    const r = rng(23);
    ctx.fillStyle = '#f1efea';
    ctx.fillRect(0, 0, s, s);
    ctx.lineCap = 'round';
    for (let i = 0; i < 46; i++) {
      const x = r() * s, y = r() * s, len = s * (0.12 + r() * 0.25), a = -0.6 + r() * 0.5;
      ctx.strokeStyle = ['#ff3b30', '#1d1e24', '#c9c3b8', '#8d2019'][(r() * 4) | 0];
      ctx.globalAlpha = 0.75 + r() * 0.25;
      for (let k = 0; k < 7; k++) {
        ctx.lineWidth = s * (0.006 + r() * 0.012);
        ctx.beginPath();
        const off = (k - 3) * s * 0.006;
        ctx.moveTo(x + off, y + off * 0.3);
        ctx.quadraticCurveTo(x + Math.cos(a) * len * 0.5 + off, y + Math.sin(a) * len * 0.5 - s * 0.02, x + Math.cos(a) * len + off, y + Math.sin(a) * len);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  },
  ikat(ctx, s) {
    const r = rng(31);
    const cols = ['#0f4c5c', '#e6a23c', '#f3ead8', '#7a2e2e', '#0f4c5c', '#f3ead8'];
    const band = s / 12;
    for (let b = 0; b < 12; b++) {
      ctx.fillStyle = cols[b % cols.length];
      ctx.fillRect(0, b * band, s, band);
      ctx.fillStyle = cols[(b + 1) % cols.length];
      for (let x = 0; x < s; x += s / 40) {
        const h = band * (0.2 + r() * 0.45);
        ctx.fillRect(x, b * band + band - h * 0.5, s / 60, h);
      }
      ctx.fillStyle = cols[(b + 3) % cols.length];
      for (let x = s / 16; x < s; x += s / 8) {
        const cy = b * band + band / 2;
        ctx.beginPath();
        ctx.moveTo(x, cy - band * 0.42); ctx.lineTo(x + band * 0.32, cy); ctx.lineTo(x, cy + band * 0.42); ctx.lineTo(x - band * 0.32, cy);
        ctx.closePath(); ctx.fill();
      }
    }
  },
};

export const PATTERN_NAMES = Object.keys(PATTERNS);

export function drawPattern(ctx, size, name) {
  PATTERNS[name](ctx, size);
}

export function patternCanvas(name, size = 1024) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  drawPattern(c.getContext('2d'), size, name);
  return c;
}
