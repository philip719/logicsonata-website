import { notFound } from 'next/navigation';
import { DEFAULT_LOCALE, isLocale, type Locale } from './config';

export type LangParams = { lang: string };

/** Resolves the [lang] route segment; English is served from the root, never from /en. */
export async function localeFrom(params: Promise<LangParams>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) notFound();
  return lang;
}
