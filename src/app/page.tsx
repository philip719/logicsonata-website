import Link from 'next/link';
import { DataFlow } from '@/components/graphics/DataFlow';
import { DeploymentArt } from '@/components/graphics/DeploymentArt';
import { RegionMap } from '@/components/graphics/RegionMap';
import { StackDiagram } from '@/components/graphics/StackDiagram';
import { HeroVideo } from '@/components/HeroVideo';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { Corners, CtaBand, Eyebrow, SectionHead } from '@/components/ui';
import { FAQ, HARDWARE_SPECS, INDUSTRIES, MARKETS, PROCESS, PRODUCTS, SITE, STACK } from '@/lib/site';

const DEPLOYMENTS = [
  {
    variant: 'onprem' as const,
    name: 'On-premise private AI',
    line: 'AI that runs inside your building.',
    detail: 'For buyer data, HR records, contracts and source code that should never leave your walls.',
  },
  {
    variant: 'hosted' as const,
    name: 'Hosted private AI',
    line: 'Private AI without buying hardware.',
    detail: 'Dedicated capacity on managed private GPU cloud. Fast pilots and lower upfront cost.',
  },
  {
    variant: 'hybrid' as const,
    name: 'Hybrid private AI',
    line: 'The right environment for each data type.',
    detail: 'On-premise control where it matters, hosted scale where it does not.',
  },
];

const EXPOSURE = [
  { icon: 'eye' as const, text: 'Buyer data and pricing pasted into public chatbots' },
  { icon: 'policy' as const, text: 'Costing, contracts and compliance files with no audit trail' },
  { icon: 'lock' as const, text: 'No policy, no visibility and no control over where data goes' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Private AI solutions',
  serviceType: 'Private AI implementation and managed services',
  provider: { '@id': `${SITE.url}/#org` },
  areaServed: MARKETS.map((m) => ({ '@type': 'Country', name: m.name })),
  description:
    'Complete private AI solutions combining hardware, software, company knowledge, access controls, implementation, training and ongoing support, deployed on-premise, hosted or hybrid.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Private AI products',
    itemListElement: PRODUCTS.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.name, description: p.summary, url: `${SITE.url}/solutions#${p.id}` },
      ...(p.price.startsWith('From')
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: Number(p.price.replace(/\D/g, '')) * 1000,
              description: `${p.price} (setup)`,
            },
          }
        : {}),
    })),
  },
};

export default function Home() {
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
            <Eyebrow>Private AI · {MARKETS.map((m) => m.code).join(' · ')}</Eyebrow>
            <h1 className="h1 hero-h1">
              Private AI,
              <br />
              built inside <span className="accent">your walls.</span>
            </h1>
            <p className="lead lead-lg hero-lead">
              Logic Sonata delivers complete private AI for businesses across Southeast Asia: the hardware, the
              software, your company knowledge, access controls, implementation, training and ongoing support. Your
              data never leaves your control.
            </p>
            <div className="btn-row">
              <Link href={SITE.primaryCta.href} className="btn btn-primary btn-lg">
                {SITE.primaryCta.label}
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="#stack" className="btn btn-ghost btn-lg">
                See the full stack
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>100%</dt>
                <dd>Data stays under your control</dd>
              </div>
              <div>
                <dt>3</dt>
                <dd>Deployment models: on-premise, hosted, hybrid</dd>
              </div>
              <div>
                <dt>5</dt>
                <dd>Southeast Asian markets served</dd>
              </div>
            </dl>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-frame">
              <span className="hero-visual-tag mono">FIG. 01 / PRIVATE AI APPLIANCE, EXPLODED</span>
              <HeroVideo />
            </div>
            <p className="hero-visual-caption mono">Illustrative render · internal layout simplified</p>
            <ul className="spec-chips" aria-label="Hardware highlights">
              {HARDWARE_SPECS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <div className="marquee" aria-label="Industries we serve">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1}>
              {['Manufacturing', 'Retail', 'Design', 'Suppliers', 'Regional groups', 'Apparel & textile', 'Logistics', 'Engineering', 'Professional services', 'Software teams'].map((t) => (
                <li key={t}>
                  <span className="marquee-dot" aria-hidden="true" />
                  {t}
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
            <SectionHead
              index="01"
              eyebrow="The problem"
              title={
                <>
                  Your team is already using AI. Do you know what it&rsquo;s <span className="accent">exposing?</span>
                </>
              }
              lead="Staff paste production reports, buyer emails and costing sheets into public AI tools every day, often without a policy and without anyone knowing where that data ends up. This is not a future risk. It is happening now, in every department."
            />
            <ul className="exposure-list" data-reveal>
              {EXPOSURE.map((e) => (
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
            <DataFlow />
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="section section-alt" id="stack">
        <div className="container split split--reverse">
          <div className="panel panel-graphic" data-reveal>
            <Corners />
            <StackDiagram />
          </div>
          <div>
            <SectionHead
              index="02"
              eyebrow="The solution"
              title="One partner. The complete private AI stack."
              lead="Hardware and software are only half the job. We deliver every layer needed to make private AI work in a real business, and we stay accountable for all of it."
            />
            <ol className="stack-list" data-reveal>
              {STACK.map((layer, i) => (
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
          <SectionHead
            index="03"
            eyebrow="Deployment"
            title="The right AI environment for the right data."
            lead="Every Logic Sonata product runs in any of three deployment models, with the same governance and the same control."
          />
          <div className="cards cards-3">
            {DEPLOYMENTS.map((d) => (
              <article key={d.name} className="card card-art" data-reveal>
                <Corners />
                <DeploymentArt variant={d.variant} />
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
            <SectionHead index="04" eyebrow="Products" title={<>Five private AI systems.<br />One that fits your data.</>} />
            <p className="head-aside" data-reveal>
              Each system ships on-premise, hosted or hybrid, fully configured with your knowledge and access rules.
            </p>
          </div>
          <div className="cards cards-3">
            {PRODUCTS.map((p) => (
              <Link key={p.id} href={`/solutions#${p.id}`} className="card card-product" data-reveal>
                <span className="card-icon">
                  <Icon name={p.icon} />
                </span>
                <span className="mono card-code">{p.code}</span>
                <h3 className="h3">{p.name}</h3>
                <p>{p.summary}</p>
                <span className="card-meta">
                  {p.price}
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            ))}
            <div className="card card-cta" data-reveal>
              <h3 className="h3">Not sure which one fits?</h3>
              <p>Most customers start with a Readiness Assessment. We map your data and recommend the right system.</p>
              <Link href={SITE.primaryCta.href} className="btn btn-primary">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" id="industries">
        <div className="container">
          <SectionHead
            index="05"
            eyebrow="Who we serve"
            title="Built for businesses that cannot send their data to public AI."
            lead="Our core customers are manufacturers, retailers, design companies, suppliers and regional groups. In practice, any company that wants AI without giving up its data is a fit."
          />
          <div className="cards cards-3 cards-tight">
            {INDUSTRIES.map((ind) => (
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
          <SectionHead index="06" eyebrow="Process" title="From first conversation to managed operations." align="center" />
          <ol className="process" data-reveal>
            {PROCESS.map((p, i) => (
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
            <SectionHead
              index="07"
              eyebrow="Markets"
              title="Serving five markets across Southeast Asia."
              lead="We work with businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand, with delivery, training and managed support across the region."
            />
            <ul className="market-list" data-reveal>
              {MARKETS.map((m) => (
                <li key={m.code}>
                  <span className="mono">{m.code}</span>
                  {m.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel panel-graphic panel-map" data-reveal>
            <Corners />
            <RegionMap />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt" id="faq">
        <div className="container faq-wrap">
          <SectionHead index="08" eyebrow="FAQ" title="Questions we get asked first." />
          <div className="faq" data-reveal>
            {FAQ.map((f, i) => (
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

      <CtaBand />
    </>
  );
}
