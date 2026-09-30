import type { FlowStage } from '@/lib/products';
import { Icon } from '../Icon';

/** Architecture flow inside the customer boundary; horizontal on desktop, vertical on phones. */
export function FlowDiagram({ stages, label, inside, foot }: { stages: FlowStage[]; label: string; inside: string; foot: string }) {
  return (
    <figure className="flow-diagram" aria-label={label}>
      <div className="flow-boundary">
        <span className="flow-boundary-tag mono">{inside}</span>
        <ol className="flow-stages">
          {stages.map((s, i) => (
            <li key={s.title} className="flow-stage" style={{ ['--i' as string]: i }}>
              <span className="flow-stage-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="mono flow-stage-num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{s.title}</strong>
              <span>{s.detail}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="flow-foot mono">
        <Icon name="lock" size={14} /> {foot}
      </figcaption>
    </figure>
  );
}
