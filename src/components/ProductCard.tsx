import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Icon } from './Icon';

export function whitepaperHref(p: Product) {
  return `/whitepapers/${p.id}`;
}

/** Product summary card with a page link and a whitepaper download button. */
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="card card-product" data-reveal>
      <span className="card-icon">
        <Icon name={p.icon} />
      </span>
      <span className="mono card-code">{p.code}</span>
      <h3 className="h3">
        <Link href={`/solutions/${p.id}`} className="card-title-link">
          {p.name}
        </Link>
      </h3>
      <p>{p.summary}</p>
      <div className="card-actions">
        <Link href={`/solutions/${p.id}`} className="btn btn-ghost btn-sm">
          Explore
          <Icon name="arrow" size={15} />
        </Link>
        <Link href={whitepaperHref(p)} className="btn btn-link btn-sm">
          <Icon name="book" size={15} />
          Download whitepaper
        </Link>
      </div>
    </article>
  );
}
