'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { lp, type Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { NAV, SITE } from '@/lib/site';
import { LangSwitcher } from './LangSwitcher';

type HeaderText = { nav: CommonDict['nav']; cta: CommonDict['cta']; brandHome: string };

export function Header({ lang, t }: { lang: Locale; t: HeaderText }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={lp(lang, '/')} className="brand" aria-label={t.brandHome}>
          <img src="/images/logo-horizontal.webp" alt="Logic Sonata" width={432} height={60} />
        </Link>
        <nav className="nav" aria-label={t.nav.main}>
          {NAV.map((item) => {
            const href = lp(lang, item.href);
            return (
              <Link key={item.href} href={href} className="nav-link" aria-current={pathname === href ? 'page' : undefined}>
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>
        <LangSwitcher lang={lang} label={t.nav.language} />
        <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary btn-sm header-cta">
          {t.cta.header}
        </Link>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <nav aria-label={t.nav.mobile}>
          <Link href={lp(lang, '/')} className="mobile-link">
            {t.nav.home}
          </Link>
          {NAV.map((item, i) => (
            <Link key={item.href} href={lp(lang, item.href)} className="mobile-link">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {t.nav[item.key]}
            </Link>
          ))}
          <Link href={lp(lang, SITE.primaryCtaHref)} className="btn btn-primary">
            {t.cta.primary}
          </Link>
        </nav>
      </div>
    </header>
  );
}
