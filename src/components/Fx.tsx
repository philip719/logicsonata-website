'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GLYPHS = '_/\\[]{}<>#%01ABCDEFGHJKLMNPRSTUVXYZ';

/** Decodes the text of a [data-decode] element in from random glyphs, left to right. */
function decode(el: HTMLElement) {
  const nodes: Array<{ node: Text; text: string }> = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    nodes.push({ node, text: node.data });
  }
  const total = nodes.reduce((n, x) => n + x.text.length, 0);
  // Only Latin-script headlines decode; other scripts would flash foreign glyphs.
  if (!total || /[^\u0000-ɏḀ-ỿ\s]/.test(nodes.map((n) => n.text).join(''))) return;
  el.style.minHeight = `${el.offsetHeight}px`;
  const start = performance.now();
  const dur = Math.min(1400, 400 + total * 18);
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    let i = 0;
    for (const { node, text } of nodes) {
      let out = '';
      for (const ch of text) {
        const at = i++ / total;
        out += ch === ' ' || ch === '\n' || at < p - 0.12 ? ch : at < p ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : ' ';
      }
      node.data = out;
    }
    if (p < 1) requestAnimationFrame(tick);
    else {
      nodes.forEach(({ node, text }) => (node.data = text));
      el.style.minHeight = '';
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
