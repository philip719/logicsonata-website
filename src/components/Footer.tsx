import Link from 'next/link';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { MARKETS, SITE } from '@/lib/site';

export function Footer({ lang }: { lang: Locale }) {
  const { common, data } = getDict(lang);
  const f = common.footer;
  const L = (path: string) => lp(lang, path);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo-horizontal.webp" alt="Logic Sonata" width={432} height={60} loading="lazy" />
            <p className="footer-tagline">{SITE.tagline}</p>
            <p className="footer-blurb">{f.blurb}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h2 className="footer-h">{f.solutions}</h2>
              <Link href={L('/solutions')}>{f.allProducts}</Link>
              <Link href={L('/solutions/knowledge-assistant')}>{f.knowledgeAssistant}</Link>
              <Link href={L('/solutions/vision-intelligence')}>{f.visionIntelligence}</Link>
              <Link href={L('/solutions/coding-assistant')}>{f.codingAssistant}</Link>
              <Link href={L('/solutions/agent-platform')}>{f.aiAgents}</Link>
              <Link href={L('/solutions/image-studio')}>{f.imageStudio}</Link>
              <Link href={L('/solutions#hardware')}>{f.aiHardware}</Link>
              <Link href={L('/services')}>{f.services}</Link>
              <Link href={L('/services#support')}>{f.supportTiers}</Link>
            </div>
            <div>
              <h2 className="footer-h">{f.company}</h2>
              <Link href={L('/about')}>{f.aboutUs}</Link>
              <Link href={L('/partners')}>{f.partnerWithUs}</Link>
              <Link href={L('/invest')}>{f.investors}</Link>
              <Link href={L('/careers')}>{f.careers}</Link>
            </div>
            <div>
              <h2 className="footer-h">{f.markets}</h2>
              {MARKETS.map((m, i) => (
                <span key={m.code}>{data.markets[i].name}</span>
              ))}
            </div>
            <div>
              <h2 className="footer-h">{f.getInTouch}</h2>
              <Link href={L('/contact')}>{f.bookConsultation}</Link>
              <Link href={L('/whitepapers')}>{f.whitepapers}</Link>
              <a href={`mailto:${SITE.emails.sales}`}>{SITE.emails.sales}</a>
              <a href={`mailto:${SITE.emails.partners}`}>{SITE.emails.partners}</a>
              <a href={`mailto:${SITE.emails.investors}`}>{SITE.emails.investors}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {f.rights}
          </span>
          <span className="mono">SG · VN · ID · MY · TH</span>
        </div>
      </div>
    </footer>
  );
}
