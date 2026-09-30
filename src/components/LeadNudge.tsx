'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { lp, type Locale } from '@/i18n/config';
import type { Product } from '@/lib/products';
import { Icon } from './Icon';
import { hasLead } from './LeadForm';

const DISMISS_KEY = 'ls_nudge_dismissed_at';
const QUIET_DAYS = 14;

function recentlyDismissed() {
  try {
    const at = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    return Date.now() - at < QUIET_DAYS * 864e5;
  } catch {
    return false;
  }
}

/**
 * A single, polite whitepaper offer on product pages: appears once the visitor
 * has read past the middle of the page, never for known leads, and stays away
 * for two weeks after being dismissed.
 */
type NudgeText = { free: string; label: string; dismiss: string; cta: string; note: string };

export function LeadNudge({ product, lang, t }: { product: Product; lang: Locale; t: NudgeText }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasLead() || recentlyDismissed() || sessionStorage.getItem(DISMISS_KEY)) return;
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (depth > 0.55) {
        setShow(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    setShow(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  if (!show) return null;
  return (
    <aside className="lead-nudge" role="complementary" aria-label={t.label}>
      <button type="button" className="lead-nudge-close" onClick={dismiss} aria-label={t.dismiss}>
        ×
      </button>
      <span className="mono lead-nudge-tag">{t.free}</span>
      <strong>{product.whitepaper.title}</strong>
      <p>{product.whitepaper.subtitle}.</p>
      {t.note && <p className="lead-nudge-note">{t.note}</p>}
      <Link href={lp(lang, `/whitepapers/${product.id}`)} className="btn btn-primary btn-sm" onClick={dismiss}>
        <Icon name="book" size={15} />
        {t.cta}
      </Link>
    </aside>
  );
}
