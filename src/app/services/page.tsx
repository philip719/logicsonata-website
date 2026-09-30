import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, CtaBand, PageHero, SectionHead } from '@/components/ui';
import type { IconName } from '@/lib/site';
import { PROCESS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Private AI Services, Training and Managed Support',
  description:
    'AI readiness assessments, pilot implementation, knowledge base preparation, AI governance, staff training and managed private AI support for businesses in Southeast Asia.',
  alternates: { canonical: '/services' },
  openGraph: { url: '/services' },
};

const SERVICES: Array<{ name: string; detail: string; icon: IconName }> = [
  {
    name: 'AI Privacy & Readiness Assessment',
    detail: 'Map your AI risk, find your best private use cases and leave with a 30/60/90-day roadmap. The easiest first step.',
    icon: 'search',
  },
  {
    name: 'Private AI Pilot Implementation',
    detail: 'One working use case, deployed and proven with real users, before you commit to a full rollout.',
    icon: 'flask',
  },
  {
    name: 'Data Preparation & Knowledge Base',
    detail: 'Messy files become a clean, permissioned and tested private knowledge base. This is where most AI projects fail, and where we do not.',
    icon: 'database',
  },
  {
    name: 'AI Governance & Policy',
    detail: 'Usage policy, approved tools list and role-based access rules, so your team can use AI safely from day one.',
    icon: 'policy',
  },
  {
    name: 'AI Training & Adoption',
    detail: 'Role-based workshops for managers, HR, sales, operations and finance. Hardware does not create adoption. Training does.',
    icon: 'users',
  },
  {
    name: 'Managed Private AI Support',
    detail: 'Monitoring, model updates, knowledge base refreshes and quarterly reviews that keep every deployment healthy.',
    icon: 'support',
  },
];

const TIERS = [
  { name: 'Basic', users: '10 to 30 users', price: '$1k to 3k', detail: 'Monthly health checks, minor prompt tuning and knowledge base refresh. Next-business-day response.' },
  { name: 'Business', users: '30 to 150 users', price: '$3k to 8k', detail: 'Priority support, weekly checks and a quarterly business review. Same-business-day response.' },
  { name: 'Enterprise', users: '150+ users', price: '$8k to 20k', detail: 'Dedicated support manager, security patch coordination and governance reporting. 4 to 8 hour urgent response.', featured: true },
  { name: 'Premium', users: 'Mission-critical', price: '$20k+', detail: 'Dedicated technical lead, custom SLA, on-site option and a monthly steering committee.' },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Services', path: '/services' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: 'Managed private AI support tiers',
          itemListElement: TIERS.map((t) => ({
            '@type': 'Offer',
            name: `${t.name} support`,
            description: `${t.users}. ${t.detail}`,
            seller: { '@id': `${SITE.url}/#org` },
          })),
        }}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Hardware and software are <span className="accent">half the job.</span>
          </>
        }
        lead="Most companies do not know how to choose models, clean their documents, train staff or govern AI use. That is exactly what we do, from the first assessment to long-term managed support."
      >
        <div className="btn-row">
          <Link href={SITE.primaryCta.href} className="btn btn-primary btn-lg">
            Start with an assessment
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow="What we deliver" title="Six services. One accountable partner." />
          <div className="cards cards-3">
            {SERVICES.map((s, i) => (
              <article key={s.name} className="card" data-reveal>
                <Corners />
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="card-icon">
                  <Icon name={s.icon} />
                </span>
                <h2 className="h3">{s.name}</h2>
                <p>{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="support">
        <div className="container">
          <SectionHead
            index="02"
            eyebrow="Managed support"
            title="Long-term reliability, not one-off help desks."
            lead="Every deployment renews into one of four managed support tiers. Prices are monthly, in US dollars."
          />
          <div className="cards cards-4 tier-grid">
            {TIERS.map((t) => (
              <article key={t.name} className={`card${t.featured ? ' card-featured' : ''}`} data-reveal>
                {t.featured && <span className="tier-badge">MOST COMMON</span>}
                <h3 className="h3">{t.name}</h3>
                <span className="tier-users">{t.users}</span>
                <span className="tier-price">
                  {t.price}
                  <span>/mo</span>
                </span>
                <p>{t.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <SectionHead index="03" eyebrow="Process" title="From first conversation to managed operations." align="center" />
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

      <CtaBand />
    </>
  );
}
