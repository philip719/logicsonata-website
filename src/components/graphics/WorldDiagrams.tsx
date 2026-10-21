import { BgVideo } from '@/components/BgVideo';
import type { CommonDict } from '@/i18n/locales/en/common';

// The public/private comparison and the private AI stack as miniature 3D worlds (generated on Comfy Cloud, see
// tools/photos/README.md). Stills are the first paint and the reduced-motion fallback; muted loops play over them.
// All text stays live HTML/SVG so it translates.

function World({ name, w, h, alt }: { name: string; w: number; h: number; alt: string }) {
  return (
    <>
      <img
        src={`/images/photos/${name}-${w}.webp`}
        srcSet={`/images/photos/${name}-${w}.webp ${w}w, /images/photos/${name}-${w * 2}.webp ${w * 2}w`}
        sizes="(max-width: 960px) 100vw, 50vw"
        width={w}
        height={h}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <BgVideo name={name} />
    </>
  );
}

export function FlowWorld({ t }: { t: CommonDict['graphics'] }) {
  return (
    <div className="flow fw">
      <figure className="flow-panel">
        <div className="fw-media">
          <World name="world-public" w={1024} h={784} alt={t.publicTitle} />
          <span className="flow-caption fw-tag">{t.yourCompany}</span>
          <span className="flow-caption fw-tag fw-tag--cloud">
            {t.unknown}
            <br />
            {t.servers}
          </span>
        </div>
        <figcaption>
          <strong className="flow-heading flow-heading--bad">{t.publicAi}</strong>
          {t.publicCaption}
        </figcaption>
      </figure>
      <figure className="flow-panel">
        <div className="fw-media">
          <World name="world-private" w={1024} h={784} alt={t.privateTitle} />
          <span className="flow-caption fw-tag">{t.yourBoundary}</span>
        </div>
        <figcaption>
          <strong className="flow-heading flow-heading--good">{t.privateAi}</strong>
          {t.privateCaption}
        </figcaption>
      </figure>
    </div>
  );
}

// Same isometric constants as tools/photos/stack_world_base.py, which drew the layout the render was made from.
const S = 1.2;
const SIZE = 92;
const GAP = 82;
const THICK = 8;
const OX = 190;
const OY = 640;
const COS30 = Math.cos(Math.PI / 6);

export function StackWorld({ layers, title }: { layers: string[]; title: string }) {
  const ax = OX + SIZE * COS30 * S;
  return (
    <div className="sw">
      <World name="world-stack" w={1024} h={1216} alt={title} />
      <svg className="sw-labels" viewBox="0 0 640 760" aria-hidden="true">
        {layers.map((layer, i) => {
          const ay = OY + (SIZE / 2 - i * GAP - THICK) * S;
          return (
            <g key={layer}>
              <polyline points={`${ax},${ay} ${ax + 14},${ay} 336,${ay}`} className="stackx-leader" />
              <circle cx={ax} cy={ay} r={3} className="stackx-dot" />
              <text x={348} y={ay + 5} className="stackx-num">
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x={378} y={ay + 5} className="stackx-label">
                {layer}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="visually-hidden">
        {layers.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ol>
    </div>
  );
}
