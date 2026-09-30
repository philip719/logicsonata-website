import { boxFaces, makeIso, pts, type Point, type Projector } from '@/lib/iso';

// Exploded isometric view of a compact AI supercomputer (DGX Spark class).
// Layers separate on load (CSS) and then drift gently; everything is vector,
// so it stays sharp at any size and weighs a few kilobytes.

const S = 1.3;
const iso = makeIso(350, 475, S);

// Exploded height of each layer (world units) and where it sits when assembled.
const LAYERS = {
  base: { z: 0, rest: 0 },
  board: { z: 100, rest: 10 },
  cooler: { z: 190, rest: 16 },
  lid: { z: 290, rest: 42 },
};

const collapse = (key: keyof typeof LAYERS) => `${((LAYERS[key].z - LAYERS[key].rest) * S).toFixed(0)}px`;

function Box({
  x, y, z, w, d, h, fill, stroke = 'rgba(255,255,255,0.14)',
}: {
  x: number; y: number; z: number; w: number; d: number; h: number;
  fill: { top: string; left: string; right: string };
  stroke?: string;
}) {
  const f = boxFaces(iso, x, y, z, w, d, h);
  return (
    <g stroke={stroke} strokeWidth={0.6} strokeLinejoin="round">
      <polygon points={f.left} fill={fill.left} />
      <polygon points={f.right} fill={fill.right} />
      <polygon points={f.top} fill={fill.top} />
    </g>
  );
}

/** A rectangle lying flat on a horizontal plane. */
function flat(p: Projector, x: number, y: number, z: number, w: number, d: number) {
  return pts([p(x, y, z), p(x + w, y, z), p(x + w, y + d, z), p(x, y + d, z)]);
}

/** A rectangle on the rear plane x = const. */
function onRear(p: Projector, x: number, y: number, z: number, d: number, h: number) {
  return pts([p(x, y, z + h), p(x, y + d, z + h), p(x, y + d, z), p(x, y, z)]);
}

const GOLD = { top: 'url(#ls-gold-top)', left: 'url(#ls-gold-left)', right: 'url(#ls-gold-right)' };
const CHIP = { top: '#23252d', left: '#0f1014', right: '#16171c' };
const MEM = { top: '#2c2e36', left: '#121317', right: '#1a1b20' };
const FIN = { top: '#c3c8d0', left: 'url(#ls-fin-left)', right: '#5a5f69' };

type Callout = { id: string; anchor: Point; side: 'left' | 'right'; y: number; title: string; sub: string };

function Leader({ c }: { c: Callout }) {
  const edge = c.side === 'left' ? 170 : 530;
  const knee = c.side === 'left' ? edge + 18 : edge - 18;
  const [ax, ay] = c.anchor;
  const tx = c.side === 'left' ? edge - 8 : edge + 8;
  const anchor = c.side === 'left' ? 'end' : 'start';
  return (
    <g className="spark-callout">
      <polyline
        points={pts([[ax, ay], [knee, c.y], [edge, c.y]])}
        fill="none"
        stroke="rgba(242,241,238,0.45)"
        strokeWidth={0.8}
      />
      <circle cx={ax} cy={ay} r={3.2} fill="#ff3b30" />
      <circle cx={ax} cy={ay} r={7} fill="none" stroke="#ff3b30" strokeOpacity={0.5} className="spark-ping" />
      <text x={tx} y={c.y - 4} textAnchor={anchor} className="spark-title">
        {c.title}
      </text>
      <text x={tx} y={c.y + 13} textAnchor={anchor} className="spark-sub">
        {c.sub}
      </text>
    </g>
  );
}

export function ExplodedSpark() {
  const L = LAYERS;

  // Base tray: rear ports on the x = 150 face.
  const ports: Array<[number, number, number, number]> = [
    [18, 7, 12, 6], [36, 7, 12, 6], [54, 7, 12, 6], [74, 6, 16, 8], [98, 6, 20, 9], [124, 6, 12, 8],
  ];

  // Board layout (world units, board top at z = 103).
  const bz = L.board.z + 3;
  const memRow = [44, 58, 72, 86].map((x) => ({ x, y: 100 }));
  const memCol = [44, 58, 72, 86].map((y) => ({ x: 100, y }));
  const traces: Array<[number, number, number, number]> = [
    [92, 58, 100, 58], [92, 66, 100, 66], [92, 74, 100, 74], [92, 82, 100, 82],
    [58, 92, 58, 100], [66, 92, 66, 100], [74, 92, 74, 100], [82, 92, 82, 100],
    [40, 116, 44, 116], [30, 100, 30, 70], [30, 70, 48, 70], [118, 60, 118, 96],
    [112, 50, 134, 50], [20, 30, 60, 30], [60, 30, 60, 48], [90, 22, 90, 48],
  ];

  const fins = Array.from({ length: 14 }, (_, i) => 24 + i * 7.4);

  const callouts: Callout[] = [
    { id: 'lid', anchor: iso(40, 150, L.lid.z + 4), side: 'left', y: 196, title: 'Metal-foam enclosure', sub: '150 mm desktop footprint' },
    { id: 'chip', anchor: iso(70, 70, bz + 6), side: 'left', y: 372, title: 'GB10 Grace Blackwell', sub: 'Up to 1 PFLOP FP4 AI' },
    { id: 'nic', anchor: iso(28, 117, bz + 4), side: 'left', y: 478, title: 'ConnectX-7 networking', sub: 'Link units for bigger models' },
    { id: 'cooler', anchor: iso(130, 75, L.cooler.z + 3), side: 'right', y: 318, title: 'Thermal module', sub: 'Sustained AI workloads' },
    { id: 'mem', anchor: iso(106, 70, bz + 2.5), side: 'right', y: 432, title: '128 GB unified memory', sub: 'Models up to 200B parameters' },
    { id: 'ssd', anchor: iso(125, 118, bz + 2), side: 'right', y: 510, title: 'Up to 4 TB NVMe', sub: 'Your data stays on-site' },
  ];

  const byLayer = (id: string) => callouts.filter((c) => c.id === id);

  return (
    <svg
      className="spark"
      viewBox="0 70 700 620"
      role="img"
      aria-labelledby="spark-title spark-desc"
    >
      <title id="spark-title">Exploded view of a compact private AI supercomputer</title>
      <desc id="spark-desc">
        A desktop AI supercomputer separated into its layers: metal-foam enclosure, thermal module, mainboard with a
        GB10 Grace Blackwell superchip, 128 GB of unified memory, NVMe storage and ConnectX-7 networking, and the base
        chassis with rear ports.
      </desc>
      <defs>
        <linearGradient id="ls-gold-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4e2b6" />
          <stop offset="0.55" stopColor="#d6b47a" />
          <stop offset="1" stopColor="#b8935a" />
        </linearGradient>
        <linearGradient id="ls-gold-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6c3f" />
          <stop offset="1" stopColor="#b8955c" />
        </linearGradient>
        <linearGradient id="ls-gold-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a4834e" />
          <stop offset="1" stopColor="#6c5431" />
        </linearGradient>
        <linearGradient id="ls-fin-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d929c" />
          <stop offset="1" stopColor="#4a4e57" />
        </linearGradient>
        <linearGradient id="ls-copper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3a47a" />
          <stop offset="1" stopColor="#9a5a36" />
        </linearGradient>
        <radialGradient id="ls-die" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#ffb1a8" />
          <stop offset="0.35" stopColor="#ff3b30" />
          <stop offset="1" stopColor="#6d120d" />
        </radialGradient>
        <radialGradient id="ls-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff3b30" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff3b30" stopOpacity="0" />
        </radialGradient>
        <pattern id="ls-foam" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="rgba(35,24,8,0.55)" />
          <circle cx="6.5" cy="4" r="1" fill="rgba(35,24,8,0.45)" />
          <circle cx="3.5" cy="7" r="1.1" fill="rgba(35,24,8,0.5)" />
          <circle cx="8" cy="8" r="0.7" fill="rgba(255,240,200,0.35)" />
        </pattern>
        <pattern id="ls-brush" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <path d="M0 3h6" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Assembly guides */}
      <g className="spark-guides" stroke="rgba(242,241,238,0.18)" strokeDasharray="3 5" strokeWidth={0.8}>
        {([[0, 150], [150, 150], [150, 0]] as const).map(([x, y]) => {
          const [x1, y1] = iso(x, y, 22);
          const [, y2] = iso(x, y, L.lid.z);
          return <line key={`${x}-${y}`} x1={x1} y1={y1} x2={x1} y2={y2} />;
        })}
      </g>

      {/* Base chassis */}
      <g className="spark-layer" style={{ ['--collapse' as string]: '0px' }}>
        <g className="spark-float" style={{ ['--float-delay' as string]: '0s' }}>
          <ellipse cx={350} cy={iso(75, 75, 0)[1] + 20} rx={230} ry={70} fill="url(#ls-glow)" opacity={0.35} />
          <Box x={0} y={0} z={0} w={150} d={150} h={22} fill={GOLD} />
          <polygon points={boxFaces(iso, 0, 0, 0, 150, 150, 22).left} fill="url(#ls-foam)" />
          <polygon points={flat(iso, 7, 7, 22, 136, 136)} fill="#15161b" stroke="rgba(0,0,0,0.4)" strokeWidth={0.6} />
          {ports.map(([y, z, d, h]) => (
            <polygon key={y} points={onRear(iso, 150, y, z, d, h)} fill="#101116" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5} />
          ))}
        </g>
      </g>

      {/* Mainboard */}
      <g className="spark-layer" style={{ ['--collapse' as string]: collapse('board') }}>
        <g className="spark-float" style={{ ['--float-delay' as string]: '-1.2s' }}>
          <Box x={8} y={8} z={L.board.z} w={134} d={134} h={3} fill={{ top: '#141a20', left: '#0b0f13', right: '#0e1317' }} />
          <g stroke="rgba(214,180,122,0.35)" strokeWidth={0.7} fill="none">
            {traces.map(([x1, y1, x2, y2], i) => {
              const [a, b] = iso(x1, y1, bz);
              const [c, d] = iso(x2, y2, bz);
              return <line key={i} x1={a} y1={b} x2={c} y2={d} />;
            })}
          </g>
          <ellipse cx={iso(70, 70, bz)[0]} cy={iso(70, 70, bz)[1]} rx={70} ry={40} fill="url(#ls-glow)" className="spark-chip-glow" />
          {/* GB10 package and die */}
          <Box x={48} y={48} z={bz} w={44} d={44} h={4} fill={CHIP} />
          <polygon points={flat(iso, 57, 57, bz + 4.01, 26, 26)} fill="url(#ls-die)" className="spark-die" />
          {/* Unified memory */}
          {[...memCol, ...memRow].map(({ x, y }) => (
            <Box key={`${x}-${y}`} x={x} y={y} z={bz} w={11} d={11} h={2.5} fill={MEM} />
          ))}
          {/* ConnectX-7 */}
          <Box x={16} y={104} z={bz} w={24} d={24} h={3.5} fill={CHIP} />
          <polygon points={flat(iso, 21, 109, bz + 3.51, 14, 14)} fill="none" stroke="rgba(214,180,122,0.6)" strokeWidth={0.7} />
          {/* NVMe SSD */}
          <Box x={118} y={98} z={bz} w={16} d={38} h={2} fill={{ top: '#1f2a36', left: '#0d1218', right: '#111820' }} />
          <polygon points={flat(iso, 121, 104, bz + 2.01, 10, 16)} fill="rgba(214,180,122,0.5)" />
          {byLayer('chip').concat(byLayer('nic'), byLayer('mem'), byLayer('ssd')).map((c) => (
            <Leader key={c.id} c={c} />
          ))}
        </g>
      </g>

      {/* Thermal module */}
      <g className="spark-layer" style={{ ['--collapse' as string]: collapse('cooler') }}>
        <g className="spark-float" style={{ ['--float-delay' as string]: '-2.4s' }}>
          <Box x={20} y={20} z={L.cooler.z} w={110} d={110} h={5} fill={{ top: 'url(#ls-copper)', left: '#7c4629', right: '#643820' }} />
          {fins.map((x) => (
            <Box key={x} x={x} y={24} z={L.cooler.z + 5} w={2.2} d={102} h={16} fill={FIN} stroke="rgba(0,0,0,0.25)" />
          ))}
          {byLayer('cooler').map((c) => (
            <Leader key={c.id} c={c} />
          ))}
        </g>
      </g>

      {/* Lid */}
      <g className="spark-layer" style={{ ['--collapse' as string]: collapse('lid') }}>
        <g className="spark-float" style={{ ['--float-delay' as string]: '-3.6s' }}>
          <Box x={0} y={0} z={L.lid.z} w={150} d={150} h={8} fill={GOLD} />
          <polygon points={boxFaces(iso, 0, 0, L.lid.z, 150, 150, 8).top} fill="url(#ls-brush)" />
          <polygon points={boxFaces(iso, 0, 0, L.lid.z, 150, 150, 8).left} fill="url(#ls-foam)" />
          <polygon points={boxFaces(iso, 0, 0, L.lid.z, 150, 150, 8).right} fill="url(#ls-foam)" />
          {byLayer('lid').map((c) => (
            <Leader key={c.id} c={c} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export const SPARK_SPECS = [
  'GB10 Grace Blackwell superchip',
  'Up to 1 PFLOP FP4 AI compute',
  '128 GB unified memory',
  'Models up to 200B parameters',
  'Up to 4 TB NVMe storage',
  'ConnectX-7 networking',
];
