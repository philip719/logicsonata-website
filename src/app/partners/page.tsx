import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, PageHero, SectionHead } from '@/components/ui';
import type { IconName } from '@/lib/site';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Partner Programme for Private AI Resellers',
  description:
    'Resellers, system integrators, consultants and managed service providers: add secure private AI to your portfolio with Logic Sonata across Southeast Asia.',
  alternates: { canonical: '/partners' },
  openGraph: { url: '/partners' },
};

const applyHref = `mailto:${SITE.emails.partners}?subject=${encodeURIComponent('Reseller Partner Application')}`;

const WHY: Array<{ name: string; detail: string; icon: IconName }> = [
  { name: 'Expand your portfolio', detail: 'Add private AI to your cybersecurity, infrastructure, cloud and data offerings.', icon: 'layers' },
  { name: 'New revenue streams', detail: 'Earn across hardware, software, implementation, integration, training and support.', icon: 'rocket' },
  { name: 'Stronger relationships', detail: 'Solve real customer problems around confidential data, internal knowledge and automation.', icon: 'users' },
  { name: 'Recurring revenue', detail: 'Annual support, managed AI services, model updates, monitoring and optimisation.', icon: 'support' },
  { name: 'Differentiate', detail: 'Move beyond traditional resale with securely deployed, business-ready AI.', icon: 'shield' },
  { name: 'Grow with the market', detail: 'Private AI is becoming a strategic priority for businesses across the region.', icon: 'globe' },
];

const PORTFOLIO: Array<{ name: string; detail: string; icon: IconName }> = [
  { name: 'Private Knowledge Assistant', detail: 'A secure internal assistant for documents, policies, manuals, contracts and reports.', icon: 'book' },
  { name: 'Private AI Agents', detail: 'Workflows and agents that automate repetitive processes inside the customer’s environment.', icon: 'agent' },
  { name: 'Private Code Assistant', detail: 'A secure coding assistant for teams working with proprietary source code.', icon: 'code' },
  { name: 'Private Translation', detail: 'Multilingual translation for documents, communications and technical content.', icon: 'translate' },
  { name: 'Private Vision AI', detail: 'Image analysis, visual inspection, document processing and industry computer vision.', icon: 'eye' },
  { name: 'Private Voice AI', detail: 'Speech recognition, transcription and internal voice assistants.', icon: 'wave' },
  { name: 'Private AI Infrastructure', detail: 'Preconfigured AI servers, GPU workstations, private cloud, model hosting, access control and monitoring.', icon: 'chip' },
];

const STEPS = [
  ['Identify the opportunity', 'You spot customers with data privacy, internal AI or secure infrastructure needs.'],
  ['Qualify the use case', 'We work with you on objectives, data requirements, security and expected outcomes.'],
  ['Design the solution', 'Our technical team supports architecture, model selection, sizing, demos and proposals.'],
  ['Deliver the project', 'Partner-led, joint or supported by our team, depending on your capability.'],
  ['Support and expand', 'Ongoing support, managed services, training and additional AI applications.'],
];

const MODELS = [
  ['Referral Partner', 'Introduce qualified opportunities and earn a referral fee when they close.'],
  ['Authorised Reseller', 'Sell our private AI solutions directly and earn margin on approved products and services.'],
  ['Solution Partner', 'Combine our technology with your consulting, integration, implementation and managed services.'],
  ['Strategic Market Partner', 'Represent us in an agreed market, industry or territory and build long-term business together.'],
];

const SUPPORT = [
  'Sales and product training',
  'Technical enablement',
  'Solution-design support',
  'Customer presentations',
  'Demonstration assistance',
  'Proof-of-concept support',
  'Proposal and pricing guidance',
  'Joint customer meetings',
  'Marketing materials',
  'Implementation assistance',
  'Ongoing technical support',
  'Deal registration and protection',
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Partners', path: '/partners' }])} />

      <PageHero
        eyebrow="Partner with us"
        title={
          <>
            Bring private AI to <span className="accent">your market.</span>
          </>
        }
        lead="We partner with technology resellers, system integrators, consultants and managed service providers to deliver secure private AI to businesses across Southeast Asia."
      >
        <div className="btn-row">
          <a href={applyHref} className="btn btn-primary btn-lg">
            Apply to become a partner
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            eyebrow="Why partner with us"
            title="Private AI is a strategic priority, not a side project."
            lead="Businesses are increasingly concerned about data privacy, cybersecurity, regulatory compliance and dependence on public AI platforms. Our programme gives partners a practical way into that market."
          />
          <div className="cards cards-3">
            {WHY.map((w) => (
              <article key={w.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={w.icon} />
                </span>
                <h3 className="h3">{w.name}</h3>
                <p>{w.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow="What you can sell" title="A portfolio you can adapt to any industry." />
          <div className="cards cards-4">
            {PORTFOLIO.map((p) => (
              <article key={p.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={p.icon} />
                </span>
                <h3 className="h4">{p.name}</h3>
                <p>{p.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" eyebrow="How it works" title="Five steps, with our team beside you." />
          <ol className="steps" data-reveal>
            {STEPS.map(([name, detail], i) => (
              <li key={name}>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Partnership models"
            title="Four ways to work with us."
            lead="Structure, margin, territory, enablement and commercial terms are agreed based on your capability, market coverage and commitment."
          />
          <div className="cards cards-4">
            {MODELS.map(([name, detail]) => (
              <article key={name} className="card" data-reveal>
                <Corners />
                <h3 className="h3">{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              index="05"
              eyebrow="Partner support"
              title="You will not be selling this alone."
              lead="We partner with enterprise resellers, system integrators, managed service providers, cybersecurity firms, cloud providers, data consultancies, software vendors and industry specialists."
            />
          </div>
          <ul className="pill-grid" data-reveal>
            {SUPPORT.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Apply
          </p>
          <h2 className="h2 cta-title">Build the private AI market with us.</h2>
          <p className="lead">
            Tell us about your company, market coverage, technical capabilities and customer base. Or write to{' '}
            <a className="email-link" href={`mailto:${SITE.emails.partners}`}>
              {SITE.emails.partners}
            </a>
            .
          </p>
          <div className="btn-row btn-row--center">
            <a href={applyHref} className="btn btn-primary btn-lg">
              Apply to become a partner
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
