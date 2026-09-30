import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Icon } from './Icon';
import { Corners } from './ui';

export const whitepaperCover = (p: Product) => `/images/whitepapers/${p.id}.webp`;

/** Inline promotion for a product's gated whitepaper. */
export function WhitepaperTeaser({ product: p }: { product: Product }) {
  return (
    <div className="wp-teaser panel" data-reveal>
      <Corners />
      <Link href={`/whitepapers/${p.id}`} className="wp-teaser-cover" tabIndex={-1} aria-hidden="true">
        <img src={whitepaperCover(p)} alt="" width={600} height={849} loading="lazy" />
      </Link>
      <div className="wp-teaser-body">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Free whitepaper
        </p>
        <h2 className="h2">{p.whitepaper.title}</h2>
        <p className="lead">{p.whitepaper.subtitle}.</p>
        <ul className="check-list">
          {p.whitepaper.contents.map((c) => (
            <li key={c}>
              <Icon name="check" size={16} />
              {c}
            </li>
          ))}
        </ul>
        <div className="btn-row">
          <Link href={`/whitepapers/${p.id}`} className="btn btn-primary btn-lg">
            <Icon name="book" size={18} />
            Download the whitepaper
          </Link>
        </div>
      </div>
    </div>
  );
}
