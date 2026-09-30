import Link from 'next/link';
import { FlowDiagram } from '@/components/graphics/FlowDiagram';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadNudge } from '@/components/LeadNudge';
import { ProductCard } from '@/components/ProductCard';
import { fmt } from '@/components/Rich';
import { Corners, CtaBand, Eyebrow, SectionHead } from '@/components/ui';
import { WhitepaperTeaser } from '@/components/WhitepaperTeaser';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import type { Product } from '@/lib/products';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';

export function productMeta(lang: Locale, p: Product) {
  return pageMeta(lang, `/solutions/${p.id}`, {
    title: `${p.name} (${p.code})`,
    description: p.summary.length > 160 ? `${p.summary.slice(0, 157).replace(/\s+\S*$/, '')}…` : p.summary,
    ogTitle: `${p.name} | ${SITE.name}`,
    image: { url: p.visuals.ui.src, width: p.visuals.ui.width, height: p.visuals.ui.height, alt: p.visuals.ui.alt },
  });
}

export function ProductView({ lang, product: p }: { lang: Locale; product: Product }) {
  const { common, solutions, productPage: t, products } = getDict(lang);
  const others = products.filter((o) => o.id !== p.id);
  const url = absoluteUrl(lang, `/solutions/${p.id}`);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: solutions.breadcrumb, path: '/solutions' }, { name: p.name, path: `/solutions/${p.id}` }])} />
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
          areaServed: MARKET_NAMES_EN.map((name) => ({ '@type': 'Country', name })),
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
              <Link href={lp(lang, '/solutions')}>{solutions.breadcrumb}</Link> / <span>{p.code}</span>
            </nav>
            <Eyebrow>{p.code}</Eyebrow>
            <h1 className="h1 page-h1">{p.name}</h1>
            <p className="product-hero-tagline">{p.tagline}</p>
            <p className="lead">{p.heroLead}</p>
            <div className="btn-row">
              <Link href={lp(lang, `/whitepapers/${p.id}`)} className="btn btn-primary btn-lg">
                <Icon name="book" size={18} />
                {common.buttons.downloadTheWhitepaper}
              </Link>
              <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-ghost btn-lg">
                {t.bookConsultation}
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
            <figcaption className="mono">
              {common.illustration} · {p.visuals.ui.caption}
            </figcaption>
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
            <SectionHead index="01" eyebrow={t.challenge} title={p.problem.title} lead={p.problem.body} />
          </div>
          <figure className="product-photo panel panel-photo" data-reveal>
            <Corners />
            <img src={p.visuals.photo.src} alt={p.visuals.photo.alt} width={p.visuals.photo.width} height={p.visuals.photo.height} loading="lazy" />
            <figcaption className="mono">
              {common.illustration} · {p.visuals.photo.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow={t.capabilitiesEyebrow} title={t.capabilitiesTitle} />
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
            eyebrow={t.howEyebrow}
            title={t.howTitle}
            lead={p.builtOn}
          />
          <div data-reveal>
            <FlowDiagram stages={p.flow} label={fmt(t.architecture, { name: p.name })} inside={common.flow.inside} foot={common.flow.foot} />
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
          <SectionHead index="05" eyebrow={t.useCasesEyebrow} title={t.useCasesTitle} />
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
              eyebrow={t.controlsEyebrow}
              title={t.controlsTitle}
              lead={t.controlsLead}
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
          <WhitepaperTeaser product={p} lang={lang} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container faq-wrap">
          <SectionHead index="07" eyebrow={t.faqEyebrow} title={fmt(t.faqTitle, { code: p.code })} />
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
          <SectionHead index="08" eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
          <div className="cards cards-2">
            {others.map((o) => (
              <ProductCard key={o.id} product={o} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={fmt(t.ctaTitle, { code: p.code })} lead={t.ctaLead} />
      <LeadNudge
        product={p}
        lang={lang}
        t={{ free: common.whitepaper.free, label: common.whitepaper.nudgeLabel, dismiss: common.whitepaper.dismiss, cta: common.buttons.getPdf, note: common.whitepaper.englishOnly }}
      />
    </>
  );
}
