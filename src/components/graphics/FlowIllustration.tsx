import type { CommonDict } from '@/i18n/locales/en/common';
import { boxFaces, makeIso, pts, type Projector } from '@/lib/iso';

// Illustrated public-versus-private comparison (stacked on phones). Public: documents stream off the company floor
// into an unknown cloud. Private: the same floor sealed under a glass dome, documents feeding the appliance in a
// closed loop. Motion lives in cyber.css and stops under reduced motion.

function Slab({ iso, size, id }: { iso: Projector; size: number; id: string }) {
  const f = boxFaces(iso, 0, 0, -8, size, size, 8);
  return (
    <g>
      <polygon points={f.left} fill={`url(#${id}-l)`} />
      <polygon points={f.right} fill={`url(#${id}-r)`} />
      <polygon points={f.top} fill={`url(#${id}-t)`} className="fx-floor" />
    </g>
  );
}

/** An upright sheet of paper standing on the floor, facing the viewer's left. */
function Sheet({ iso, x, y, hot }: { iso: Projector; x: number; y: number; hot?: boolean }) {
  const w = 16;
  const h = 22;
  const face = pts([iso(x, y, 0), iso(x + w, y, 0), iso(x + w, y, h), iso(x, y, h)]);
  const line = (k: number, len: number) => pts([iso(x + 3, y, h - 6 - k * 4), iso(x + 3 + len, y, h - 6 - k * 4)]);
  return (
    <g className={hot ? 'fx-sheet fx-sheet--hot' : 'fx-sheet'}>
      <polygon points={face} />
      <polyline points={line(0, 10)} />
      <polyline points={line(1, 10)} />
      <polyline points={line(2, 6)} />
    </g>
  );
}

function Gradients({ id, top, side }: { id: string; top: [string, string]; side: [string, string] }) {
  return (
    <>
      <linearGradient id={`${id}-t`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={top[0]} />
        <stop offset="1" stopColor={top[1]} />
      </linearGradient>
      <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={side[0]} />
        <stop offset="1" stopColor={side[1]} />
      </linearGradient>
      <linearGradient id={`${id}-r`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={side[1]} />
        <stop offset="1" stopColor="#030607" />
      </linearGradient>
    </>
  );
}

const PUB = makeIso(80, 124, 1);
const PRIV = makeIso(150, 82, 1);
// Each leak starts at the top edge of a document on the floor and ends in the cloud.
const LEAKS = ['M82 122 C 130 90, 170 64, 214 62', 'M113 134 C 160 120, 200 100, 232 86', 'M96 156 C 150 150, 190 120, 222 92'];
const LOOP = 'M150 150 m -62 0 a 62 26 0 1 0 124 0 a 62 26 0 1 0 -124 0';

export function FlowIllustration({ t }: { t: CommonDict['graphics'] }) {
  const [bx, by] = PRIV(65, 65, 0);
  const box = boxFaces(PRIV, 50, 50, 0, 30, 30, 16);
  const chip = pts([PRIV(58, 58, 16.2), PRIV(72, 58, 16.2), PRIV(72, 72, 16.2), PRIV(58, 72, 16.2)]);
  return (
    <div className="flow fx">
      <figure className="flow-panel">
        <svg className="flow-svg" viewBox="0 0 300 230" role="img" aria-labelledby="fx-public">
          <title id="fx-public">{t.publicTitle}</title>
          <defs>
            <Gradients id="fxp" top={['#152a2e', '#0a1518']} side={['#0e1c1f', '#060c0e']} />
            <radialGradient id="fx-cloud" cx="0.45" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#3a1714" />
              <stop offset="1" stopColor="#120707" />
            </radialGradient>
            <filter id="fx-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text x={10} y={22} className="flow-caption">
            {t.yourCompany}
          </text>
          <Slab iso={PUB} size={90} id="fxp" />
          <Sheet iso={PUB} x={14} y={20} />
          <Sheet iso={PUB} x={44} y={14} />
          <Sheet iso={PUB} x={20} y={52} />
          <Sheet iso={PUB} x={56} y={46} />
          {LEAKS.map((d, i) => (
            <g key={d}>
              <path d={d} className="fx-leak" />
              <rect x={-4} y={-5} width={8} height={10} className="fx-packet" style={{ offsetPath: `path('${d}')`, ['--k' as string]: i }} />
            </g>
          ))}
          <g transform="translate(206 34)" filter="url(#fx-glow)">
            <path d="M10 58a18 18 0 0 1 0-36 24 24 0 0 1 44-8 19 19 0 0 1 6 44z" className="fx-cloud" fill="url(#fx-cloud)" />
            <circle cx={22} cy={44} r={2} className="fx-blink" />
            <circle cx={34} cy={44} r={2} className="fx-blink" style={{ animationDelay: '0.4s' }} />
            <circle cx={46} cy={44} r={2} className="fx-blink" style={{ animationDelay: '0.8s' }} />
          </g>
          <text x={240} y={118} textAnchor="middle" className="flow-caption">
            {t.unknown}
          </text>
          <text x={240} y={132} textAnchor="middle" className="flow-caption">
            {t.servers}
          </text>
        </svg>
        <figcaption>
          <strong className="flow-heading flow-heading--bad">{t.publicAi}</strong>
          {t.publicCaption}
        </figcaption>
      </figure>
      <figure className="flow-panel">
        <svg className="flow-svg" viewBox="0 0 300 230" role="img" aria-labelledby="fx-private">
          <title id="fx-private">{t.privateTitle}</title>
          <defs>
            <Gradients id="fxq" top={['#173236', '#0b1a1d']} side={['#10211f', '#060c0e']} />
            <radialGradient id="fx-dome" cx="0.5" cy="0.9" r="0.9">
              <stop offset="0" stopColor="#3ef0e0" stopOpacity="0.16" />
              <stop offset="1" stopColor="#3ef0e0" stopOpacity="0.02" />
            </radialGradient>
            <filter id="fx-glow2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text x={10} y={22} className="flow-caption">
            {t.yourBoundary}
          </text>
          <Slab iso={PRIV} size={130} id="fxq" />
          <Sheet iso={PRIV} x={16} y={30} />
          <Sheet iso={PRIV} x={14} y={66} />
          <Sheet iso={PRIV} x={34} y={96} />
          <path d={LOOP} className="fx-loop" />
          {[0, 1, 2].map((k) => (
            <circle key={k} r={3} className="fx-orbit" style={{ offsetPath: `path('${LOOP}')`, ['--k' as string]: k }} />
          ))}
          <g className="fx-box">
            <polygon points={box.left} className="fx-box-l" />
            <polygon points={box.right} className="fx-box-r" />
            <polygon points={box.top} className="fx-box-t" />
            <polygon points={chip} className="fx-chip" filter="url(#fx-glow2)" />
          </g>
          <text x={bx} y={by + 26} textAnchor="middle" className="fx-ai">
            AI
          </text>
          <path d="M42 150 A 108 112 0 0 1 258 150 A 108 30 0 0 1 42 150 z" className="fx-dome" fill="url(#fx-dome)" />
          <path d="M42 150 A 108 112 0 0 1 258 150" className="fx-dome-rim" filter="url(#fx-glow2)" />
          <path d="M42 150 A 108 30 0 0 0 258 150" className="fx-dome-base" />
        </svg>
        <figcaption>
          <strong className="flow-heading flow-heading--good">{t.privateAi}</strong>
          {t.privateCaption}
        </figcaption>
      </figure>
    </div>
  );
}
