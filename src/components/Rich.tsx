import Link from 'next/link';
import { Fragment } from 'react';
import { lp, type Locale } from '@/i18n/config';

// Minimal markup for translatable strings, so sentences stay whole for translators:
//   *accent*        → red accent span
//   [label](/path)  → localised internal link (or mailto:/https: link)
//   \n              → line break
const TOKEN = /(\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\n)/g;

export function Rich({ text, lang }: { text: string; lang: Locale }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part === '\n') return <br key={i} />;
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <span key={i} className="accent">
              {part.slice(1, -1)}
            </span>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, target] = link;
          if (target.startsWith('/') || target.startsWith('#')) {
            return (
              <Link key={i} href={lp(lang, target)} className="email-link">
                {label}
              </Link>
            );
          }
          return (
            <a key={i} href={target} className="email-link">
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Plain-text version of a Rich string, for metadata and structured data. */
export const plain = (text: string) => text.replace(/\*([^*]+)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\n/g, ' ');

/** Fills {placeholders}: fmt('Explore {code}', { code: 'PAI-KB' }). */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
