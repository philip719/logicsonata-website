import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { fmt, Rich } from '@/components/Rich';
import { Corners, CtaBand, Eyebrow, PageHero } from '@/components/ui';
import { whitepaperCover } from '@/components/WhitepaperTeaser';
import { lp, LOCALE_META, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { en } from '@/i18n/locales/en';
import { pageMeta } from '@/i18n/seo';
import type { Product } from '@/lib/products';
import { SITE } from '@/lib/site';

export function whitepapersMeta(lang: Locale) {
  return pageMeta(lang, '/whitepapers', getDict(lang).whitepapers.index.meta);
}

export function WhitepapersView({ lang }: { lang: Locale }) {
  const { common, whitepapers, products } = getDict(lang);
  const t = whitepapers.index;
  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/whitepapers' }])} />
      <PageHero eyebrow={t.eyebrow} title={<Rich text={t.title} lang={lang} />} lead={t.lead} />
      <section className="section">
        <div className="container">
          {whitepapers.landing.language && (
            <p className="fine-print" style={{ marginBottom: 24 }}>
              {whitepapers.landing.language}
            </p>
          )}
          <div className="wp-grid">
            {products.map((p) => (
              <article key={p.id} className="wp-card" data-reveal>
                <Link href={lp(lang, `/whitepapers/${p.id}`)} className="wp-card-cover" tabIndex={-1} aria-hidden="true">
                  <img src={whitepaperCover(p)} alt="" width={600} height={849} loading="lazy" />
                </Link>
                <span className="mono card-code">{p.code}</span>
                <h2 className="h3">
                  <Link href={lp(lang, `/whitepapers/${p.id}`)} className="card-title-link">
                    {p.whitepaper.title}
                  </Link>
                </h2>
                <p>{p.whitepaper.subtitle}.</p>
                <Link href={lp(lang, `/whitepapers/${p.id}`)} className="btn btn-ghost btn-sm">
                  <Icon name="book" size={15} />
                  {common.buttons.download}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

export function whitepaperMeta(lang: Locale, p: Product) {
  const t = getDict(lang).whitepapers.landing;
  const path = `/whitepapers/${p.id}`;
  return pageMeta(lang, path, {
    title: fmt(t.metaTitle, { title: p.whitepaper.title }),
    description: fmt(t.metaDescription, { subtitle: p.whitepaper.subtitle, contents: p.whitepaper.contents.join(', ') }),
    image: { url: whitepaperCover(p), width: 600, height: 849 },
  });
}

export function WhitepaperView({ lang, product: p }: { lang: Locale; product: Product }) {
  const { common, data, whitepapers } = getDict(lang);
  const t = whitepapers.landing;
  const enProduct = en.products.find((e) => e.id === p.id) ?? p;
  const tag = lang === 'en' ? '' : ` [${lang.toUpperCase()}]`;

  return (
    <>
      <JsonLd
        data={breadcrumbs(lang, [
          { name: whitepapers.index.breadcrumb, path: '/whitepapers' },
          { name: p.whitepaper.title, path: `/whitepapers/${p.id}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Report',
          name: `${enProduct.whitepaper.title}: ${enProduct.whitepaper.subtitle}`,
          about: enProduct.name,
          publisher: { '@id': `${SITE.url}/#org` },
          image: `${SITE.url}${whitepaperCover(p)}`,
          isAccessibleForFree: true,
          inLanguage: 'en',
        }}
      />
      <section className="page-hero wp-landing">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container wp-landing-grid">
          <div className="wp-landing-info">
            <nav className="crumbs mono" aria-label="Breadcrumb">
              <Link href={lp(lang, '/whitepapers')}>{whitepapers.index.breadcrumb}</Link> / <span>{p.code}</span>
            </nav>
            <Eyebrow>{fmt(t.eyebrow, { code: p.code })}</Eyebrow>
            <h1 className="h1 page-h1">{p.whitepaper.title}</h1>
            <p className="product-hero-tagline">{p.whitepaper.subtitle}.</p>
            <div className="wp-landing-cover">
              <img src={whitepaperCover(p)} alt={fmt(t.coverAlt, { title: p.whitepaper.title })} width={600} height={849} fetchPriority="high" />
              <div>
                <h2 className="h4">{t.inside}</h2>
                <ul className="check-list">
                  {p.whitepaper.contents.map((c) => (
                    <li key={c}>
                      <Icon name="check" size={16} />
                      {c}
                    </li>
                  ))}
                  <li>
                    <Icon name="check" size={16} />
                    {t.checklist}
                  </li>
                </ul>
                <p className="fine-print" style={{ marginTop: 16 }}>
                  {fmt(t.audience, { name: p.name, nameLower: p.name.toLowerCase() })}
                </p>
                {t.language && (
                  <p className="fine-print" lang={LOCALE_META[lang].htmlLang}>
                    {t.language}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="panel wp-landing-form">
            <Corners />
            <h2 className="h3">{t.formTitle}</h2>
            <p className="form-intro">{t.formIntro}</p>
            <LeadForm
              variant="whitepaper"
              subject={`Whitepaper download: ${enProduct.whitepaper.title}${tag}`}
              asset={enProduct.whitepaper.title}
              assetLabel={p.whitepaper.title}
              downloadUrl={p.whitepaper.file}
              lang={lang}
              t={common.forms}
              countries={data.markets.map((m) => m.name)}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container wp-landing-more">
          <p className="lead">
            <Rich text={fmt(t.more, { code: p.code, name: p.name, id: p.id })} lang={lang} />
          </p>
        </div>
      </section>
    </>
  );
}
