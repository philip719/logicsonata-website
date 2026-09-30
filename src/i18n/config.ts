// Supported languages. English lives at the site root (/about); every other
// language lives under its own prefix (/zh/about, /th/about ...).

export const LOCALES = ['en', 'zh', 'id', 'ms', 'th', 'vi'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export const LOCALE_META: Record<Locale, { name: string; short: string; htmlLang: string; hreflang: string; ogLocale: string }> = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_SG' },
  zh: { name: '简体中文', short: '中文', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', ogLocale: 'zh_CN' },
  id: { name: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id', hreflang: 'id', ogLocale: 'id_ID' },
  ms: { name: 'Bahasa Melayu', short: 'MS', htmlLang: 'ms', hreflang: 'ms', ogLocale: 'ms_MY' },
  th: { name: 'ไทย', short: 'ไทย', htmlLang: 'th', hreflang: 'th', ogLocale: 'th_TH' },
  vi: { name: 'Tiếng Việt', short: 'VI', htmlLang: 'vi', hreflang: 'vi', ogLocale: 'vi_VN' },
};

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

/** Localised path: lp('zh', '/about') → '/zh/about'; lp('en', '/about') → '/about'. Hashes are kept. */
export function lp(lang: Locale, path: string): string {
  if (!path.startsWith('/')) return path;
  if (lang === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${lang}`;
  if (path.startsWith('/#')) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Strips a language prefix: '/zh/about' → '/about', '/zh' → '/'. */
export function basePath(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) return `/${rest.join('/')}`.replace(/\/$/, '') || '/';
  return pathname || '/';
}

/** Maps a browser language tag (navigator.languages) to a supported locale. */
export function matchLocale(tag: string): Locale | null {
  const t = tag.toLowerCase();
  if (t.startsWith('zh')) return 'zh';
  if (t.startsWith('id') || t.startsWith('in')) return 'id';
  if (t.startsWith('ms')) return 'ms';
  if (t.startsWith('th')) return 'th';
  if (t.startsWith('vi')) return 'vi';
  if (t.startsWith('en')) return 'en';
  return null;
}

// Shown in the suggested language itself, so visitors can read the offer.
export const SUGGEST: Record<Locale, { text: string; go: string; stay: string }> = {
  en: { text: 'This page is also available in English.', go: 'View in English', stay: 'Dismiss' },
  zh: { text: '本页面提供简体中文版本。', go: '查看中文版', stay: '关闭' },
  id: { text: 'Halaman ini tersedia dalam Bahasa Indonesia.', go: 'Lihat dalam Bahasa Indonesia', stay: 'Tutup' },
  ms: { text: 'Halaman ini tersedia dalam Bahasa Melayu.', go: 'Lihat dalam Bahasa Melayu', stay: 'Tutup' },
  th: { text: 'หน้านี้มีให้บริการเป็นภาษาไทย', go: 'ดูเป็นภาษาไทย', stay: 'ปิด' },
  vi: { text: 'Trang này có phiên bản tiếng Việt.', go: 'Xem bằng tiếng Việt', stay: 'Đóng' },
};

export const LANG_STORAGE_KEY = 'ls_lang';
