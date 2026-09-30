import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { CtaBand, PageHero, SectionHead } from '@/components/ui';
import type { IconName } from '@/lib/site';
import { MARKETS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us: Private AI Built Around Business Control',
  description:
    'Logic Sonata helps businesses across Southeast Asia adopt AI on their own terms: on-premise, in a private cloud or hybrid, without giving up control of confidential data.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

const CONTROL = [
  'Confidential business information',
  'Intellectual property',
  'Customer and employee data',
  'Internal documents and knowledge',
  'AI models and infrastructure',
  'User access and permissions',
  'Audit records and governance',
  'Integration with existing systems',
];

const PRINCIPLES: Array<{ name: string; detail: string; icon: IconName }> = [
  { name: 'Private by design', detail: 'Privacy and control are part of the architecture from the start, not added at the end.', icon: 'shield' },
  { name: 'Business-led', detail: 'We focus on practical use cases that raise productivity and protect organisational knowledge.', icon: 'rocket' },
  { name: 'Model independent', detail: 'You are never locked to one AI provider. Models and infrastructure evolve with your business.', icon: 'layers' },
  { name: 'Built for integration', detail: 'AI should work with the documents, databases and platforms you already use.', icon: 'network' },
  { name: 'Designed to scale', detail: 'Most customers start with one pilot. We help it grow into a company-wide AI platform.', icon: 'grid' },
  { name: 'Measurable value', detail: 'Every AI project should deliver clear business results, not just a technology demo.', icon: 'check' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'About', path: '/about' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: `${SITE.url}/about`,
          name: 'About Logic Sonata',
          about: { '@id': `${SITE.url}/#org` },
        }}
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            AI without losing control of <span className="accent">your data.</span>
          </>
        }
        lead="We believe every business should benefit from AI without giving up control of its confidential information, intellectual property, internal knowledge or business processes."
      />

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              index="01"
              eyebrow="Why we exist"
              title="Too many companies choose between innovation and control."
            />
          </div>
          <div data-reveal>
            <p className="lead" style={{ marginBottom: 20 }}>
              Many organisations hesitate to send sensitive information to external AI services. Business documents,
              customer data, engineering knowledge, source code and financial records are often too valuable to place
              outside the company’s control.
            </p>
            <p className="lead">
              We created Logic Sonata to remove that trade-off. We help businesses adopt AI on their own terms: on
              their premises, in a private cloud or in a controlled hybrid environment, with the hardware, software,
              training and support to make it work.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow="What stays under your control" title="Everything that matters." />
          <ul className="pill-grid" data-reveal>
            {CONTROL.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" eyebrow="Our approach" title="Six principles in every deployment." />
          <div className="cards cards-3">
            {PRINCIPLES.map((p) => (
              <article key={p.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={p.icon} />
                </span>
                <h3 className="h3">{p.name}</h3>
                <p>{p.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <SectionHead
              index="04"
              eyebrow="Who we serve"
              title="Businesses across Southeast Asia."
              lead="We support business and technical teams alike, from executive strategy and use-case discovery to infrastructure design, implementation, adoption and ongoing support."
            />
          </div>
          <ul className="pill-grid" data-reveal>
            {['Manufacturers', 'Retailers', 'Design companies', 'Suppliers', 'Apparel & textile', 'Logistics & supply chain', 'Engineering & construction', 'Technology', 'Professional services', 'Regional & family-owned groups'].map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Our vision
            </p>
            <p className="statement">
              AI will not replace business control. <span className="accent">It will strengthen it.</span>
            </p>
            <p className="lead" style={{ marginTop: 24 }}>
              Our ambition is to be the trusted private AI partner for organisations in{' '}
              {MARKETS.map((m) => m.name).slice(0, -1).join(', ')} and {MARKETS[MARKETS.length - 1].name}. Use AI.
              Protect your knowledge. Keep control.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
