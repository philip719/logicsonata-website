'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, SITE } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Logic Sonata home">
          <img src="/images/logo-horizontal.webp" alt="Logic Sonata" width={432} height={60} />
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={SITE.primaryCta.href} className="btn btn-primary btn-sm header-cta">
          Book a Consultation
        </Link>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <nav aria-label="Mobile">
          <Link href="/" className="mobile-link">
            Home
          </Link>
          {NAV.map((item, i) => (
            <Link key={item.href} href={item.href} className="mobile-link">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
          <Link href={SITE.primaryCta.href} className="btn btn-primary">
            {SITE.primaryCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
