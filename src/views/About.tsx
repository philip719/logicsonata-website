import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Rich } from '@/components/Rich';
import { CtaBand, PageHero, SectionHead } from '@/components/ui';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

export function aboutMeta(lang: Locale) {
  return pageMeta(lang, '/about', getDict(lang).about.meta);
}

export function AboutView({ lang }: { lang: Locale }) {
  const { about: t } = getDict(lang);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/about' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: absoluteUrl(lang, '/about'),
          name: t.schemaName,
          about: { '@id': `${SITE.url}/#org` },
        }}
      />

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead} />

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead index="01" eyebrow={t.why.eyebrow} title={t.why.title} />
          </div>
          <div data-reveal>
            {t.why.paragraphs.map((para, i) => (
              <p key={i} className="lead" style={i < t.why.paragraphs.length - 1 ? { marginBottom: 20 } : undefined}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="02" eyebrow={t.control.eyebrow} title={t.control.title} />
          <ul className="pill-grid" data-reveal>
            {t.control.items.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" eyebrow={t.principles.eyebrow} title={t.principles.title} />
          <div className="cards cards-3">
            {t.principles.items.map((p) => (
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
            <SectionHead index="04" eyebrow={t.serve.eyebrow} title={t.serve.title} lead={t.serve.lead} />
          </div>
          <ul className="pill-grid" data-reveal>
            {t.serve.items.map((i) => (
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
              {t.vision.eyebrow}
            </p>
            <p className="statement">
              <Rich text={t.vision.statement} lang={lang} />
            </p>
            <p className="lead" style={{ marginTop: 24 }}>
              {t.vision.lead}
            </p>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
