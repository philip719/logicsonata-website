import type { Metadata } from 'next';
import { ConsultationForm } from '@/components/ConsultationForm';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, Eyebrow } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Private AI Consultation',
  description:
    'Book a free 30-minute private AI consultation with Logic Sonata. Discuss your requirements, data exposure and a suitable pilot for your business.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

const NEXT = [
  ['We review your request', 'A specialist reads your goals and prepares for the call. You hear from us within one business day.'],
  ['30-minute consultation', 'We discuss your requirements, current AI use, data sensitivity and the systems you already run.'],
  ['A recommended pilot', 'You receive a suggested use case, deployment model and hardware sizing, with no obligation.'],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Contact', path: '/contact' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE.url}/contact`,
          name: 'Book a Private AI Consultation',
          about: { '@id': `${SITE.url}/#org` },
        }}
      />
      <section className="page-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container page-hero-inner contact-grid">
          <div>
            <Eyebrow>Private AI consultation</Eyebrow>
            <h1 className="h1 page-h1">
              Let’s talk about <span className="accent">your data.</span>
            </h1>
            <p className="lead">
              Tell us about your business and what you want AI to do. We will map your requirements and recommend a
              pilot that proves value quickly, without your data leaving your control.
            </p>
            <ol className="next-steps">
              {NEXT.map(([title, detail], i) => (
                <li key={title}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="h4">{title}</h2>
                    <p>{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="fine-print">
              Partnerships:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.partners}`}>
                {SITE.emails.partners}
              </a>
              <br />
              Investors:{' '}
              <a className="email-link" href={`mailto:${SITE.emails.investors}`}>
                {SITE.emails.investors}
              </a>
            </p>
          </div>
          <div className="panel">
            <Corners />
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
