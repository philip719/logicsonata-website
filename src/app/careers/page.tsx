import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Careers: Sales and Pre-Sales Roles in Private AI',
  description:
    'Join Logic Sonata as a Sales Manager or Pre-Sales Manager in Vietnam or Indonesia and help businesses adopt private AI on their own terms.',
  alternates: { canonical: '/careers' },
  openGraph: { url: '/careers' },
};

// Date the roles were first published on the previous site.
const DATE_POSTED = '2026-07-30';

type Role = {
  id: string;
  country: string;
  countryCode: string;
  title: string;
  location: string;
  cities: string[];
  intro: string;
  own: string[];
  have: string[];
};

const ROLES: Role[] = [
  {
    id: 'sales-vn',
    country: 'Vietnam',
    countryCode: 'VN',
    title: 'Sales Manager, Private AI',
    location: 'Ho Chi Minh City or Hanoi',
    cities: ['Ho Chi Minh City', 'Hanoi'],
    intro:
      'We are building a new private AI business in Vietnam and want a salesperson who wants to create a market, not inherit one: opening doors, building executive relationships, winning pilots and turning them into long-term customers.',
    own: [
      'Prospecting and closing enterprise customers across Vietnam',
      'Discovery meetings, POCs, pilot projects and negotiations',
      'Partnerships with system integrators, hardware vendors and consultants',
      'Pipeline discipline, forecasting and account strategy',
    ],
    have: [
      '5+ years of B2B technology sales or business development',
      'A track record of winning new enterprise customers',
      'Fluent Vietnamese and strong professional English',
      'Existing enterprise relationships in Vietnam',
    ],
  },
  {
    id: 'presales-vn',
    country: 'Vietnam',
    countryCode: 'VN',
    title: 'Pre-Sales Manager, Private AI',
    location: 'Ho Chi Minh City or Hanoi',
    cities: ['Ho Chi Minh City', 'Hanoi'],
    intro:
      'A technically strong, commercially minded Pre-Sales Manager who turns customer problems into practical AI solutions: leading demonstrations, designing secure private AI architectures and scoping pilots.',
    own: [
      'Customer discovery and technical solution design',
      'Demonstrations, executive workshops and technical presentations',
      'Proof-of-concept and pilot scoping with engineers and IT teams',
      'Technical proposals, architecture diagrams and RFP responses',
    ],
    have: [
      'Experience with LLMs, RAG, vector databases or AI agents',
      'Ability to explain complex AI concepts in plain business language',
      'Comfort presenting to CIOs, CTOs and IT Directors',
      'Fluent Vietnamese and strong professional English',
    ],
  },
  {
    id: 'sales-id',
    country: 'Indonesia',
    countryCode: 'ID',
    title: 'Sales Manager, Private AI',
    location: 'Jakarta',
    cities: ['Jakarta'],
    intro:
      'An ambitious technology salesperson who wants to create a market, not manage an existing territory: introducing Indonesian companies to privately deployed AI and converting pilots into long-term customers.',
    own: [
      'Development of the Indonesia market from prospecting to contract close',
      'Relationships with CEOs, CIOs, CTOs and Operations Directors',
      'Demonstrations, workshops, POCs and paid pilot projects',
      'Strategic partnerships with system integrators and hardware vendors',
    ],
    have: [
      'A track record in enterprise software, cybersecurity, cloud or AI sales',
      'Experience in manufacturing, garment, retail or logistics is a plus',
      'Strong prospecting, negotiation and closing skills',
      'Existing enterprise relationships in Indonesia',
    ],
  },
  {
    id: 'presales-id',
    country: 'Indonesia',
    countryCode: 'ID',
    title: 'Pre-Sales Manager, Private AI',
    location: 'Jakarta',
    cities: ['Jakarta'],
    intro:
      'A technically credible, commercially minded Pre-Sales Manager who turns complex customer problems into practical, secure AI solutions, from architecture design to pilot delivery.',
    own: [
      'Technical and solution-design stages of the Indonesia sales process',
      'Designing on-premise, private-cloud and hybrid AI architectures',
      'Tailored demos, executive workshops and technical presentations',
      'RFP responses, security questionnaires and technical due diligence',
    ],
    have: [
      'Experience with LLMs, RAG, AI agents or enterprise search',
      'Confidence presenting to CIOs, CTOs and digital transformation leaders',
      'Ability to translate business needs into technical solution designs',
      'Fluent Bahasa Indonesia and strong professional English',
    ],
  },
];

function jobPosting(r: Role) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: r.title,
    description: `<p>${r.intro}</p><p><strong>You will own:</strong></p><ul>${r.own.map((o) => `<li>${o}</li>`).join('')}</ul><p><strong>You should have:</strong></p><ul>${r.have.map((h) => `<li>${h}</li>`).join('')}</ul>`,
    datePosted: DATE_POSTED,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE.name,
      sameAs: SITE.url,
      logo: `${SITE.url}/images/logo-mark.png`,
    },
    jobLocation: r.cities.map((city) => ({
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: r.countryCode },
    })),
    directApply: true,
    url: `${SITE.url}/careers#${r.id}`,
  };
}

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Careers', path: '/careers' }])} />
      {ROLES.map((r) => (
        <JsonLd key={r.id} data={jobPosting(r)} />
      ))}

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Help businesses adopt AI <span className="accent">on their own terms.</span>
          </>
        }
        lead="We are opening our Vietnam and Indonesia markets and hiring two Sales Managers and two Pre-Sales Managers to lead the charge."
      >
        <div className="btn-row">
          <a href="#apply" className="btn btn-primary btn-lg">
            Apply now
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow="Open roles" title="Four roles. Two markets." />
          <div className="product-list">
            {ROLES.map((r) => (
              <article key={r.id} id={r.id} className="role" data-reveal>
                <div className="role-head">
                  <div>
                    <span className="mono card-code">
                      {r.country.toUpperCase()} · FULL-TIME
                    </span>
                    <h3>{r.title}</h3>
                    <p className="role-loc">{r.location}</p>
                  </div>
                  <a href="#apply" className="btn btn-ghost">
                    Apply for this role
                  </a>
                </div>
                <p className="lead">{r.intro}</p>
                <div className="role-cols">
                  <div>
                    <h4>You will own</h4>
                    <ul className="check-list">
                      {r.own.map((o) => (
                        <li key={o}>
                          <Icon name="check" size={16} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>You should have</h4>
                    <ul className="check-list">
                      {r.have.map((h) => (
                        <li key={h}>
                          <Icon name="check" size={16} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="apply">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead
            eyebrow="Apply now"
            title="Submit your CV."
            lead="Tell us a little about yourself and attach your CV. We review every application personally."
            align="center"
          />
          <iframe
            src={SITE.careersFormUrl}
            className="embed-frame"
            title="Logic Sonata job application form"
            loading="lazy"
          >
            Loading application form…
          </iframe>
        </div>
      </section>
    </>
  );
}
