import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { type Locale, LOCALE_META } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { absoluteUrl, languageAlternates } from '@/i18n/seo';
import { inter, jetbrainsMono, spaceGrotesk } from '@/lib/fonts';
import { MARKET_NAMES_EN, MARKETS, SITE } from '@/lib/site';
import { Footer } from './Footer';
import { Header } from './Header';
import { JsonLd } from './JsonLd';
import { LangSuggest } from './LangSuggest';
import { Reveal } from './Reveal';

export function siteMetadata(lang: Locale): Metadata {
  const { common } = getDict(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: common.meta.defaultTitle, template: `%s | ${SITE.name}` },
    description: common.meta.description,
    applicationName: SITE.name,
    keywords: common.meta.keywords,
    alternates: { canonical: absoluteUrl(lang, '/'), languages: languageAlternates('/') },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: LOCALE_META[lang].ogLocale,
      url: absoluteUrl(lang, '/'),
      title: common.meta.defaultTitle,
      description: common.meta.ogDescription,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: common.meta.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: common.meta.twitterTitle,
      description: common.meta.ogDescription,
      images: ['/og.png'],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export const siteViewport: Viewport = {
  themeColor: '#0b0c11',
  colorScheme: 'dark',
};

function organization(lang: Locale) {
  const { data } = getDict(lang);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#org`,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: `${SITE.url}/images/logo-mark.png`,
        slogan: SITE.tagline,
        description: data.description,
        areaServed: MARKET_NAMES_EN.map((name) => ({ '@type': 'Country', name })),
        knowsAbout: [
          'Private AI',
          'On-premise AI infrastructure',
          'Large language models',
          'Retrieval-augmented generation',
          'AI governance',
          'AI access control',
          'Enterprise AI adoption and training',
        ],
        contactPoint: [
          { '@type': 'ContactPoint', contactType: 'sales', email: SITE.emails.sales, areaServed: MARKETS.map((m) => m.code) },
          { '@type': 'ContactPoint', contactType: 'partnerships', email: SITE.emails.partners },
          { '@type': 'ContactPoint', contactType: 'investor relations', email: SITE.emails.investors },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#site`,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: ['en', 'zh-Hans', 'id', 'ms', 'th', 'vi'],
        publisher: { '@id': `${SITE.url}/#org` },
      },
    ],
  };
}

/** The document shell shared by the English and the translated root layouts. */
export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const { common } = getDict(lang);
  return (
    <html lang={LOCALE_META[lang].htmlLang} className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Enables reveal animations only when JavaScript runs; content is always visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organization(lang)} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {common.skipLink}
        </a>
        <Header lang={lang} t={{ nav: common.nav, cta: common.cta, brandHome: common.brandHome }} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <Reveal />
        <LangSuggest lang={lang} />
      </body>
    </html>
  );
}
