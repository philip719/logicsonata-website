import { boxFaces, makeIso, pts } from '@/lib/iso';
import { STACK } from '@/lib/site';

const S = 1.3;
const iso = makeIso(180, 330, S);
const GAP = 40;
const SIZE = 120;

export function StackDiagram() {
  const [cx, bottom] = iso(SIZE / 2, SIZE / 2, 0);
  const [, top] = iso(SIZE / 2, SIZE / 2, GAP * (STACK.length - 1) + 5);

  return (
    <svg className="stack-svg" viewBox="0 10 540 510" role="img" aria-labelledby="stack-title">
      <title id="stack-title">
        The Logic Sonata private AI stack, from hardware at the base to ongoing support at the top
      </title>
      <line x1={cx} y1={bottom + 30} x2={cx} y2={top - 40} className="stack-core" />
      {STACK.map((layer, i) => {
        const z = i * GAP;
        const f = boxFaces(iso, 0, 0, z, SIZE, SIZE, 5);
        const [ax, ay] = iso(SIZE, 0, z + 5);
        const inner = pts([iso(18, 18, z + 5.01), iso(SIZE - 18, 18, z + 5.01), iso(SIZE - 18, SIZE - 18, z + 5.01), iso(18, SIZE - 18, z + 5.01)]);
        return (
          <g key={layer.name} className="stack-plate" style={{ ['--i' as string]: i }}>
            <polygon points={f.left} className="stack-side-l" />
            <polygon points={f.right} className="stack-side-r" />
            <polygon points={f.top} className="stack-top" />
            <polygon points={inner} className="stack-inner" />
            <polyline points={pts([[ax, ay], [ax + 18, ay], [340, ay]])} className="stack-leader" />
            <circle cx={ax} cy={ay} r={2.6} className="stack-dot" />
            <text x={350} y={ay + 4} className="stack-num">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={378} y={ay + 4} className="stack-label">
              {layer.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
