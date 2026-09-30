import Link from 'next/link';
import { DeploymentArt } from '@/components/graphics/DeploymentArt';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { fmt, Rich } from '@/components/Rich';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';
import { deployLabels } from './shared';

export function solutionsMeta(lang: Locale) {
  const { solutions: t } = getDict(lang);
  return pageMeta(lang, '/solutions', t.meta);
}

export function SolutionsView({ lang }: { lang: Locale }) {
  const { common, solutions: t, products } = getDict(lang);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/solutions' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t.listName,
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: p.name,
              description: p.summary,
              url: absoluteUrl(lang, `/solutions/${p.id}`),
              provider: { '@id': `${SITE.url}/#org` },
            },
          })),
        }}
      />

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead}>
        <div className="btn-row">
          <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
            {common.cta.primary}
            <Icon name="arrow" size={18} />
          </Link>
          <Link href="#hardware" className="btn btn-ghost btn-lg">
            {t.hero.secondary}
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow={t.products.eyebrow} title={t.products.title} />
          <div className="product-list">
            {products.map((p) => (
              <article key={p.id} id={p.id} className="product-row" data-reveal>
                <Link href={lp(lang, `/solutions/${p.id}`)} className="product-thumb" tabIndex={-1} aria-hidden="true">
                  <img src={p.visuals.ui.src} alt="" width={p.visuals.ui.width} height={p.visuals.ui.height} loading="lazy" />
                </Link>
                <div className="product-body">
                  <span className="mono card-code">{p.code}</span>
                  <h2>
                    <Link href={lp(lang, `/solutions/${p.id}`)} className="card-title-link">
                      {p.name}
                    </Link>
                  </h2>
                  <p className="product-tagline">{p.tagline}</p>
                  <p>{p.summary}</p>
                  <ul className="check-list">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={16} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="btn-row">
                    <Link href={lp(lang, `/solutions/${p.id}`)} className="btn btn-primary btn-sm">
                      {fmt(common.buttons.exploreCode, { code: p.code })}
                      <Icon name="arrow" size={15} />
                    </Link>
                    <Link href={lp(lang, `/whitepapers/${p.id}`)} className="btn btn-ghost btn-sm">
                      <Icon name="book" size={15} />
                      {common.buttons.downloadWhitepaper}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="hardware">
        <div className="container">
          <div className="hardware">
            <div className="panel panel-graphic panel-photo" data-reveal>
              <Corners />
              <img src="/images/hero-appliance-exploded.webp" width={1200} height={900} loading="lazy" alt={t.hardware.imageAlt} />
            </div>
            <div data-reveal>
              <SectionHead index="02" eyebrow={t.hardware.eyebrow} title={t.hardware.title} lead={t.hardware.lead} />
              <div className="table-scroll">
                <table className="spec-table compare-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="visually-hidden">{t.hardware.specHeader}</span>
                      </th>
                      <th scope="col">NVIDIA DGX Spark</th>
                      <th scope="col">AMD Ryzen AI Max+</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.hardware.platforms.map(([k, nvidia, amd]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td>{nvidia}</td>
                        <td>{amd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fine-print">{t.hardware.finePrint}</p>
            </div>
          </div>
          <div className="cards cards-3" style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
            {t.hardware.tiers.map((tier) => (
              <article key={tier.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={tier.icon} />
                </span>
                <h3 className="h3">{tier.name}</h3>
                <p className="card-strong">{tier.fit}</p>
                <p>{tier.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="03" eyebrow={t.deployment.eyebrow} title={t.deployment.title} lead={t.deployment.lead} />
          <div className="cards cards-3">
            {t.deployment.items.map((d) => (
              <article key={d.variant} className="card card-art" data-reveal>
                <DeploymentArt variant={d.variant} labels={deployLabels(common)} />
                <h3 className="h3">{d.name}</h3>
                <p>{d.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead index="04" eyebrow={t.extended.eyebrow} title={t.extended.title} lead={t.extended.lead} />
          <div className="cards cards-3">
            {t.extended.items.map((e) => (
              <article key={e.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={e.icon} />
                </span>
                <h3 className="h3">{e.name}</h3>
                <p>{e.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={t.ctaTitle} lead={t.ctaLead} />
    </>
  );
}
