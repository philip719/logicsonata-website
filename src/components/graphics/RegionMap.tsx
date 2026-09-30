import { MARKETS } from '@/lib/site';

// Abstract network map: each market plotted by longitude/latitude on a
// dot grid, linked as one regional network. No coastlines, by design.

const W = 460;
const H = 440;
const project = (lon: number, lat: number) => [30 + ((lon - 97) / 13) * 340, 30 + ((17 - lat) / 26) * 380] as const;

const LINKS: Array<[string, string]> = [
  ['TH', 'VN'],
  ['TH', 'MY'],
  ['MY', 'SG'],
  ['SG', 'ID'],
  ['SG', 'VN'],
  ['VN', 'ID'],
];

// Label position relative to the node: [dx, dy, text-anchor].
const LABEL_OFFSET: Record<string, [number, number, 'start' | 'end']> = {
  TH: [-24, -6, 'end'],
  VN: [24, -6, 'start'],
  MY: [-24, -6, 'end'],
  SG: [-22, 30, 'end'],
  ID: [24, 0, 'start'],
};

export function RegionMap() {
  const pos = Object.fromEntries(MARKETS.map((m) => [m.code, project(m.lon, m.lat)]));
  return (
    <svg className="map-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="map-title">
      <title id="map-title">Logic Sonata serves Singapore, Vietnam, Indonesia, Malaysia and Thailand</title>
      <defs>
        <pattern id="ls-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1" fill="rgba(242,241,238,0.12)" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#ls-dots)" />
      {LINKS.map(([a, b], i) => {
        const [x1, y1] = pos[a];
        const [x2, y2] = pos[b];
        const mx = (x1 + x2) / 2 + (y2 - y1) * 0.18;
        const my = (y1 + y2) / 2 - (x2 - x1) * 0.18;
        return (
          <path
            key={`${a}${b}`}
            d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
            className="map-link"
            style={{ ['--i' as string]: i }}
          />
        );
      })}
      {MARKETS.map((m, i) => {
        const [x, y] = pos[m.code];
        const [dx, dy, anchor] = LABEL_OFFSET[m.code];
        return (
          <g key={m.code}>
            <circle cx={x} cy={y} r={14} className="map-ring" style={{ ['--i' as string]: i }} />
            <circle cx={x} cy={y} r={5} className="map-node" />
            <text x={x + dx} y={y + dy} textAnchor={anchor} className="map-label">
              {m.name}
            </text>
            <text x={x + dx} y={y + dy + 15} textAnchor={anchor} className="map-code">
              {m.code} · {m.city.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
