import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { fmt, Rich } from '@/components/Rich';
import { Corners, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { pageMeta } from '@/i18n/seo';
import { SITE } from '@/lib/site';

export function servicesMeta(lang: Locale) {
  return pageMeta(lang, '/services', getDict(lang).services.meta);
}

export function ServicesView({ lang }: { lang: Locale }) {
  const { data, services: t } = getDict(lang);

  return (
    <>
      <JsonLd data={breadcrumbs(lang, [{ name: t.breadcrumb, path: '/services' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: t.catalogName,
          itemListElement: t.support.tiers.map((tier) => ({
            '@type': 'Offer',
            name: fmt(t.offerName, { name: tier.name }),
            description: `${tier.users}. ${tier.detail}`,
            seller: { '@id': `${SITE.url}/#org` },
          })),
        }}
      />

      <PageHero eyebrow={t.hero.eyebrow} title={<Rich text={t.hero.title} lang={lang} />} lead={t.hero.lead}>
        <div className="btn-row">
          <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
            {t.hero.cta}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow={t.deliver.eyebrow} title={t.deliver.title} />
          <div className="cards cards-3">
            {t.deliver.items.map((s, i) => (
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
          <SectionHead index="02" eyebrow={t.support.eyebrow} title={t.support.title} lead={t.support.lead} />
          <div className="cards cards-4 tier-grid">
            {t.support.tiers.map((tier) => (
              <article key={tier.name} className={`card${tier.featured ? ' card-featured' : ''}`} data-reveal>
                {tier.featured && <span className="tier-badge">{t.support.badge}</span>}
                <h3 className="h3">{tier.name}</h3>
                <span className="tier-users">{tier.users}</span>
                <span className="tier-response">
                  <span className="mono">{t.support.response}</span>
                  {tier.response}
                </span>
                <p>{tier.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <SectionHead index="03" eyebrow={t.process.eyebrow} title={t.process.title} align="center" />
          <ol className="process" data-reveal>
            {data.process.map((p, i) => (
              <li key={p.step}>
                <span className="process-node mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h4">{p.step}</h3>
                <p>{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
