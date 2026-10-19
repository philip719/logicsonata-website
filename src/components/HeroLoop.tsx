'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero animation: the appliance explodes into its parts and reassembles in a loop (tools/photos/hero_loop.py).
 * It plays over the still (same camera), which stays the first paint and the fallback under reduced motion or
 * Save-Data. Part labels show only while the parts are apart.
 */
const OPEN_UNTIL = 1.5;
const OPEN_FROM = 7.97;

export function HeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const box = v?.parentElement;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || !box || window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return;
    let raf = 0;
    const tick = () => {
      const t = v.currentTime;
      box.dataset.phase = t < OPEN_UNTIL || t > OPEN_FROM ? 'open' : 'closed';
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      v.src = v.canPlayType('video/webm; codecs="vp9"') ? '/video/hero-loop.webm' : '/video/hero-loop.mp4';
      v.addEventListener('playing', () => v.classList.add('on'), { once: true });
      v.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    };
    // Start after the page has painted so the still stays the LCP image.
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('load', start);
    };
  }, []);

  return <video ref={ref} className="hero-loop" muted loop playsInline preload="none" aria-hidden="true" />;
}
