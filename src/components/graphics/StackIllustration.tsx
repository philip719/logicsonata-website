import { boxFaces, makeIso, pts } from '@/lib/iso';

// Illustrated version of the stack diagram: shaded glass slabs, a glowing icon printed on each layer, a light core
// with rising particles, and a highlight that climbs the stack (cyber.css, off under reduced motion).

const S = 1.32;
const SIZE = 124;
const GAP = 44;
const THICK = 9;
const iso = makeIso(210, 432, S);
const COS30 = Math.cos(Math.PI / 6);

// 2D icons in a 60 x 60 box centred on 0,0; laid flat onto each slab with the isometric matrix.
const ICONS: string[] = [
  // 01 hardware: chip with pins
  'M-16 -16h32v32h-32z M-8 -8h16v16h-16z M-10 -16v-7 M-3 -16v-7 M4 -16v-7 M11 -16v-7 M-10 16v7 M-3 16v7 M4 16v7 M11 16v7 M-16 -10h-7 M-16 -3h-7 M-16 4h-7 M-16 11h-7 M16 -10h7 M16 -3h7 M16 4h7 M16 11h7',
  // 02 software and models: neural network
  'M-20 -14l20 -6l20 6 M-20 -14l20 14l20 -14 M-20 14l20 -14l20 14 M-20 14l20 6l20 -14 M-20 -14v28 M20 -14v28',
  // 03 company knowledge: document stack
  'M-14 -20h20l8 8v30h-28z M6 -20v8h8 M-8 -6h16 M-8 1h16 M-8 8h11 M-20 -14v34h24',
  // 04 access controls: padlock
  'M-15 -2h30v24h-30z M-9 -2v-8a9 9 0 0 1 18 0v8 M0 7v7',
  // 05 implementation: gear
  'M0 -22l4 6l7 -2l1 7l7 2l-3 6l5 5l-6 4l2 7l-7 1l-2 7l-6 -3l-5 5l-4 -6l-7 2l-1 -7l-7 -2l3 -6l-5 -5l6 -4l-2 -7l7 -1l2 -7l6 3z M0 -7a7 7 0 1 0 0.01 0z',
  // 06 training: two people
  'M-10 -12a6 6 0 1 0 0.01 0z M10 -12a6 6 0 1 0 0.01 0z M-20 16a10 10 0 0 1 20 0 M0 16a10 10 0 0 1 20 0',
  // 07 ongoing support: pulse in a ring
  'M0 -22a22 22 0 1 0 0.01 0z M-16 2h8l4 -10l6 18l5 -12l3 4h6',
];
const NODES: Array<[number, number]> = [[-20, -14], [0, -20], [20, -14], [0, 0], [-20, 14], [0, 6], [20, 14]];

export function StackIllustration({ layers, title }: { layers: string[]; title: string }) {
  const [cx] = iso(SIZE / 2, SIZE / 2, 0);
  const [, bottom] = iso(SIZE / 2, SIZE / 2, -10);
  const [, top] = iso(SIZE / 2, SIZE / 2, GAP * (layers.length - 1) + 60);

  return (
    <svg className="stackx" viewBox="0 70 640 520" role="img" aria-labelledby="stackx-title">
      <title id="stackx-title">{title}</title>
      <defs>
        <linearGradient id="sx-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b3a3f" />
          <stop offset="1" stopColor="#0b1a1e" />
        </linearGradient>
        <linearGradient id="sx-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12262a" />
          <stop offset="1" stopColor="#081215" />
        </linearGradient>
        <linearGradient id="sx-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1c20" />
          <stop offset="1" stopColor="#050c0e" />
        </linearGradient>
        <linearGradient id="sx-top-hot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a1512" />
          <stop offset="1" stopColor="#250808" />
        </linearGradient>
        <radialGradient id="sx-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3ef0e0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3ef0e0" stopOpacity="0" />
        </radialGradient>
        <filter id="sx-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx={cx} cy={bottom + 18} rx={150} ry={40} fill="url(#sx-core)" opacity="0.35" />
      <line x1={cx} y1={bottom} x2={cx} y2={top} className="stackx-beam" />

      {layers.map((layer, i) => {
        const z = i * GAP;
        const f = boxFaces(iso, 0, 0, z, SIZE, SIZE, THICK);
        // Icons sit on the exposed front tip of each slab (the slab above covers the rest of its top face).
        const [ox, oy] = iso(SIZE - 27, SIZE - 27, z + THICK + 0.1);
        const flat = `matrix(${(COS30 * S).toFixed(3)} ${(0.5 * S).toFixed(3)} ${(-COS30 * S).toFixed(3)} ${(0.5 * S).toFixed(3)} ${ox.toFixed(1)} ${oy.toFixed(1)})`;
        const [ax, ay] = iso(SIZE, 0, z + THICK);
        const edge = pts([iso(0, SIZE, z + THICK), iso(SIZE, SIZE, z + THICK), iso(SIZE, 0, z + THICK)]);
        return (
          <g key={layer} className="stackx-layer" style={{ ['--i' as string]: i }}>
            <polygon points={f.left} fill="url(#sx-l)" />
            <polygon points={f.right} fill="url(#sx-r)" />
            <polygon points={f.top} className="stackx-top" />
            <polygon points={f.top} className="stackx-top-hot" fill="url(#sx-top-hot)" />
            <polyline points={edge} className="stackx-edge" />
            <g transform={`${flat} scale(0.5)`}>
              <rect x={-36} y={-36} width={72} height={72} className="stackx-pad" />
              <g className="stackx-icon" filter="url(#sx-glow)">
                <path d={ICONS[i % ICONS.length]} transform="translate(0 3)" className="stackx-icon-shadow" />
                <path d={ICONS[i % ICONS.length]} />
                {i % ICONS.length === 1 && NODES.map(([x, y]) => <circle key={`${x},${y}`} cx={x} cy={y} r={3.2} />)}
              </g>
            </g>
            <polyline points={pts([[ax, ay], [ax + 16, ay], [372, ay]])} className="stackx-leader" />
            <circle cx={ax} cy={ay} r={3} className="stackx-dot" />
            <text x={384} y={ay + 4} className="stackx-num">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={414} y={ay + 4} className="stackx-label">
              {layer}
            </text>
          </g>
        );
      })}

      {[0, 1, 2, 3, 4, 5].map((k) => (
        <circle key={k} cx={cx + ((k % 3) - 1) * 9} cy={bottom} r={1.8} className="stackx-particle" style={{ ['--k' as string]: k }} />
      ))}
    </svg>
  );
}
