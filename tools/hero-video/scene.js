// Offline renderer for the Logic Sonata hero video: a compact AI supercomputer
// (DGX Spark class) exploding outward into its components and reassembling.
// window.renderAt(t) draws the frame at time t (seconds) of an 8 s seamless loop.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const W = 1200;
const H = 1080;
const LOOP = 8;
const params = new URLSearchParams(location.search);
const SHOW_LABELS = params.get('labels') !== '0';

// ---------- deterministic helpers ----------
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('stage').prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(params.get('bg') || '#1c1d22');
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.85;

const camera = new THREE.PerspectiveCamera(24, W / H, 10, 6000);

// ---------- procedural textures ----------
function canvasTex(size, draw, srgb = true, repeat = [1, 1]) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function foamDraw(ctx, s, bump) {
  const r = rng(7);
  ctx.fillStyle = bump ? '#ffffff' : '#c9a86e';
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 2600; i++) {
    const x = r() * s, y = r() * s, rad = 2 + r() * 6;
    if (!bump) {
      ctx.fillStyle = `rgba(255,236,190,${0.35 + r() * 0.3})`;
      ctx.beginPath(); ctx.arc(x - 1, y - 1, rad + 1.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = bump ? '#000' : `rgba(38,26,10,${0.75 + r() * 0.25})`;
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
  }
}
const foamMap = canvasTex(512, (c, s) => foamDraw(c, s, false), true, [2.6, 0.8]);
const foamBump = canvasTex(512, (c, s) => foamDraw(c, s, true), false, [2.6, 0.8]);

const brushed = canvasTex(512, (ctx, s) => {
  const r = rng(3);
  ctx.fillStyle = '#7a7a7a'; ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y++) {
    const v = 100 + r() * 70;
    ctx.fillStyle = `rgba(${v},${v},${v},0.55)`;
    ctx.fillRect(0, y, s, 1);
  }
}, false, [1, 1]);

const pcbMap = canvasTex(1024, (ctx, s) => {
  const r = rng(11);
  ctx.fillStyle = '#0d1014'; ctx.fillRect(0, 0, s, s);
  ctx.lineCap = 'round';
  for (let i = 0; i < 260; i++) {
    ctx.strokeStyle = `rgba(200,164,104,${0.18 + r() * 0.25})`;
    ctx.lineWidth = 1.5 + r() * 2.5;
    let x = r() * s, y = r() * s;
    ctx.beginPath(); ctx.moveTo(x, y);
    for (let k = 0; k < 4; k++) {
      if (r() > 0.5) x += (r() - 0.5) * 260; else y += (r() - 0.5) * 260;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = 'rgba(214,180,122,0.55)';
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(242,241,238,0.35)';
  for (let i = 0; i < 90; i++) ctx.fillRect(r() * s, r() * s, 6 + r() * 26, 3);
}, true);

const floorGlow = canvasTex(512, (ctx, s) => {
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,59,48,0.22)');
  g.addColorStop(0.5, 'rgba(255,59,48,0.05)');
  g.addColorStop(1, 'rgba(255,59,48,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
}, true);

const ssdLabel = canvasTex(256, (ctx, s) => {
  ctx.fillStyle = '#d8bd86'; ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = 'rgba(20,16,10,0.75)';
  for (let i = 0; i < 7; i++) ctx.fillRect(24, 30 + i * 30, 60 + ((i * 53) % 140), 8);
}, true);

// ---------- materials ----------
const M = {
  gold: new THREE.MeshPhysicalMaterial({ color: '#d4b27a', metalness: 1, roughness: 0.3, roughnessMap: brushed, clearcoat: 0.25, clearcoatRoughness: 0.4 }),
  goldInner: new THREE.MeshStandardMaterial({ color: '#8a6d42', metalness: 1, roughness: 0.55 }),
  foam: new THREE.MeshStandardMaterial({ color: '#ffffff', map: foamMap, bumpMap: foamBump, bumpScale: 2.2, metalness: 0.85, roughness: 0.55 }),
  pcb: new THREE.MeshStandardMaterial({ map: pcbMap, metalness: 0.25, roughness: 0.55 }),
  chip: new THREE.MeshStandardMaterial({ color: '#16171b', metalness: 0.35, roughness: 0.3 }),
  substrate: new THREE.MeshStandardMaterial({ color: '#1f2b25', metalness: 0.2, roughness: 0.5 }),
  die: new THREE.MeshStandardMaterial({ color: '#2a0604', emissive: '#ff3b30', emissiveIntensity: 2.2, metalness: 0.2, roughness: 0.25 }),
  copper: new THREE.MeshPhysicalMaterial({ color: '#d98b5c', metalness: 1, roughness: 0.28, clearcoat: 0.2 }),
  fin: new THREE.MeshStandardMaterial({ color: '#cfd4db', metalness: 1, roughness: 0.26 }),
  rubber: new THREE.MeshStandardMaterial({ color: '#111114', roughness: 0.9 }),
  port: new THREE.MeshStandardMaterial({ color: '#0a0a0c', metalness: 0.5, roughness: 0.4 }),
  ssdPcb: new THREE.MeshStandardMaterial({ color: '#111a26', metalness: 0.3, roughness: 0.5 }),
  ssdLabel: new THREE.MeshStandardMaterial({ map: ssdLabel, metalness: 0.4, roughness: 0.45 }),
  steel: new THREE.MeshStandardMaterial({ color: '#9aa0a8', metalness: 1, roughness: 0.35 }),
};

// ---------- geometry helpers ----------
function rbox(w, h, d, mat, r = 1.6, seg = 3) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01)), mat);
}
function box(w, h, d, mat) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}
function at(mesh, x, y, z) { mesh.position.set(x, y, z); return mesh; }

const assembly = new THREE.Group();
scene.add(assembly);
const parts = [];
function part(name, offset, delay) {
  const g = new THREE.Group();
  g.name = name;
  g.userData = { offset: new THREE.Vector3(...offset), delay };
  assembly.add(g);
  parts.push(g);
  return g;
}

// Base plate with rubber feet
const base = part('base', [0, -78, 0], 0.14);
base.add(at(rbox(150, 4, 150, M.gold, 3), 0, 2, 0));
for (const [x, z] of [[-55, -55], [55, -55], [-55, 55], [55, 55]]) {
  base.add(at(new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 2.4, 32), M.rubber), x, -1.2, z));
}

// Side walls
const left = part('left', [-72, 0, 0], 0.08);
left.add(at(rbox(4, 42, 150, M.gold, 1.6), -73, 25, 0));
const right = part('right', [72, 0, 0], 0.08);
right.add(at(rbox(4, 42, 150, M.gold, 1.6), 73, 25, 0));

// Front metal-foam panel
const front = part('front', [0, 0, 82], 0.03);
front.add(at(rbox(142, 42, 4, M.foam, 1.2), 0, 25, 73));

// Rear panel: metal foam with the I/O cut-outs
const rear = part('rear', [0, 0, -82], 0.03);
rear.add(at(rbox(142, 42, 4, M.foam, 1.2), 0, 25, -73));
[[-52, 9, 7], [-38, 9, 7], [-24, 9, 7], [-6, 14, 11], [16, 16, 12], [38, 16, 12], [58, 12, 8]].forEach(([x, w, h]) => {
  rear.add(at(box(w, h, 1.5, M.port), x, 20, -75.4));
});

// Top cover
const top = part('top', [0, 118, 0], 0);
top.add(at(rbox(150, 4, 150, M.gold, 3), 0, 48, 0));
top.add(at(box(140, 0.6, 140, M.goldInner), 0, 45.7, 0));

// Mainboard with GB10, memory, ConnectX-7 and passives
const board = part('board', [0, 8, 0], 0.18);
board.add(at(box(138, 1.6, 138, M.pcb), 0, 10, 0));
board.add(at(box(46, 1.4, 46, M.substrate), 0, 11.5, 0));
board.add(at(box(40, 1.4, 40, M.chip), 0, 12.9, 0));
const die = at(box(26, 0.8, 26, M.die), 0, 14, 0);
board.add(die);
for (const x of [-35, 35]) for (const z of [-24, -8, 8, 24]) board.add(at(box(12, 1.4, 14, M.chip), x, 11.5, z));
board.add(at(box(22, 2, 22, M.chip), -42, 11.8, 46));
board.add(at(box(14, 0.4, 14, M.steel), -42, 13, 46));
{
  const r = rng(21);
  for (let i = 0; i < 60; i++) {
    const x = (r() - 0.5) * 128, z = (r() - 0.5) * 128;
    if (Math.abs(x) < 44 && Math.abs(z) < 36) continue;
    if (x < -26 && x > -58 && z > 30 && z < 62) continue;
    const s = 2 + r() * 4;
    board.add(at(box(s, 1 + r() * 1.5, s * (0.5 + r()), r() > 0.7 ? M.steel : M.chip), x, 11, z));
  }
}

// NVMe SSD (slides out sideways)
const ssd = part('ssd', [58, 14, 0], 0.26);
ssd.add(at(box(22, 1.2, 44, M.ssdPcb), 50, 11.6, 38));
ssd.add(at(box(18, 0.5, 30, M.ssdLabel), 50, 12.5, 36));

// Vapor chamber and fin stack
const chamber = part('chamber', [0, 52, 0], 0.1);
chamber.add(at(rbox(118, 3, 118, M.copper, 1.2), 0, 16.5, 0));
const fins = part('fins', [0, 84, 0], 0.05);
for (let i = 0; i < 22; i++) fins.add(at(box(1.3, 22, 110, M.fin), -55 + i * 5.24, 29.5, 0));

// Floor glow
const glow = new THREE.Mesh(
  new THREE.PlaneGeometry(620, 620),
  new THREE.MeshBasicMaterial({ map: floorGlow, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
);
glow.rotation.x = -Math.PI / 2;
glow.position.y = -96;
scene.add(glow);

// ---------- lights ----------
const key = new THREE.DirectionalLight('#fff0da', 2.4);
key.position.set(-320, 520, 360);
scene.add(key);
const fill = new THREE.DirectionalLight('#aebfff', 0.5);
fill.position.set(420, 120, 320);
scene.add(fill);
const rim = new THREE.DirectionalLight('#ff3b30', 0.55);
rim.position.set(260, 160, -420);
scene.add(rim);

// ---------- post-processing ----------
const target = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
const composer = new EffectComposer(renderer, target);
composer.setPixelRatio(1);
composer.setSize(W, H);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.3, 0.12, 0.92));
composer.addPass(new OutputPass());

// ---------- timeline ----------
const OUT = [0.7, 2.9];
const IN = [5.2, 7.4];
const STAGGER = 0.3;
function progress(t, delay) {
  if (t < OUT[0] || t >= IN[1]) return 0;
  if (t < OUT[1]) {
    const u = (t - OUT[0]) / (OUT[1] - OUT[0]);
    return easeInOutCubic(clamp01((u - delay) / (1 - STAGGER)));
  }
  if (t < IN[0]) return 1;
  const u = (t - IN[0]) / (IN[1] - IN[0]);
  return 1 - easeInOutCubic(clamp01((u - (STAGGER - delay)) / (1 - STAGGER)));
}
function labelOpacity(t) {
  return clamp01((t - 3.0) / 0.4) * clamp01((5.1 - t) / 0.4);
}

// ---------- labels ----------
const LABELS = [
  { part: 'top', local: [-64, 50, 60], side: 'left', title: 'Gold metal chassis', sub: '150 × 150 × 50.5 mm' },
  { part: 'fins', local: [58, 38, -30], side: 'right', title: 'Vapor-chamber cooling', sub: 'Built for sustained load' },
  { part: 'board', local: [0, 14.4, 0], side: 'left', title: 'GB10 Grace Blackwell', sub: 'Up to 1 PFLOP FP4 AI' },
  { part: 'board', local: [35, 12.2, 24], side: 'right', title: '128 GB unified memory', sub: 'Up to 200B-parameter models' },
  { part: 'ssd', local: [50, 12.8, 50], side: 'right', title: 'Up to 4 TB NVMe', sub: 'Your data stays on-site' },
  { part: 'board', local: [-42, 13.2, 46], side: 'left', title: 'ConnectX-7 networking', sub: 'Cluster two units' },
  { part: 'front', local: [-40, 12, 75], side: 'left', title: 'Metal-foam panels', sub: 'Front and rear airflow' },
];
const overlay = document.getElementById('overlay');
const stage = document.getElementById('stage');
const LEFT_EDGE = 318;
const RIGHT_EDGE = 890;

function drawLabels(opacity) {
  overlay.innerHTML = '';
  stage.querySelectorAll('.lbl').forEach((n) => n.remove());
  if (!SHOW_LABELS || opacity <= 0) return;
  const v = new THREE.Vector3();
  const items = LABELS.map((l) => {
    const g = assembly.getObjectByName(l.part);
    v.set(...l.local).applyMatrix4(g.matrixWorld).project(camera);
    return { ...l, ax: (v.x * 0.5 + 0.5) * W, ay: (-v.y * 0.5 + 0.5) * H };
  });
  for (const side of ['left', 'right']) {
    const col = items.filter((i) => i.side === side).sort((a, b) => a.ay - b.ay);
    col.forEach((c) => (c.ly = c.ay));
    for (let pass = 0; pass < 6; pass++) {
      for (let i = 1; i < col.length; i++) {
        const gap = col[i].ly - col[i - 1].ly;
        if (gap < 86) { const push = (86 - gap) / 2; col[i - 1].ly -= push; col[i].ly += push; }
      }
    }
  }
  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('opacity', opacity);
  overlay.appendChild(g);
  for (const it of items) {
    const edge = it.side === 'left' ? LEFT_EDGE : RIGHT_EDGE;
    const knee = it.side === 'left' ? edge + 34 : edge - 34;
    const line = document.createElementNS(ns, 'polyline');
    line.setAttribute('points', `${it.ax},${it.ay} ${knee},${it.ly} ${edge},${it.ly}`);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', 'rgba(242,241,238,0.55)');
    line.setAttribute('stroke-width', '1.6');
    g.appendChild(line);
    for (const [r, fill, stroke] of [[12, 'none', 'rgba(255,59,48,0.55)'], [5.5, '#ff3b30', 'none']]) {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', it.ax); c.setAttribute('cy', it.ay); c.setAttribute('r', r);
      c.setAttribute('fill', fill); c.setAttribute('stroke', stroke); c.setAttribute('stroke-width', '1.6');
      g.appendChild(c);
    }
    const div = document.createElement('div');
    div.className = `lbl ${it.side}`;
    div.style.opacity = opacity;
    div.style.top = `${it.ly}px`;
    if (it.side === 'left') div.style.right = `${W - edge + 14}px`;
    else div.style.left = `${edge + 14}px`;
    div.innerHTML = `<b>${it.title}</b><i>${it.sub}</i>`;
    stage.appendChild(div);
  }
}

// ---------- frame ----------
window.renderAt = (t) => {
  t = ((t % LOOP) + LOOP) % LOOP;
  const phase = (t / LOOP) * Math.PI * 2;
  let avg = 0;
  for (const p of parts) {
    const k = progress(t, p.userData.delay);
    p.position.copy(p.userData.offset).multiplyScalar(k);
    avg += k;
  }
  avg /= parts.length;

  const yaw = THREE.MathUtils.degToRad(36 + 9 * Math.sin(phase));
  const pitch = THREE.MathUtils.degToRad(23 + 3 * Math.cos(phase));
  const dist = 1360 - 250 * (1 - avg);
  const target = new THREE.Vector3(0, 28 + 10 * avg, 0);
  camera.position.set(
    target.x + dist * Math.cos(pitch) * Math.sin(yaw),
    target.y + dist * Math.sin(pitch),
    target.z + dist * Math.cos(pitch) * Math.cos(yaw),
  );
  camera.lookAt(target);

  M.die.emissiveIntensity = 1.3 + 0.3 * avg + 0.15 * Math.sin(phase * 2);

  scene.updateMatrixWorld(true);
  composer.render();
  drawLabels(labelOpacity(t));
  return true;
};

document.fonts.ready.then(() => {
  window.renderAt(Number(params.get('t') || 0));
  window.sceneReady = true;
});
