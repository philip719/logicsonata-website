import { type Locale, LOCALES } from './config';
import { en } from './locales/en';
import { zh } from './locales/zh';
import { id } from './locales/id';
import { ms } from './locales/ms';
import { th } from './locales/th';
import { vi } from './locales/vi';

export type Dict = typeof en;

// Every language has the same shape as English (enforced by TypeScript in each
// locale's index.ts); this registry is filled in as locales are added.
const DICTS: Partial<Record<Locale, Dict>> = { en, zh, id, ms, th, vi };

export function getDict(lang: Locale): Dict {
  return DICTS[lang] ?? en;
}

// Values under these keys are identifiers, not text: they must be identical in
// every language, and arrays must keep the same length and order.
const FIXED_KEYS = new Set(['id', 'code', 'countryCode', 'icon', 'variant', 'featured', 'src', 'width', 'height', 'file', 'value']);

function compare(a: unknown, b: unknown, path: string, errors: string[]) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      errors.push(`${path}: expected ${a.length} items`);
      return;
    }
    a.forEach((v, i) => compare(v, b[i], `${path}[${i}]`, errors));
    return;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') {
      errors.push(`${path}: expected an object`);
      return;
    }
    for (const [k, v] of Object.entries(a)) {
      const other = (b as Record<string, unknown>)[k];
      if (FIXED_KEYS.has(k) && typeof v !== 'object') {
        if (other !== v) errors.push(`${path}.${k}: must stay "${String(v)}"`);
      } else compare(v, other, `${path}.${k}`, errors);
    }
    return;
  }
  if (typeof a === 'string' && a !== '' && (typeof b !== 'string' || b.trim() === '')) errors.push(`${path}: missing translation`);
}

/** Fails the build if a translation changed an identifier or dropped content. */
export function validateDicts() {
  const errors: string[] = [];
  for (const lang of LOCALES) {
    const d = DICTS[lang];
    if (d && lang !== 'en') compare(en, d, lang, errors);
  }
  if (errors.length) throw new Error(`Translation check failed:\n${errors.slice(0, 40).join('\n')}`);
}

// Runs at build time (dictionaries are only imported by server components).
validateDicts();
