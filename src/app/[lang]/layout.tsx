import { SiteShell, siteMetadata, siteViewport } from '@/components/SiteShell';
import { PREFIXED_LOCALES } from '@/i18n/config';
import { type LangParams, localeFrom } from '@/i18n/params';

// Root layout for the translated sites (/zh, /id, /ms, /th, /vi).
export const dynamicParams = false;
export const viewport = siteViewport;

export function generateStaticParams(): LangParams[] {
  return PREFIXED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return siteMetadata(await localeFrom(params));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<LangParams> }) {
  return <SiteShell lang={await localeFrom(params)}>{children}</SiteShell>;
}
