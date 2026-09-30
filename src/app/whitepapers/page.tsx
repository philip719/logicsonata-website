import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { CtaBand, PageHero } from '@/components/ui';
import { whitepaperCover } from '@/components/WhitepaperTeaser';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Private AI Whitepapers',
  description:
    'Free whitepapers on private knowledge assistants, on-site vision AI, private coding assistants, governed AI agents and private image generation.',
  alternates: { canonical: '/whitepapers' },
  openGraph: { url: '/whitepapers' },
};

export default function WhitepapersIndex() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Whitepapers', path: '/whitepapers' }])} />
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Private AI, <span className="accent">explained.</span>
          </>
        }
        lead="Practical whitepapers for business and technology leaders: how each system works, the controls that keep data private, where it pays off first and how to roll it out."
      />
      <section className="section">
        <div className="container">
          <div className="wp-grid">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="wp-card" data-reveal>
                <Link href={`/whitepapers/${p.id}`} className="wp-card-cover" tabIndex={-1} aria-hidden="true">
                  <img src={whitepaperCover(p)} alt="" width={600} height={849} loading="lazy" />
                </Link>
                <span className="mono card-code">{p.code}</span>
                <h2 className="h3">
                  <Link href={`/whitepapers/${p.id}`} className="card-title-link">
                    {p.whitepaper.title}
                  </Link>
                </h2>
                <p>{p.whitepaper.subtitle}.</p>
                <Link href={`/whitepapers/${p.id}`} className="btn btn-ghost btn-sm">
                  <Icon name="book" size={15} />
                  Download
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
