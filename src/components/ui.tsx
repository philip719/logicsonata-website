import Link from 'next/link';
import { lp, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { SITE } from '@/lib/site';
import { Icon } from './Icon';

export function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <p className="eyebrow">
      {index && <span className="eyebrow-index">{index}</span>}
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  index,
  title,
  lead,
  align = 'left',
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-head section-head--${align}`} data-reveal>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container page-hero-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="h1 page-h1">{title}</h1>
        <p className="lead lead-lg">{lead}</p>
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ lang, title, lead }: { lang: Locale; title?: string; lead?: string }) {
  const { common } = getDict(lang);
  return (
    <section className="cta-band" id="contact">
      <div className="container cta-inner" data-reveal>
        <div className="cta-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Eyebrow>{common.ctaBand.eyebrow}</Eyebrow>
        <h2 className="h2 cta-title">{title ?? common.ctaBand.title}</h2>
        <p className="lead">{lead ?? common.ctaBand.lead}</p>
        <div className="btn-row btn-row--center">
          <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-lg">
            {common.cta.primary}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Corners() {
  return (
    <span className="corners" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
