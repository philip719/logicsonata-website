'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { basePath, LANG_STORAGE_KEY, LOCALE_META, lp, type Locale, matchLocale, SUGGEST } from '@/i18n/config';
import { rememberLang } from './LangSwitcher';

/**
 * On a first visit, offers the visitor's browser language when it differs from
 * the page language. Never redirects, and never asks again once a choice is made.
 */
export function LangSuggest({ lang }: { lang: Locale }) {
  const pathname = usePathname() || '/';
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(LANG_STORAGE_KEY)) return;
    } catch {
      return;
    }
    const preferred = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(matchLocale).find(Boolean);
    if (preferred && preferred !== lang) setTarget(preferred);
  }, [lang]);

  if (!target) return null;
  const s = SUGGEST[target];
  return (
    <div className="lang-suggest" role="region" aria-label={LOCALE_META[target].name} lang={LOCALE_META[target].htmlLang}>
      <div className="container lang-suggest-inner">
        <p>{s.text}</p>
        <a href={lp(target, basePath(pathname))} className="btn btn-primary btn-sm" onClick={() => rememberLang(target)}>
          {s.go}
        </a>
        <button
          type="button"
          className="lang-suggest-close"
          onClick={() => {
            rememberLang(lang);
            setTarget(null);
          }}
        >
          {s.stay}
        </button>
      </div>
    </div>
  );
}
