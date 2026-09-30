import type { Metadata } from 'next';
import './globals.css';
import { Eyebrow } from '@/components/ui';
import { LOCALE_META, LOCALES, lp } from '@/i18n/config';
import { inter, jetbrainsMono, spaceGrotesk } from '@/lib/fonts';

// Served for any unknown URL (404.html). The site has one root layout per
// language, so this page renders its own document and offers every language.
export const metadata: Metadata = {
  title: 'Page not found | Logic Sonata',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <main id="main">
          <section className="page-hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="container page-hero-inner">
              <a href="/" className="brand" aria-label="Logic Sonata home">
                <img src="/images/logo-horizontal.webp" alt="Logic Sonata" width={432} height={60} style={{ height: 30, width: 'auto', marginBottom: 48 }} />
              </a>
              <Eyebrow>Error 404</Eyebrow>
              <h1 className="h1 page-h1">
                This page is <span className="accent">off the grid.</span>
              </h1>
              <p className="lead lead-lg">The page you are looking for has moved or no longer exists.</p>
              <div className="btn-row">
                <a href="/" className="btn btn-primary btn-lg">
                  Back to home
                </a>
                <a href="/contact" className="btn btn-ghost btn-lg">
                  Book a consultation
                </a>
              </div>
              <ul className="notfound-langs">
                {LOCALES.map((l) => (
                  <li key={l}>
                    <a href={lp(l, '/')} hrefLang={LOCALE_META[l].hreflang} lang={LOCALE_META[l].htmlLang}>
                      {LOCALE_META[l].name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
