import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { Corners, PageHero, SectionHead } from '@/components/ui';
import type { IconName } from '@/lib/site';
import { MARKETS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Investor Relations',
  description:
    'Investor relations at Logic Sonata: our investment thesis, business model and growth strategy for private AI in Southeast Asia, and how to contact our investor relations team.',
  alternates: { canonical: '/invest' },
  openGraph: { url: '/invest' },
};

const SNAPSHOT: Array<{ label: string; value: string; icon: IconName }> = [
  { label: 'Focus', value: 'Private AI for businesses', icon: 'shield' },
  { label: 'Markets', value: MARKETS.map((m) => m.code).join(' · '), icon: 'globe' },
  { label: 'Revenue model', value: 'Projects plus recurring managed services', icon: 'layers' },
  { label: 'Route to market', value: 'Direct sales and a partner channel', icon: 'network' },
];

const THESIS: Array<{ title: string; detail: string; icon: IconName }> = [
  {
    title: 'Data control is becoming non-negotiable',
    detail:
      'Businesses want the productivity of AI but cannot place confidential documents, source code and customer data into systems they do not control. Demand for private deployment is structural, not cyclical.',
    icon: 'lock',
  },
  {
    title: 'Private AI has become affordable',
    detail:
      'Compact AI workstations with up to 128 GB of unified memory now run capable open models on a desk. On-premise AI is within reach of mid-sized companies for the first time.',
    icon: 'chip',
  },
  {
    title: 'The mid-market needs a full-stack partner',
    detail:
      'Regional companies rarely have the in-house skills to select models, prepare data, secure access and drive adoption. One accountable partner for the whole stack is what they buy.',
    icon: 'users',
  },
  {
    title: 'Recurring revenue compounds',
    detail:
      'Every deployment moves into a managed support tier. Each additional product line deployed at an existing customer adds recurring value without new acquisition cost.',
    icon: 'rocket',
  },
  {
    title: 'Partners multiply reach',
    detail:
      'Resellers, system integrators and managed service providers extend our reach across five markets faster than a direct sales force alone.',
    icon: 'network',
  },
];

const MARKET_DRIVERS = [
  ['Data protection regulation', 'Personal data protection laws across Singapore, Malaysia, Thailand, Indonesia and Vietnam raise the cost of uncontrolled AI use.'],
  ['Shadow AI inside companies', 'Staff already use public AI tools with company data, creating risk that boards now want addressed.'],
  ['Model independence', 'Buyers want to choose and change models rather than commit to a single provider.'],
  ['Manufacturing and supply-chain base', 'Southeast Asia’s manufacturing, apparel and supplier sectors hold sensitive buyer, costing and design data.'],
  ['Governance expectations', 'Boards, auditors and customers increasingly expect a traceable record of how AI is used.'],
  ['Early market', 'Most regional businesses are at the start of AI adoption, leaving room to establish a trusted brand.'],
];

const MODEL: Array<{ title: string; detail: string; icon: IconName }> = [
  {
    title: 'Land',
    detail: 'Readiness assessments and pilots prove value on one use case and open the relationship.',
    icon: 'flask',
  },
  {
    title: 'Deploy',
    detail: 'Implementation projects cover hardware, software, knowledge preparation, integration and training.',
    icon: 'rocket',
  },
  {
    title: 'Retain',
    detail: 'Managed support tiers provide monitoring, model updates, governance reviews and ongoing improvement.',
    icon: 'support',
  },
  {
    title: 'Expand',
    detail: 'Five product lines, from knowledge assistants to vision and agents, grow value within each customer.',
    icon: 'layers',
  },
];

const GROWTH = [
  'Phased expansion across Singapore, Vietnam, Indonesia, Malaysia and Thailand',
  'Building a partner channel of resellers, integrators and managed service providers',
  'Industry packages for manufacturing, apparel, retail and supply chain',
  'Appliance automation for faster, repeatable deployments',
  'Strengthening managed services and governance tooling',
  'Selective hiring of regional sales and pre-sales leaders',
];

const ADVANTAGES = [
  'Private by design, with governance and audit built in from the start',
  'Model- and hardware-independent: no lock-in for customers',
  'A productised appliance with signed updates, backup and recovery',
  'Full-stack delivery, from hardware to adoption training',
  'Regional presence and language capability',
  'Partner programme extending reach beyond direct sales',
];

const FAQ = [
  {
    q: 'Is Logic Sonata raising capital?',
    a: 'We are not running an open fundraising process. We speak selectively with investors and strategic partners who bring value beyond capital, such as regional market access, enterprise relationships or channel networks.',
  },
  {
    q: 'Can I receive financial information or an investor briefing?',
    a: 'Detailed materials are shared personally with qualified parties under a non-disclosure agreement. Use the enquiry form below and our team will be in touch.',
  },
  {
    q: 'Do you publish financial results?',
    a: 'Logic Sonata is a private company and does not publish financial statements or forward-looking financial information on this website.',
  },
  {
    q: 'Who should I contact?',
    a: `Write to ${SITE.emails.investors} or use the enquiry form. Customer and partnership questions are handled separately by our sales and partner teams.`,
  },
];

export default function InvestPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Investor relations', path: '/invest' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      <PageHero
        eyebrow="Investor relations"
        title={
          <>
            Building Southeast Asia’s trusted <span className="accent">private AI company.</span>
          </>
        }
        lead="Information for prospective investors, strategic partners and analysts about Logic Sonata’s strategy, business model and growth plans, and how to reach our investor relations team."
      >
        <div className="btn-row">
          <a href="#enquiry" className="btn btn-primary btn-lg">
            Contact investor relations
            <Icon name="arrow" size={18} />
          </a>
          <a href="#thesis" className="btn btn-ghost btn-lg">
            Our investment thesis
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow="At a glance" title="Logic Sonata in brief." />
          <div className="cards cards-4">
            {SNAPSHOT.map((s) => (
              <article key={s.label} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={s.icon} />
                </span>
                <span className="mono card-code">{s.label.toUpperCase()}</span>
                <h3 className="h3">{s.value}</h3>
              </article>
            ))}
          </div>
          <p className="lead" style={{ marginTop: 32 }} data-reveal>
            Logic Sonata designs, deploys and manages private AI for businesses that cannot send confidential data to
            public AI services. Each solution combines hardware, software, company knowledge, access controls,
            implementation, training and ongoing support. See our{' '}
            <Link href="/solutions" className="email-link">
              product portfolio
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section section-alt" id="thesis">
        <div className="container">
          <SectionHead index="02" eyebrow="Investment thesis" title="Why private AI, why Southeast Asia, why now." />
          <div className="cards cards-3">
            {THESIS.map((t, i) => (
              <article key={t.title} className="card" data-reveal>
                <Corners />
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="card-icon">
                  <Icon name={t.icon} />
                </span>
                <h3 className="h3">{t.title}</h3>
                <p>{t.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03"
            eyebrow="Market opportunity"
            title="Structural forces behind demand."
            lead="The shift to private AI is driven by regulation, risk and the economics of new hardware, across a region with a deep manufacturing and supplier base."
          />
          <div className="cards cards-3">
            {MARKET_DRIVERS.map(([title, detail]) => (
              <article key={title} className="card" data-reveal>
                <h3 className="h4">{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Business model"
            title="Land, deploy, retain, expand."
            lead="Project revenue opens each relationship; recurring managed services and additional product lines build long-term value."
          />
          <ol className="steps steps-4" data-reveal>
            {MODEL.map((m, i) => (
              <li key={m.title}>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead index="05" eyebrow="Growth strategy" title="Where we are focused next." />
            <ul className="check-list" data-reveal>
              {GROWTH.map((g) => (
                <li key={g}>
                  <Icon name="check" size={16} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead index="06" eyebrow="Competitive position" title="What sets us apart." />
            <ul className="check-list" data-reveal>
              {ADVANTAGES.map((a) => (
                <li key={a}>
                  <Icon name="check" size={16} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container faq-wrap">
          <SectionHead index="07" eyebrow="Investor FAQ" title="Engaging with Logic Sonata." />
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

      <section className="section" id="enquiry">
        <div className="container contact-grid">
          <div>
            <SectionHead
              index="08"
              eyebrow="Contact investor relations"
              title="Start a confidential conversation."
              lead="Tell us about your organisation and your interest in Logic Sonata. We reply personally to every enquiry and share detailed materials under a non-disclosure agreement."
            />
            <p className="fine-print">
              Investor relations:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.investors}`}>
                {SITE.emails.investors}
              </a>
            </p>
          </div>
          <div className="panel">
            <Corners />
            <LeadForm variant="investor" subject="Investor relations enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
