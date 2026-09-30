import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { Corners, Eyebrow } from '@/components/ui';
import { whitepaperCover } from '@/components/WhitepaperTeaser';
import { PRODUCTS, productById } from '@/lib/products';
import { SITE } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = productById((await params).slug);
  if (!p) return {};
  const path = `/whitepapers/${p.id}`;
  return {
    title: `Whitepaper: ${p.whitepaper.title}`,
    description: `Free whitepaper from Logic Sonata: ${p.whitepaper.subtitle}. ${p.whitepaper.contents.join(', ')}.`,
    alternates: { canonical: path },
    openGraph: { url: path, images: [{ url: whitepaperCover(p), width: 600, height: 849 }] },
  };
}

export default async function WhitepaperLanding({ params }: { params: Promise<Params> }) {
  const p = productById((await params).slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: 'Whitepapers', path: '/whitepapers' },
          { name: p.whitepaper.title, path: `/whitepapers/${p.id}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Report',
          name: `${p.whitepaper.title}: ${p.whitepaper.subtitle}`,
          about: p.name,
          publisher: { '@id': `${SITE.url}/#org` },
          image: `${SITE.url}${whitepaperCover(p)}`,
          isAccessibleForFree: true,
          inLanguage: 'en',
        }}
      />
      <section className="page-hero wp-landing">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container wp-landing-grid">
          <div className="wp-landing-info">
            <nav className="crumbs mono" aria-label="Breadcrumb">
              <Link href="/whitepapers">Whitepapers</Link> / <span>{p.code}</span>
            </nav>
            <Eyebrow>Free whitepaper · {p.code}</Eyebrow>
            <h1 className="h1 page-h1">{p.whitepaper.title}</h1>
            <p className="product-hero-tagline">{p.whitepaper.subtitle}.</p>
            <div className="wp-landing-cover">
              <img src={whitepaperCover(p)} alt={`Cover of the ${p.whitepaper.title} whitepaper`} width={600} height={849} fetchPriority="high" />
              <div>
                <h2 className="h4">What is inside</h2>
                <ul className="check-list">
                  {p.whitepaper.contents.map((c) => (
                    <li key={c}>
                      <Icon name="check" size={16} />
                      {c}
                    </li>
                  ))}
                  <li>
                    <Icon name="check" size={16} />
                    Security controls checklist
                  </li>
                </ul>
                <p className="fine-print" style={{ marginTop: 16 }}>
                  PDF · Written for business and technology leaders evaluating {p.name.toLowerCase()} solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="panel wp-landing-form">
            <Corners />
            <h2 className="h3">Get your free copy</h2>
            <p className="form-intro">Tell us where to send it. Your download starts as soon as you submit.</p>
            <LeadForm
              variant="whitepaper"
              subject={`Whitepaper download: ${p.whitepaper.title}`}
              asset={p.whitepaper.title}
              downloadUrl={p.whitepaper.file}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container wp-landing-more">
          <p className="lead">
            Prefer to see {p.code} first?{' '}
            <Link href={`/solutions/${p.id}`} className="email-link">
              Explore the {p.name}
            </Link>{' '}
            or{' '}
            <Link href={SITE.primaryCta.href} className="email-link">
              book a consultation
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
