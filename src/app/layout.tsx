import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { inter, jetbrainsMono, spaceGrotesk } from '@/lib/fonts';
import { MARKETS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Private AI Solutions for Southeast Asian Businesses | Logic Sonata',
    template: '%s | Logic Sonata',
  },
  description: SITE.metaDescription,
  applicationName: SITE.name,
  keywords: [
    'private AI',
    'on-premise AI',
    'enterprise AI Southeast Asia',
    'private LLM',
    'secure AI for business',
    'DGX Spark',
    'AI Singapore',
    'AI Vietnam',
    'AI Indonesia',
    'AI Malaysia',
    'AI Thailand',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_SG',
    url: '/',
    title: 'Private AI Solutions for Southeast Asian Businesses | Logic Sonata',
    description: 'Private AI deployed on-premise, hosted or hybrid. Your confidential data never reaches a public model.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Logic Sonata private AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private AI Solutions | Logic Sonata',
    description: 'Private AI deployed on-premise, hosted or hybrid. Your confidential data never reaches a public model.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export const viewport: Viewport = {
  themeColor: '#0b0c11',
  colorScheme: 'dark',
};

const organization = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#org`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/images/logo-mark.png`,
      slogan: SITE.tagline,
      description: SITE.description,
      areaServed: MARKETS.map((m) => ({ '@type': 'Country', name: m.name })),
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
        { '@type': 'ContactPoint', contactType: 'partnerships', email: SITE.emails.partners },
        { '@type': 'ContactPoint', contactType: 'investor relations', email: SITE.emails.investors },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#site`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Enables reveal animations only when JavaScript runs; content is always visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organization} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
