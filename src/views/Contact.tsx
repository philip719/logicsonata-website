import { ConsultationForm } from '@/components/ConsultationForm';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Rich } from '@/components/Rich';
import { Corners, Eyebrow } from '@/components/ui';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { en } from '@/i18n/locales/en';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

export function contactMeta(lang: Locale) {
  return pageMeta(lang, '/contact', getDict(lang).contact.meta);
}

export function ContactView({ lang }: { lang: Locale }) {
  const { common, data, contact: t, products } = getDict(lang);
  // Option values stay in English for the inbox; labels are translated.
  const productOptions = products.map((p, i) => ({ value: en.products[i].name, label: p.name }));

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/contact' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: absoluteUrl(lang, '/contact'),
          name: t.meta.title,
          about: { '@id': `${SITE.url}/#org` },
        }}
      />
      <section className="page-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container page-hero-inner contact-grid">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="h1 page-h1">
              <Rich text={t.title} lang={lang} />
            </h1>
            <p className="lead">{t.lead}</p>
            <ol className="next-steps">
              {t.next.map((n, i) => (
                <li key={n.title}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="h4">{n.title}</h2>
                    <p>{n.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="fine-print">
              {t.sales}:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.sales}`}>
                {SITE.emails.sales}
              </a>
              <br />
              {t.partnerships}:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.partners}`}>
                {SITE.emails.partners}
              </a>
              <br />
              {t.investors}:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.investors}`}>
                {SITE.emails.investors}
              </a>
            </p>
          </div>
          <div className="panel">
            <Corners />
            <ConsultationForm
              lang={lang}
              t={common.forms}
              submitLabel={common.cta.primary}
              countries={data.markets.map((m) => m.name)}
              products={productOptions}
            />
          </div>
        </div>
      </section>
    </>
  );
}
