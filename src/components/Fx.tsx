'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GLYPHS = '_/\\[]{}<>#%01ABCDEFGHJKLMNPRSTUVXYZ';

/**
 * Decodes a [data-decode] headline in from random glyphs, left to right. The scramble runs on an absolutely positioned
 * overlay while the real text stays in place (transparent), so the animation never shifts the layout.
 */
function decode(el: HTMLElement) {
  const text = el.innerText;
  // Only Latin-script headlines decode; other scripts would flash foreign glyphs.
  if (!text.trim() || /[^\u0000-\u024f\u1e00-\u1eff\s]/.test(text)) return;
  const layer = document.createElement('span');
  layer.className = 'dc-layer';
  layer.setAttribute('aria-hidden', 'true');
  el.append(layer);
  el.classList.add('decoding');
  const start = performance.now();
  const dur = Math.min(1400, 400 + text.length * 18);
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    let out = '';
    [...text].forEach((ch, i) => {
      const at = i / text.length;
      out += /\s/.test(ch) || at < p - 0.12 ? ch : at < p ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : '\u2007';
    });
    layer.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
    else {
      layer.remove();
      el.classList.remove('decoding');
    }
  };
  requestAnimationFrame(tick);
}

/** Page effects: decode headlines on view, colour-fill statements on scroll. Off under reduced motion. */
export function Fx() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          decode(e.target as HTMLElement);
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>('[data-decode]').forEach((el) => io.observe(el));

    const fills = [...document.querySelectorAll<HTMLElement>('[data-fill]')].map((el) => ({
      el,
      words: [...el.querySelectorAll<HTMLElement>('.w')],
      lit: -1,
    }));
    let raf = 0;
    const onScroll = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const f of fills) {
        const r = f.el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (r.height + vh * 0.3)));
        const lit = Math.round(p * f.words.length);
        if (lit === f.lit) continue;
        f.words.forEach((w, i) => w.classList.toggle('on', i < lit));
        f.lit = lit;
      }
    };
    const queue = () => (raf ||= requestAnimationFrame(onScroll));
    if (fills.length) {
      window.addEventListener('scroll', queue, { passive: true });
      onScroll();
    }
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', queue);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
