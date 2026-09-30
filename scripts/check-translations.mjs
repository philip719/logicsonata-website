// Usage: node scripts/check-translations.mjs <lang>   (cn, id, my, th or vn)
// Compiles the English and <lang> dictionaries and verifies the translation:
// same shape, identical identifiers, preserved markup, no dashes, no leftovers.
import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const lang = process.argv[2];
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '..');
if (!lang) throw new Error('Usage: node scripts/check-translations.mjs <lang>');
const locDir = path.join(root, 'src/i18n/locales', lang);
const files = readdirSync(path.join(root, 'src/i18n/locales/en')).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
const missing = files.filter((f) => !existsSync(path.join(locDir, f)));
if (missing.length) console.log('MISSING FILES:', missing.join(', '));

const out = path.join(root, 'node_modules/.cache', `i18n-check-${lang}`);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const present = files.filter((f) => existsSync(path.join(locDir, f)));
const inputs = [...files.map((f) => `src/i18n/locales/en/${f}`), ...present.map((f) => `src/i18n/locales/${lang}/${f}`)];
try {
  execSync(`npx tsc ${inputs.join(' ')} --outDir ${out} --rootDir src --module commonjs --target es2020 --skipLibCheck --noResolve --isolatedModules false`, { cwd: root, stdio: 'pipe' });
} catch {
  /* type errors about '@/' imports are expected here; the full type check is separate */
}
const require = createRequire(import.meta.url);
const FIXED = new Set(['id', 'code', 'countryCode', 'icon', 'variant', 'featured', 'src', 'width', 'height', 'file', 'value']);
const errors = [];
const tokens = (s) => ({
  accent: (s.match(/\*[^*]+\*/g) || []).length,
  links: (s.match(/\]\(([^)]+)\)/g) || []).sort().join(' '),
  breaks: (s.match(/\n/g) || []).length,
  vars: (s.match(/\{\w+\}/g) || []).sort().join(' '),
});
function cmp(a, b, p) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return errors.push(`${p}: expected an array`);
    if (a.length !== b.length) return errors.push(`${p}: expected ${a.length} items, got ${b.length}`);
    return a.forEach((v, i) => cmp(v, b[i], `${p}[${i}]`));
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return errors.push(`${p}: expected an object`);
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`${p}.${k}: unexpected key`);
    for (const [k, v] of Object.entries(a)) {
      if (!(k in b)) { errors.push(`${p}.${k}: missing key`); continue; }
      if (FIXED.has(k) && typeof v !== 'object') { if (b[k] !== v) errors.push(`${p}.${k}: must stay ${JSON.stringify(v)}, got ${JSON.stringify(b[k])}`); }
      else cmp(v, b[k], `${p}.${k}`);
    }
    return;
  }
  if (typeof a === 'string') {
    if (typeof b !== 'string') return errors.push(`${p}: expected a string`);
    if (a !== '' && b.trim() === '') return errors.push(`${p}: empty translation`);
    const ta = tokens(a), tb = tokens(b);
    if (lang !== 'en' && p.endsWith('.englishOnly') || p.endsWith('landing.language')) { /* free text */ }
    else if (p.endsWith('landing.audience')) { if (!/\{name(Lower)?\}/.test(b)) errors.push(`${p}: must contain {name} or {nameLower}`); }
    else for (const k of Object.keys(ta)) if (ta[k] !== tb[k]) errors.push(`${p}: markup "${k}" differs (en: ${JSON.stringify(ta[k])}, ${lang}: ${JSON.stringify(tb[k])})`);
    if (/[—–]|——/.test(b)) errors.push(`${p}: contains a dash (— or –); rewrite with a comma, colon or full stop`);
    if (lang !== 'en' && a.length > 25 && a === b && !/^[A-Z0-9 .,:+()/·-]+$/.test(a)) errors.push(`${p}: identical to English, looks untranslated`);
  }
}
for (const f of present) {
  const mod = f.replace('.ts', '.js');
  const en = require(path.join(out, 'i18n/locales/en', mod));
  const tr = require(path.join(out, 'i18n/locales', lang, mod));
  const name = Object.keys(en)[0];
  if (!(name in tr)) { errors.push(`${f}: must export "${name}"`); continue; }
  cmp(en[name], tr[name], `${f}:${name}`);
}
rmSync(out, { recursive: true, force: true });
if (errors.length) {
  console.log(`${errors.length} problem(s):`);
  for (const e of errors.slice(0, Number(process.env.LIMIT || 80))) console.log(' - ' + e);
  process.exit(1);
}
console.log(`OK: ${present.length}/${files.length} files pass for "${lang}".`);
