import Link from 'next/link';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import type { Product } from '@/lib/products';
import { Icon } from './Icon';
import { Corners } from './ui';

export const whitepaperCover = (p: Product) => `/images/whitepapers/${p.id}.webp`;

/** Inline promotion for a product's gated whitepaper. */
export function WhitepaperTeaser({ product: p, lang }: { product: Product; lang: Locale }) {
  const { common, whitepapers } = getDict(lang);
  const href = lp(lang, `/whitepapers/${p.id}`);
  return (
    <div className="wp-teaser panel" data-reveal>
      <Corners />
      <Link href={href} className="wp-teaser-cover" tabIndex={-1} aria-hidden="true">
        <img src={whitepaperCover(p)} alt="" width={600} height={849} loading="lazy" />
      </Link>
      <div className="wp-teaser-body">
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {common.whitepaper.free}
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
        {whitepapers.landing.language && <p className="fine-print">{whitepapers.landing.language}</p>}
        <div className="btn-row">
          <Link href={href} className="btn btn-primary btn-lg">
            <Icon name="book" size={18} />
            {common.buttons.downloadTheWhitepaper}
          </Link>
        </div>
      </div>
    </div>
  );
}
