import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/ui';
import type { IconName } from '@/lib/site';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Invest in Trusted Private AI Infrastructure',
  description:
    'Logic Sonata is building a full private AI portfolio for Southeast Asian businesses. Strategic investors and partners can start a confidential conversation.',
  alternates: { canonical: '/invest' },
  openGraph: { url: '/invest' },
};

const contactHref = `mailto:${SITE.emails.investors}?subject=${encodeURIComponent('Investor Introduction')}`;

const DRIVERS = [
  ['Data sovereignty', 'Businesses want the benefits of AI without sending data outside their control.'],
  ['Security requirements', 'Regulated and security-conscious industries need controlled infrastructure by default.'],
  ['Model flexibility', 'Buyers want to choose and change models, not commit to a single provider.'],
  ['Governance and auditability', 'Boards and regulators increasingly expect a full audit trail on AI use.'],
  ['Industry-specific deployment', 'Manufacturing, professional services and regional groups need AI shaped to their workflows.'],
  ['Regional demand', 'Businesses across Southeast Asia are only beginning this shift.'],
];

const PORTFOLIO: Array<{ name: string; detail: string; icon: IconName }> = [
  { name: 'Knowledge Assistant', detail: 'Secure internal question answering across company documents.', icon: 'book' },
  { name: 'AI Agents', detail: 'Workflow automation inside the customer’s own environment.', icon: 'agent' },
  { name: 'Code Assistant', detail: 'Repo-aware pair programming without exposing source code.', icon: 'code' },
  { name: 'Vision AI', detail: 'Visual inspection and document processing for industry workflows.', icon: 'eye' },
  { name: 'Translation and Voice', detail: 'Multilingual translation, transcription and internal voice assistants.', icon: 'translate' },
  { name: 'AI Infrastructure', detail: 'Servers, GPU workstations, private cloud, access control and administration.', icon: 'chip' },
];

const POSITION = [
  'Private by design, not privacy added afterwards',
  'Model independent: no lock-in to one AI provider',
  'Deployment flexibility: on-premise, hosted or hybrid',
  'Built to integrate with systems customers already run',
  'Models, infrastructure, data and process in one solution',
  'Governance and auditability built in from the start',
  'Regional presence and language capability',
  'A partner network extending reach beyond direct sales',
];

const QUESTIONS = [
  'Where is our data actually stored?',
  'Which model is processing it?',
  'Can we change that model later?',
  'Who inside our company can access it?',
  'Can it run entirely inside our own infrastructure?',
  'How do we govern and audit its use?',
];

const FOCUS = [
  'Expansion across Southeast Asia',
  'Deepening the partner network',
  'Broadening the product portfolio',
  'Strengthening managed services',
  'Industry-specific solution packages',
  'Deployment automation and tooling',
  'Governance and compliance frameworks',
];

export default function InvestPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Invest', path: '/invest' }])} />

      <PageHero
        eyebrow="Investors"
        title={
          <>
            Building the infrastructure for <span className="accent">trusted AI.</span>
          </>
        }
        lead="AI is becoming part of every business function. Yet many companies still cannot use it, not because the technology is not ready, but because they cannot put confidential data into systems they do not control. Logic Sonata exists to close that gap."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            eyebrow="Why now"
            title="Private AI is becoming part of the business stack."
            lead="This is a structural shift, not a trend, and it favours companies built around control from day one."
          />
          <div className="cards cards-3">
            {DRIVERS.map(([name, detail]) => (
              <article key={name} className="card" data-reveal>
                <h3 className="h3">{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow="What we are building" title="A full private AI portfolio, not a single product." />
          <div className="cards cards-3">
            {PORTFOLIO.map((p) => (
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

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              index="03"
              eyebrow="Market approach"
              title="Priority sectors, then a partner-led path to scale."
              lead="We focus on manufacturing, apparel and textiles, design, professional services, software teams and regional business groups: sectors where the cost of a data leak is high and the willingness to pay for control is real. Growth compounds through resellers, integrators and managed service providers."
            />
          </div>
          <div data-reveal>
            <h3 className="h4" style={{ marginBottom: 16 }}>
              Competitive position
            </h3>
            <ul className="check-list">
              {POSITION.map((p) => (
                <li key={p}>
                  <Icon name="check" size={16} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Business model"
            title="Project revenue funding a recurring services base."
          />
          <div className="cards cards-2">
            <article className="card" data-reveal>
              <h3 className="h3">Project revenue</h3>
              <p>
                Assessments, pilot implementations, data preparation, infrastructure setup and integration: the entry
                point for every new customer relationship.
              </p>
            </article>
            <article className="card" data-reveal>
              <h3 className="h3">Recurring revenue</h3>
              <p>
                Managed support tiers, model updates, monitoring and governance reviews: the base that compounds as the
                customer roster grows.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="05" eyebrow="Why Logic Sonata" title="We answer the questions businesses are already asking." />
          <ul className="q-list" data-reveal>
            {QUESTIONS.map((q, i) => (
              <li key={q}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <SectionHead
              index="06"
              eyebrow="Strategic investment"
              title="We are selective about who we bring in."
              lead="Logic Sonata is not running an open fundraising process. From time to time we speak with a small number of patient, strategic partners whose value goes beyond capital: technology experience, regional market access, customer relationships, channel networks or a credible path to international expansion."
            />
          </div>
          <div data-reveal>
            <h3 className="h4" style={{ marginBottom: 16 }}>
              Where we are focused next
            </h3>
            <ul className="pill-grid">
              {FOCUS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Connect
          </p>
          <h2 className="h2 cta-title">Start a confidential conversation.</h2>
          <p className="lead">
            Write to us with a short introduction to your background and what you would bring to the table. We reply
            personally to every message.
          </p>
          <div className="btn-row btn-row--center">
            <a href={contactHref} className="btn btn-primary btn-lg">
              Contact {SITE.emails.investors}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
