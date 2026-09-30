import { CareersForm } from '@/components/CareersForm';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Rich } from '@/components/Rich';
import { Corners, PageHero, SectionHead } from '@/components/ui';
import { WithEmail } from '@/components/LeadForm';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { en } from '@/i18n/locales/en';
import { pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

// Date the roles were first published on the previous site.
const DATE_POSTED = '2026-07-30';

// Job locations for structured data, by role id.
const CITIES: Record<string, string[]> = {
  'sales-vn': ['Ho Chi Minh City', 'Hanoi'],
  'presales-vn': ['Ho Chi Minh City', 'Hanoi'],
  'sales-id': ['Jakarta'],
  'presales-id': ['Jakarta'],
};

type Role = (typeof en.careers.roles.items)[number];

// Job postings are published once, in English, so search engines do not list each role six times.
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
    jobLocation: (CITIES[r.id] ?? []).map((city) => ({
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: r.countryCode },
    })),
    directApply: true,
    url: `${SITE.url}/careers#${r.id}`,
  };
}

export function careersMeta(lang: Locale) {
  return pageMeta(lang, '/careers', getDict(lang).careers.meta);
}

export function CareersView({ lang }: { lang: Locale }) {
  const { careers: t, data } = getDict(lang);
  // Submitted position values stay in English for the inbox; labels are translated.
  const positions = t.roles.items.map((r, i) => {
    const e = en.careers.roles.items[i];
    return { id: r.id, value: `${e.title} (${e.country})`, label: `${r.title} · ${r.country}` };
  });

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/careers' }])} />
      {lang === 'en' && en.careers.roles.items.map((r) => <JsonLd key={r.id} data={jobPosting(r)} />)}

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead}>
        <div className="btn-row">
          <a href="#apply" className="btn btn-primary btn-lg">
            {t.hero.cta}
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow={t.roles.eyebrow} title={t.roles.title} />
          <div className="product-list">
            {t.roles.items.map((r) => (
              <article key={r.id} id={r.id} className="role" data-reveal>
                <div className="role-head">
                  <div>
                    <span className="mono card-code">
                      {r.country.toUpperCase()} · {t.roles.fullTime}
                    </span>
                    <h3>{r.title}</h3>
                    <p className="role-loc">{r.location}</p>
                  </div>
                  <a href={`#apply-${r.id}`} className="btn btn-ghost">
                    {t.roles.applyRole}
                  </a>
                </div>
                <p className="lead">{r.intro}</p>
                <div className="role-cols">
                  <div>
                    <h4>{t.roles.own}</h4>
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
                    <h4>{t.roles.have}</h4>
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
        <div className="container contact-grid">
          <div>
            <SectionHead eyebrow={t.apply.eyebrow} title={t.apply.title} lead={t.apply.lead} />
            <ul className="apply-notes" data-reveal>
              <li>
                <Icon name="lock" size={18} />
                <span>{t.apply.privacy}</span>
              </li>
              <li>
                <Icon name="users" size={18} />
                <span>
                  <WithEmail text={t.apply.emailAlt} email={SITE.emails.careers} />
                </span>
              </li>
            </ul>
          </div>
          <div className="panel">
            <Corners />
            <CareersForm
              lang={lang}
              t={t.apply.form}
              countries={data.markets.map((m) => m.name)}
              positions={positions}
              returnPath={lp(lang, '/careers')}
            />
          </div>
        </div>
      </section>
    </>
  );
}
