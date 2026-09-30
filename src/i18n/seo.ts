import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { DEFAULT_LOCALE, type Locale, LOCALE_META, LOCALES, lp } from './config';
import { getDict } from './dictionaries';

/** hreflang map for a page: every language plus x-default (English). */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[LOCALE_META[l].hreflang] = lp(l, path);
  map['x-default'] = lp(DEFAULT_LOCALE, path);
  return map;
}

export const absoluteUrl = (lang: Locale, path: string) => {
  const p = lp(lang, path);
  return `${SITE.url}${p === '/' ? '/' : p}`;
};

/** Page metadata with canonical, hreflang alternates and a complete Open Graph block. */
export function pageMeta(
  lang: Locale,
  path: string,
  opts: { title?: string; absoluteTitle?: string; description: string; ogTitle?: string; image?: { url: string; width: number; height: number; alt?: string } },
): Metadata {
  const { common } = getDict(lang);
  const url = lp(lang, path);
  const title = opts.absoluteTitle ?? (opts.title ? `${opts.title} | ${SITE.name}` : common.meta.defaultTitle);
  const image = opts.image ?? { url: '/og.png', width: 1200, height: 630, alt: common.meta.ogImageAlt };
  return {
    title: opts.absoluteTitle ? { absolute: opts.absoluteTitle } : opts.title,
    description: opts.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: LOCALE_META[lang].ogLocale,
      url,
      title: opts.ogTitle ?? title,
      description: opts.description,
      images: [image],
    },
  };
}
