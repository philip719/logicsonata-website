import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Rich } from '@/components/Rich';
import { Corners, PageHero, SectionHead } from '@/components/ui';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

// The application subject stays in English so partner requests read the same in the inbox.
const applyHref = (lang: Locale) =>
  `mailto:${SITE.emails.partners}?subject=${encodeURIComponent(`Reseller Partner Application${lang === 'en' ? '' : ` [${lang.toUpperCase()}]`}`)}`;

export function partnersMeta(lang: Locale) {
  return pageMeta(lang, '/partners', getDict(lang).partners.meta);
}

export function PartnersView({ lang }: { lang: Locale }) {
  const { partners: t } = getDict(lang);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/partners' }])} />

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead}>
        <div className="btn-row">
          <a href={applyHref(lang)} className="btn btn-primary btn-lg">
            {t.apply}
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />
          <div className="cards cards-3">
            {t.why.items.map((w) => (
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
          <SectionHead index="02" eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} />
          <div className="cards cards-4">
            {t.portfolio.items.map((p) => (
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
          <SectionHead index="03" eyebrow={t.steps.eyebrow} title={t.steps.title} />
          <ol className="steps" data-reveal>
            {t.steps.items.map((s, i) => (
              <li key={s.name}>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.name}</h3>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="04" eyebrow={t.models.eyebrow} title={t.models.title} lead={t.models.lead} />
          <div className="cards cards-4">
            {t.models.items.map((m) => (
              <article key={m.name} className="card" data-reveal>
                <Corners />
                <h3 className="h3">{m.name}</h3>
                <p>{m.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead index="05" eyebrow={t.support.eyebrow} title={t.support.title} lead={t.support.lead} />
          </div>
          <ul className="pill-grid" data-reveal>
            {t.support.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {t.closing.eyebrow}
          </p>
          <h2 className="h2 cta-title">{t.closing.title}</h2>
          <p className="lead">
            <Rich text={t.closing.lead} lang={lang} />
          </p>
          <div className="btn-row btn-row--center">
            <a href={applyHref(lang)} className="btn btn-primary btn-lg">
              {t.apply}
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
