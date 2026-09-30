import Link from 'next/link';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import type { Product } from '@/lib/products';
import { Icon } from './Icon';

/** Product summary card with a page link and a whitepaper download button. */
export function ProductCard({ product: p, lang }: { product: Product; lang: Locale }) {
  const { buttons } = getDict(lang).common;
  return (
    <article className="card card-product" data-reveal>
      <span className="card-icon">
        <Icon name={p.icon} />
      </span>
      <span className="mono card-code">{p.code}</span>
      <h3 className="h3">
        <Link href={lp(lang, `/solutions/${p.id}`)} className="card-title-link">
          {p.name}
        </Link>
      </h3>
      <p>{p.summary}</p>
      <div className="card-actions">
        <Link href={lp(lang, `/solutions/${p.id}`)} className="btn btn-ghost btn-sm">
          {buttons.explore}
          <Icon name="arrow" size={15} />
        </Link>
        <Link href={lp(lang, `/whitepapers/${p.id}`)} className="btn btn-link btn-sm">
          <Icon name="book" size={15} />
          {buttons.downloadWhitepaper}
        </Link>
      </div>
    </article>
  );
}
