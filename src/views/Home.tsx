import Link from 'next/link';
import { DataFlow } from '@/components/graphics/DataFlow';
import { DeploymentArt } from '@/components/graphics/DeploymentArt';
import { RegionMap } from '@/components/graphics/RegionMap';
import { StackDiagram } from '@/components/graphics/StackDiagram';
import { HeroVideo } from '@/components/HeroVideo';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { Rich } from '@/components/Rich';
import { Corners, CtaBand, Eyebrow, SectionHead } from '@/components/ui';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import { MARKET_NAMES_EN, MARKETS, SITE } from '@/lib/site';
import { deployLabels } from './shared';

export function homeMeta(lang: Locale) {
  const { common } = getDict(lang);
  return pageMeta(lang, '/', { absoluteTitle: common.meta.defaultTitle, description: common.meta.description });
}

export function HomeView({ lang }: { lang: Locale }) {
  const { common, data, home: t, products } = getDict(lang);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.serviceSchemaName,
    serviceType: t.serviceSchemaType,
    provider: { '@id': `${SITE.url}/#org` },
    areaServed: MARKET_NAMES_EN.map((name) => ({ '@type': 'Country', name })),
    description: t.serviceSchemaDescription,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.serviceCatalogName,
      itemListElement: products.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.name, description: p.summary, url: absoluteUrl(lang, `/solutions/${p.id}`) },
      })),
    },
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Eyebrow>
              {t.hero.eyebrow} · {MARKETS.map((m) => m.code).join(' · ')}
            </Eyebrow>
            <h1 className="h1 hero-h1">
              <Rich text={t.hero.title} lang={lang} />
            </h1>
            <p className="lead lead-lg hero-lead">{t.hero.lead}</p>
            <div className="btn-row">
              <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
                {common.cta.primary}
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="#stack" className="btn btn-ghost btn-lg">
                {t.hero.secondary}
              </Link>
            </div>
            <dl className="hero-stats">
              {t.hero.stats.map((s) => (
                <div key={s.value}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-frame">
              <HeroVideo label={common.graphics.heroVideo} />
            </div>
            <p className="hero-visual-caption mono">{t.hero.caption}</p>
            <ul className="spec-chips" aria-label={t.hero.specsLabel}>
              {data.hardwareSpecs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <div className="marquee" aria-label={t.marqueeLabel}>
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1}>
              {t.marquee.map((m) => (
                <li key={m}>
                  <span className="marquee-dot" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHead index="01" eyebrow={t.problem.eyebrow} title={<Rich text={t.problem.title} lang={lang} />} lead={t.problem.lead} />
            <ul className="exposure-list" data-reveal>
              {t.problem.exposure.map((e) => (
                <li key={e.text}>
                  <span className="icon-tile">
                    <Icon name={e.icon} />
                  </span>
                  {e.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel panel-graphic" data-reveal>
            <Corners />
            <DataFlow t={common.graphics} />
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="section section-alt" id="stack">
        <div className="container split split--reverse">
          <div className="panel panel-graphic" data-reveal>
            <Corners />
            <StackDiagram layers={data.stack.map((l) => l.name)} title={common.graphics.stackTitle} />
          </div>
          <div>
            <SectionHead index="02" eyebrow={t.stack.eyebrow} title={t.stack.title} lead={t.stack.lead} />
            <ol className="stack-list" data-reveal>
              {data.stack.map((layer, i) => (
                <li key={layer.name}>
                  <span className="mono stack-list-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{layer.name}</h3>
                    <p>{layer.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section className="section" id="deployment">
        <div className="container">
          <SectionHead index="03" eyebrow={t.deployment.eyebrow} title={t.deployment.title} lead={t.deployment.lead} />
          <div className="cards cards-3">
            {t.deployment.items.map((d) => (
              <article key={d.variant} className="card card-art" data-reveal>
                <Corners />
                <DeploymentArt variant={d.variant} labels={deployLabels(common)} />
                <h3 className="h3">{d.name}</h3>
                <p className="card-strong">{d.line}</p>
                <p>{d.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section section-alt" id="products">
        <div className="container">
          <div className="head-row">
            <SectionHead index="04" eyebrow={t.products.eyebrow} title={<Rich text={t.products.title} lang={lang} />} />
            <p className="head-aside" data-reveal>
              {t.products.aside}
            </p>
          </div>
          <div className="cards cards-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
            <div className="card card-cta" data-reveal>
              <h3 className="h3">{t.products.ctaTitle}</h3>
              <p>{t.products.ctaText}</p>
              <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary">
                {common.cta.consultation}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" id="industries">
        <div className="container">
          <SectionHead index="05" eyebrow={t.industries.eyebrow} title={t.industries.title} lead={t.industries.lead} />
          <div className="cards cards-3 cards-tight">
            {data.industries.map((ind) => (
              <article key={ind.name} className="card card-industry" data-reveal>
                <span className="card-icon">
                  <Icon name={ind.icon} />
                </span>
                <h3 className="h4">{ind.name}</h3>
                <p>{ind.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-alt" id="process">
        <div className="container">
          <SectionHead index="06" eyebrow={t.process.eyebrow} title={t.process.title} align="center" />
          <ol className="process" data-reveal>
            {data.process.map((p, i) => (
              <li key={p.step}>
                <span className="process-node mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h4">{p.step}</h3>
                <p>{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MARKETS */}
      <section className="section" id="markets">
        <div className="container split">
          <div>
            <SectionHead index="07" eyebrow={t.markets.eyebrow} title={t.markets.title} lead={t.markets.lead} />
            <ul className="market-list" data-reveal>
              {MARKETS.map((m, i) => (
                <li key={m.code}>
                  <span className="mono">{m.code}</span>
                  {data.markets[i].name}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel panel-graphic panel-map" data-reveal>
            <Corners />
            <RegionMap names={data.markets} title={common.graphics.mapTitle} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt" id="faq">
        <div className="container faq-wrap">
          <SectionHead index="08" eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="faq" data-reveal>
            {data.faq.map((f, i) => (
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

      <CtaBand lang={lang} />
    </>
  );
}
