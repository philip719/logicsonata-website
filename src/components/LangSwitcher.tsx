'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { basePath, LANG_STORAGE_KEY, LOCALE_META, LOCALES, lp, type Locale } from '@/i18n/config';
import { Icon } from './Icon';

export function rememberLang(lang: Locale) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable: nothing to remember */
  }
}

/** Header language menu. Links go to the same page in the other language. */
export function LangSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() || '/';
  const base = basePath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-switch" ref={ref}>
      <button
        type="button"
        className="lang-switch-btn"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={`${label}: ${LOCALE_META[lang].name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" size={16} />
        <span>{LOCALE_META[lang].short}</span>
      </button>
      <ul id="lang-menu" className="lang-menu" data-open={open}>
        {LOCALES.map((l) => (
          <li key={l}>
            <a
              href={lp(l, base)}
              hrefLang={LOCALE_META[l].hreflang}
              lang={LOCALE_META[l].htmlLang}
              aria-current={l === lang ? 'true' : undefined}
              onClick={() => rememberLang(l)}
            >
              {LOCALE_META[l].name}
              {l === lang && <Icon name="check" size={14} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
