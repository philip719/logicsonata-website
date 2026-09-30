import Link from 'next/link';
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

export function CtaBand({
  title = 'Find out where your AI risk is.',
  lead = 'A 30-minute consultation costs you nothing. You leave with a clear view of your data exposure and a pilot that fits.',
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="cta-band" id="contact">
      <div className="container cta-inner" data-reveal>
        <div className="cta-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Eyebrow>Get started</Eyebrow>
        <h2 className="h2 cta-title">{title}</h2>
        <p className="lead">{lead}</p>
        <div className="btn-row btn-row--center">
          <Link href={SITE.primaryCta.href} className="btn btn-primary btn-lg">
            {SITE.primaryCta.label}
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
