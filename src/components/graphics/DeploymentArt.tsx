import { boxFaces, makeIso, pts, type Projector } from '@/lib/iso';

type Variant = 'hosted' | 'onprem' | 'hybrid';

const GOLD = { top: '#e6cc96', left: '#9c7d4a', right: '#7d6238' };
const RACK = { top: '#3a3d46', left: '#1c1e24', right: '#24262d' };

function Floor({ iso, size }: { iso: Projector; size: number }) {
  const lines = [];
  for (let i = 0; i <= size; i += 20) {
    const [a, b] = iso(i, 0, 0);
    const [c, d] = iso(i, size, 0);
    const [e, f] = iso(0, i, 0);
    const [g, h] = iso(size, i, 0);
    lines.push(<line key={`x${i}`} x1={a} y1={b} x2={c} y2={d} />, <line key={`y${i}`} x1={e} y1={f} x2={g} y2={h} />);
  }
  return <g className="dep-floor">{lines}</g>;
}

function Solid({ iso, x, y, z, w, d, h, fill }: { iso: Projector; x: number; y: number; z: number; w: number; d: number; h: number; fill: { top: string; left: string; right: string } }) {
  const f = boxFaces(iso, x, y, z, w, d, h);
  return (
    <g stroke="rgba(255,255,255,0.18)" strokeWidth={0.6} strokeLinejoin="round">
      <polygon points={f.left} fill={fill.left} />
      <polygon points={f.right} fill={fill.right} />
      <polygon points={f.top} fill={fill.top} />
    </g>
  );
}

function Rack({ iso, x, y, w = 32 }: { iso: Projector; x: number; y: number; w?: number }) {
  const slots = [14, 26, 38, 50, 62];
  return (
    <g>
      <Solid iso={iso} x={x} y={y} z={0} w={w} d={w} h={76} fill={RACK} />
      {slots.map((z) => {
        const a = iso(x + 5, y + w, z);
        const b = iso(x + w - 5, y + w, z);
        return <line key={z} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />;
      })}
      {slots.map((z) => {
        const [lx, ly] = iso(x + w - 8, y + w, z + 5);
        return <circle key={`l${z}`} cx={lx} cy={ly} r={1.3} className="dep-led" style={{ ['--d' as string]: `${z / 40}s` }} />;
      })}
    </g>
  );
}

function Building({ iso }: { iso: Projector }) {
  const f = boxFaces(iso, 10, 10, 0, 100, 100, 58);
  return (
    <g>
      <polygon points={f.left} className="dep-wall" />
      <polygon points={f.right} className="dep-wall" />
      <polygon points={f.top} className="dep-roof" />
    </g>
  );
}

function Boundary({ iso, x, y, size }: { iso: Projector; x: number; y: number; size: number }) {
  return <polygon points={pts([iso(x, y, 0), iso(x + size, y, 0), iso(x + size, y + size, 0), iso(x, y + size, 0)])} className="dep-boundary" />;
}

export function DeploymentArt({ variant }: { variant: Variant }) {
  const labels: Record<Variant, string> = {
    hosted: 'Hosted private AI running on dedicated servers in a managed private GPU cloud',
    onprem: 'On-premise private AI running on hardware inside your own building',
    hybrid: 'Hybrid private AI linking on-premise hardware with a hosted private cloud',
  };

  if (variant === 'hosted') {
    const iso = makeIso(140, 64, 0.85);
    return (
      <svg viewBox="0 0 280 200" className="dep-svg" role="img" aria-label={labels.hosted}>
        <Floor iso={iso} size={120} />
        <Boundary iso={iso} x={8} y={8} size={104} />
        <Rack iso={iso} x={12} y={40} />
        <Rack iso={iso} x={48} y={40} />
        <Rack iso={iso} x={84} y={40} />
      </svg>
    );
  }

  if (variant === 'onprem') {
    const iso = makeIso(140, 60, 0.9);
    return (
      <svg viewBox="0 0 280 200" className="dep-svg" role="img" aria-label={labels.onprem}>
        <Floor iso={iso} size={120} />
        <Solid iso={iso} x={45} y={45} z={0} w={30} d={30} h={11} fill={GOLD} />
        <circle cx={iso(60, 60, 30)[0]} cy={iso(60, 60, 30)[1]} r={9} className="dep-pulse" />
        <Building iso={iso} />
      </svg>
    );
  }

  const iso = makeIso(112, 60, 0.8);
  const [ax, ay] = iso(40, 40, 30);
  const [bx, by] = iso(150, 30, 60);
  return (
    <svg viewBox="0 0 280 200" className="dep-svg" role="img" aria-label={labels.hybrid}>
      <Floor iso={iso} size={160} />
      <g>
        <polygon points={boxFaces(iso, 10, 10, 0, 60, 60, 40).left} className="dep-wall" />
        <polygon points={boxFaces(iso, 10, 10, 0, 60, 60, 40).right} className="dep-wall" />
        <Solid iso={iso} x={28} y={28} z={0} w={22} d={22} h={9} fill={GOLD} />
        <polygon points={boxFaces(iso, 10, 10, 0, 60, 60, 40).top} className="dep-roof" />
      </g>
      <Boundary iso={iso} x={110} y={0} size={48} />
      <Rack iso={iso} x={118} y={8} w={30} />
      <path d={`M${ax} ${ay} Q ${(ax + bx) / 2} ${Math.min(ay, by) - 50} ${bx} ${by}`} className="dep-link" />
    </svg>
  );
}
