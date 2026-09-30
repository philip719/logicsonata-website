import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { Rich } from '@/components/Rich';
import { Corners, PageHero, SectionHead } from '@/components/ui';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

export function investMeta(lang: Locale) {
  return pageMeta(lang, '/invest', getDict(lang).invest.meta);
}

export function InvestView({ lang }: { lang: Locale }) {
  const { common, data, invest: t } = getDict(lang);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/invest' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead}>
        <div className="btn-row">
          <a href="#enquiry" className="btn btn-primary btn-lg">
            {t.hero.primary}
            <Icon name="arrow" size={18} />
          </a>
          <a href="#thesis" className="btn btn-ghost btn-lg">
            {t.hero.secondary}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow={t.snapshot.eyebrow} title={t.snapshot.title} />
          <div className="cards cards-4">
            {t.snapshot.items.map((s) => (
              <article key={s.label} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={s.icon} />
                </span>
                <span className="mono card-code">{s.label.toUpperCase()}</span>
                <h3 className="h3">{s.text}</h3>
              </article>
            ))}
          </div>
          <p className="lead" style={{ marginTop: 32 }} data-reveal>
            <Rich text={t.snapshot.body} lang={lang} />
          </p>
        </div>
      </section>

      <section className="section section-alt" id="thesis">
        <div className="container">
          <SectionHead index="02" eyebrow={t.thesis.eyebrow} title={t.thesis.title} />
          <div className="cards cards-3">
            {t.thesis.items.map((item, i) => (
              <article key={item.title} className="card" data-reveal>
                <Corners />
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="card-icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" eyebrow={t.market.eyebrow} title={t.market.title} lead={t.market.lead} />
          <div className="cards cards-3">
            {t.market.items.map((m) => (
              <article key={m.title} className="card" data-reveal>
                <h3 className="h4">{m.title}</h3>
                <p>{m.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="04" eyebrow={t.model.eyebrow} title={t.model.title} lead={t.model.lead} />
          <ol className="steps steps-4" data-reveal>
            {t.model.items.map((m, i) => (
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
            <SectionHead index="05" eyebrow={t.growth.eyebrow} title={t.growth.title} />
            <ul className="check-list" data-reveal>
              {t.growth.items.map((g) => (
                <li key={g}>
                  <Icon name="check" size={16} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead index="06" eyebrow={t.advantages.eyebrow} title={t.advantages.title} />
            <ul className="check-list" data-reveal>
              {t.advantages.items.map((a) => (
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
          <SectionHead index="07" eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="faq" data-reveal>
            {t.faq.items.map((f, i) => (
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
            <SectionHead index="08" eyebrow={t.enquiry.eyebrow} title={t.enquiry.title} lead={t.enquiry.lead} />
            <p className="fine-print">
              {t.enquiry.email}:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.investors}`}>
                {SITE.emails.investors}
              </a>
            </p>
          </div>
          <div className="panel">
            <Corners />
            <LeadForm
              variant="investor"
              subject={`Investor relations enquiry${lang === 'en' ? '' : ` [${lang.toUpperCase()}]`}`}
              lang={lang}
              t={common.forms}
              countries={data.markets.map((m) => m.name)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
