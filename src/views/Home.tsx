import Link from 'next/link';
import { BgVideo } from '@/components/BgVideo';
import { DataFlow } from '@/components/graphics/DataFlow';
import { StackDiagram } from '@/components/graphics/StackDiagram';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { Photo } from '@/components/Photo';
import { Rich } from '@/components/Rich';
import { ScrollStory } from '@/components/ScrollStory';
import { Statement } from '@/components/Statement';
import { Corners, SectionHead } from '@/components/ui';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import { MARKET_PHOTOS, productPhoto } from '@/lib/photos';
import { MARKET_NAMES_EN, MARKETS, SITE } from '@/lib/site';

// Part label anchors on the hero photo, as a share of its width and height (tools/photos/README.md).
const HERO_PARTS: Array<{ side: 'left' | 'right'; style: React.CSSProperties }> = [
  { side: 'right', style: { '--x': '61.2%', '--y': '19.7%', '--len': '9cqw' } as React.CSSProperties },
  { side: 'right', style: { '--x': '58.3%', '--y': '37%', '--len': '12cqw' } as React.CSSProperties },
  { side: 'right', style: { '--x': '50.1%', '--y': '53.5%', '--len': '20cqw' } as React.CSSProperties },
  { side: 'right', style: { '--x': '65.1%', '--y': '44%', '--len': '5cqw' } as React.CSSProperties },
  { side: 'right', style: { '--x': '57.3%', '--y': '59.6%', '--len': '13cqw' } as React.CSSProperties },
]

const STORY_FRAMES = 144;


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
      <section className="xh">
        <div className="xh-media">
          <Photo name="home-hero" alt={common.graphics.heroRender} sizes="(max-width: 960px) 100vw, 82vw" priority />
          <ul className="xh-labels" aria-label={t.hero.partsLabel}>
            {t.hero.parts.map((part, i) => (
              <li key={part} className="xh-label" data-side={HERO_PARTS[i].side} style={HERO_PARTS[i].style}>
                <span>{part}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <div className="xh-copy">
            <p className="eyebrow">
              {t.hero.eyebrow} · {MARKETS.map((m) => m.code).join(' · ')}
            </p>
            <h1 className="h1" data-decode>
              <Rich text={t.hero.title} lang={lang} />
            </h1>
            <p className="lead lead-lg">{t.hero.lead}</p>
            <div className="btn-row">
              <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
                {common.cta.primary}
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="#stack" className="btn btn-ghost btn-lg">
                {t.hero.secondary}
              </Link>
            </div>
          </div>
          <div className="xh-foot">
            <dl className="xh-readout">
              {t.hero.stats.map((s) => (
                <div key={s.value}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
            <a href="#intro" className="scroll-cue hud">
              <i aria-hidden="true" />
              {t.hero.scroll}
            </a>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="intro" id="intro">
        <div className="backdrop" aria-hidden="true">
          <Photo name="home-intro" />
          <BgVideo name="loop-city-rain" />
        </div>
        <div className="container">
          <p className="eyebrow">
            <span className="eyebrow-index">01</span>
            {t.intro.eyebrow}
          </p>
          <Statement text={t.intro.statement} lang={lang} />
        </div>
      </section>

      {/* SCROLL STORY */}
      <ScrollStory frames={STORY_FRAMES} poster="/images/story/poster.webp" chapters={t.story.chapters} counterLabel={t.story.counter} />

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
      <section className="xd" id="deployment">
        <div className="backdrop" aria-hidden="true">
          <Photo name="home-datacentre-aisle" />
          <BgVideo name="loop-datacentre" />
        </div>
        <div className="container">
          <SectionHead index="03" eyebrow={t.deployment.eyebrow} title={t.deployment.title} lead={t.deployment.lead} />
          <div className="xd-list">
            {t.deployment.items.map((d, i) => (
              <article key={d.variant} className="xd-item chamfer" data-reveal>
                <p className="hud">
                  <b>_{String(i + 1).padStart(3, '0')}</b> / _{String(t.deployment.items.length).padStart(3, '0')}
                </p>
                <h3>{d.name}</h3>
                <p className="strong">{d.line}</p>
                <p>{d.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="container">
          <div className="head-row">
            <SectionHead index="04" eyebrow={t.products.eyebrow} title={<Rich text={t.products.title} lang={lang} />} />
            <p className="head-aside" data-reveal>
              {t.products.aside}
            </p>
          </div>
          <div className="xp-grid">
            {products.map((p) => (
              <Link key={p.id} href={lp(lang, `/solutions/${p.id}`)} className="xp-card chamfer" data-reveal>
                <div className="photo" aria-hidden="true">
                  <Photo name={productPhoto(p.id, 'close')} sizes="(max-width: 640px) 100vw, 50vw" />
                </div>
                <div className="xp-top hud">
                  <b>{p.code}</b>
                  <span>[_ {t.products.view} ]</span>
                </div>
                <span className="view-badge" aria-hidden="true">
                  {t.products.view}
                </span>
                <div className="xp-body">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </div>
              </Link>
            ))}
            <div className="xp-card xp-card--cta chamfer" data-reveal>
              <div className="xp-body">
                <h3>{t.products.ctaTitle}</h3>
                <p>{t.products.ctaText}</p>
                <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary">
                  {common.cta.consultation}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <div className="xmq" aria-label={t.marqueeLabel}>
        <div className="xmq-track">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1}>
              {t.marquee.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

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
        <div className="container xm-head">
          <SectionHead index="07" eyebrow={t.markets.eyebrow} title={t.markets.title} lead={t.markets.lead} />
          <p className="hud head-aside">[_ {t.markets.swipe} → ]</p>
        </div>
        <ul className="xm-track" role="list">
          {MARKETS.map((m, i) => (
            <li key={m.code} className="xm-card chamfer">
              <div className="photo" aria-hidden="true">
                <Photo name={MARKET_PHOTOS[m.code]} sizes="(max-width: 640px) 80vw, 30vw" />
              </div>
              <p className="hud">
                <b>{m.code}</b>
                <span>
                  _{String(i + 1).padStart(3, '0')} / _{String(MARKETS.length).padStart(3, '0')}
                </span>
              </p>
              <h3>{data.markets[i].city}</h3>
            </li>
          ))}
        </ul>
      </section>

      {/* READOUT */}
      <section className="xs">
        <div className="backdrop" aria-hidden="true">
          <Photo name="home-control-room" />
          <BgVideo name="loop-control-room" />
        </div>
        <div className="container">
          <SectionHead index="08" eyebrow={t.readout.eyebrow} title={t.readout.title} />
          <div className="xs-grid">
            {t.readout.items.map((r, i) => (
              <div key={r.label} className="xs-cell chamfer" data-reveal>
                <span className="hud">
                  <b>_{String(i + 1).padStart(3, '0')}</b>
                </span>
                <span className="num">
                  <Rich text={r.value} lang={lang} />
                </span>
                <p>{r.label}</p>
              </div>
            ))}
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

      {/* CTA */}
      <section className="xc" id="contact">
        <div className="backdrop" aria-hidden="true">
          <Photo name="home-cta-boardroom" />
        </div>
        <div className="container" data-reveal>
          <p className="eyebrow">{common.ctaBand.eyebrow}</p>
          <h2 className="h2" data-decode>
            {common.ctaBand.title}
          </h2>
          <p className="lead">{common.ctaBand.lead}</p>
          <div className="btn-row btn-row--center">
            <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
              {common.cta.primary}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
