import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container page-hero-inner">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="h1 page-h1">
          This page is <span className="accent">off the grid.</span>
        </h1>
        <p className="lead lead-lg">The page you are looking for has moved or no longer exists.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary btn-lg">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
