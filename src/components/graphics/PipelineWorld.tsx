import type { FlowStage } from '@/lib/products';
import { BgVideo } from '../BgVideo';
import { Icon } from '../Icon';

// A product's five-step architecture as a miniature 3D world (tools/photos/pipeline_base.py lays out the platform,
// Flux renders it). Stations sit at even columns, so the live step labels below line up; pins mark each station.
// Each step lights up in turn (pin and text column together) so the sequence reads even without the video.

export type PipelineArt = { name: string; pins: Array<[number, number]> };

export function PipelineWorld({
  stages,
  art,
  label,
  inside,
  foot,
}: {
  stages: FlowStage[];
  art: PipelineArt;
  label: string;
  inside: string;
  foot: string;
}) {
  const src = (w: number) => `/images/photos/${art.name}-${w}.webp`;
  return (
    <figure className="pw" aria-label={label}>
      <div className="pw-media">
        <div className="pw-track">
          <img
            src={src(1536)}
            srcSet={`${src(768)} 768w, ${src(1536)} 1536w, ${src(3072)} 3072w`}
            sizes="(max-width: 1320px) 100vw, 1320px"
            width={1536}
            height={448}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <BgVideo name={art.name} />
          {art.pins.map(([x, y], i) => (
            <span key={i} className="pw-pin mono" style={{ left: `${x * 100}%`, top: `${y * 100}%`, ['--i' as string]: i }} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <span className="pw-tag mono">{inside}</span>
      </div>
      <ol className="pw-stages">
        {stages.map((s, i) => (
          <li key={s.title} style={{ ['--i' as string]: i }}>
            <span className="pw-stage-head">
              <Icon name={s.icon} size={18} />
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            </span>
            <strong>{s.title}</strong>
            <span>{s.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption className="flow-foot mono">
        <Icon name="lock" size={14} /> {foot}
      </figcaption>
    </figure>
  );
}
