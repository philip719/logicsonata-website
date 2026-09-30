import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { absoluteUrl, languageAlternates } from '@/i18n/seo';
import { ROUTES } from '@/lib/routes';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Every page in every language, each listing its translations for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const abs = (href: string) => `${SITE.url}${href === '/' ? '/' : href}`;
  return ROUTES.flatMap((r) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(r.path)).map(([k, v]) => [k, abs(v)]));
    return LOCALES.map((lang) => ({
      url: absoluteUrl(lang, r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: { languages },
    }));
  });
}
