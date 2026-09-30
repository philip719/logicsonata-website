import Link from 'next/link';
import { MARKETS, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo-horizontal.webp" alt="Logic Sonata" width={432} height={60} loading="lazy" />
            <p className="footer-tagline">{SITE.tagline}</p>
            <p className="footer-blurb">
              Secure private AI for Southeast Asian businesses. Hardware, software, knowledge, access control,
              implementation, training and support from one accountable partner.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">Solutions</h2>
              <Link href="/solutions">Private AI products</Link>
              <Link href="/solutions#hardware">AI hardware</Link>
              <Link href="/services">Services</Link>
              <Link href="/services#support">Support tiers</Link>
            </div>
            <div>
              <h2 className="footer-h">Company</h2>
              <Link href="/about">About us</Link>
              <Link href="/partners">Partner with us</Link>
              <Link href="/invest">Investors</Link>
              <Link href="/careers">Careers</Link>
            </div>
            <div>
              <h2 className="footer-h">Markets</h2>
              {MARKETS.map((m) => (
                <span key={m.code}>{m.name}</span>
              ))}
            </div>
            <div>
              <h2 className="footer-h">Get in touch</h2>
              <Link href="/contact">Book a consultation</Link>
              <Link href="/#faq">Common questions</Link>
              <a href={`mailto:${SITE.emails.partners}`}>{SITE.emails.partners}</a>
              <a href={`mailto:${SITE.emails.investors}`}>{SITE.emails.investors}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Logic Sonata. Private AI, deployed responsibly.</span>
          <span className="mono">SG · VN · ID · MY · TH</span>
        </div>
      </div>
    </footer>
  );
}
