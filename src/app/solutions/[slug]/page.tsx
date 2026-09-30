import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlowDiagram } from '@/components/graphics/FlowDiagram';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadNudge } from '@/components/LeadNudge';
import { ProductCard } from '@/components/ProductCard';
import { Corners, CtaBand, Eyebrow, SectionHead } from '@/components/ui';
import { WhitepaperTeaser } from '@/components/WhitepaperTeaser';
import { PRODUCTS, productById } from '@/lib/products';
import { MARKETS, SITE } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = productById((await params).slug);
  if (!p) return {};
  const path = `/solutions/${p.id}`;
  return {
    title: `${p.name} (${p.code})`,
    description: p.summary.length > 160 ? `${p.summary.slice(0, 157).replace(/\s+\S*$/, '')}…` : p.summary,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${p.name} | Logic Sonata`,
      description: p.tagline,
      images: [{ url: p.visuals.ui.src, width: p.visuals.ui.width, height: p.visuals.ui.height, alt: p.visuals.ui.alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const p = productById((await params).slug);
  if (!p) notFound();
  const others = PRODUCTS.filter((o) => o.id !== p.id);
  const url = `${SITE.url}/solutions/${p.id}`;

  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Solutions', path: '/solutions' }, { name: p.name, path: `/solutions/${p.id}` }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${url}#service`,
          name: p.name,
          alternateName: p.code,
          description: p.summary,
          slogan: p.tagline,
          url,
          image: `${SITE.url}${p.visuals.ui.src}`,
          serviceType: 'Private AI',
          provider: { '@id': `${SITE.url}/#org` },
          areaServed: MARKETS.map((m) => ({ '@type': 'Country', name: m.name })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      {/* HERO */}
      <section className="page-hero product-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container product-hero-inner">
          <div>
            <nav className="crumbs mono" aria-label="Breadcrumb">
              <Link href="/solutions">Solutions</Link> / <span>{p.code}</span>
            </nav>
            <Eyebrow>{p.code}</Eyebrow>
            <h1 className="h1 page-h1">{p.name}</h1>
            <p className="product-hero-tagline">{p.tagline}</p>
            <p className="lead">{p.heroLead}</p>
            <div className="btn-row">
              <Link href={`/whitepapers/${p.id}`} className="btn btn-primary btn-lg">
                <Icon name="book" size={18} />
                Download the whitepaper
              </Link>
              <Link href={SITE.primaryCta.href} className="btn btn-ghost btn-lg">
                Book a consultation
              </Link>
            </div>
          </div>
          <figure className="product-shot">
            <img
              src={p.visuals.ui.src}
              alt={p.visuals.ui.alt}
              width={p.visuals.ui.width}
              height={p.visuals.ui.height}
              fetchPriority="high"
            />
            <figcaption className="mono">Illustration · {p.visuals.ui.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <div className="highlight-strip">
        <ul className="container">
          {p.highlights.map((h) => (
            <li key={h}>
              <Icon name="check" size={16} />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* PROBLEM */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHead index="01" eyebrow="The challenge" title={p.problem.title} lead={p.problem.body} />
          </div>
          <figure className="product-photo panel panel-photo" data-reveal>
            <Corners />
            <img src={p.visuals.photo.src} alt={p.visuals.photo.alt} width={p.visuals.photo.width} height={p.visuals.photo.height} loading="lazy" />
            <figcaption className="mono">Illustration · {p.visuals.photo.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow="Capabilities" title="What it does." />
          <div className="cards cards-3">
            {p.capabilities.map((c) => (
              <article key={c.title} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={c.icon} />
                </span>
                <h3 className="h3">{c.title}</h3>
                <p>{c.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <SectionHead
            index="03"
            eyebrow="How it works"
            title="From question to answer, inside your walls."
            lead={p.builtOn}
          />
          <div data-reveal>
            <FlowDiagram stages={p.flow} label={`${p.name} architecture`} />
          </div>
          <ol className={`steps steps-${p.steps.length}`} style={{ marginTop: 40 }} data-reveal>
            {p.steps.map((s, i) => (
              <li key={s.title}>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead index="04" eyebrow={p.spotlight.eyebrow} title={p.spotlight.title} lead={p.spotlight.lead} />
          <div className="spotlight" data-reveal>
            {p.spotlight.items.map((it, i) => (
              <div key={i} className="spotlight-item">
                <span className="mono spotlight-label">{it.label}</span>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section">
        <div className="container">
          <SectionHead index="05" eyebrow="Use cases" title="Where it pays off first." />
          <div className="cards cards-3 cards-tight">
            {p.useCases.map((u) => (
              <article key={u.title} className="card card-industry" data-reveal>
                <span className="card-icon">
                  <Icon name={u.icon} />
                </span>
                <h3 className="h4">{u.title}</h3>
                <p>{u.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="section section-alt">
        <div className="container split">
          <div>
            <SectionHead
              index="06"
              eyebrow="Security and governance"
              title="Controls built in, not bolted on."
              lead="Every Logic Sonata system runs on hardware you control, with access, audit and data boundaries designed in from the start."
            />
          </div>
          <ul className="control-list" data-reveal>
            {p.controls.map((c) => (
              <li key={c}>
                <Icon name="shield" size={18} />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHITEPAPER */}
      <section className="section">
        <div className="container">
          <WhitepaperTeaser product={p} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container faq-wrap">
          <SectionHead index="07" eyebrow="FAQ" title={`Questions about ${p.code}.`} />
          <div className="faq" data-reveal>
            {p.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <h3>{f.q}</h3>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section">
        <div className="container">
          <SectionHead index="08" eyebrow="More from Logic Sonata" title="Other private AI systems." />
          <div className="cards cards-2">
            {others.map((o) => (
              <ProductCard key={o.id} product={o} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`See ${p.code} on your own data.`}
        lead="Book a 30-minute consultation. We will show the system working and scope a pilot around your use case."
      />
      <LeadNudge product={p} />
    </>
  );
}
