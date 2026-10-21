'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero animation: the appliance separates into its parts while the camera orbits it, then reassembles
 * (tools/hero-orbit/orbit.py). It plays over the still of its first frame, which stays the first paint and the
 * fallback under reduced motion or Save-Data. The part labels follow the parts frame by frame, using the
 * positions exported with the render, and show only while the parts are fully apart.
 */
type Track = { fps: number; frames: number; open: [number, number]; track: number[][][] };

// Fade the labels in after the parts settle and out before they start to close.
const SETTLE = 4;

export function HeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const box = v?.parentElement;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || !box || window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return;
    const labels = Array.from(box.querySelectorAll<HTMLElement>('.xh-label'));
    let data: Track | null = null;
    let w = box.clientWidth;
    let h = box.clientHeight;
    let last = -1;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      w = box.clientWidth;
      h = box.clientHeight;
      last = -1;
    });
    ro.observe(box);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!data) return;
      const f = Math.floor(v.currentTime * data.fps) % data.frames;
      if (f === last) return;
      last = f;
      const pts = data.track[f];
      labels.forEach((el, i) => {
        if (pts[i]) el.style.transform = `translate(${(pts[i][0] * w).toFixed(1)}px, ${(pts[i][1] * h).toFixed(1)}px)`;
      });
      const phase = f >= data.open[0] + SETTLE && f <= data.open[1] - SETTLE ? 'open' : 'closed';
      // Write only on a change: an attribute write every frame forces a style recalculation.
      if (box.dataset.phase !== phase) box.dataset.phase = phase;
    };
    const start = () => {
      fetch('/video/hero-orbit.json')
        .then((r) => r.json())
        .then((d: Track) => (data = d))
        .catch(() => {});
      v.src = v.canPlayType('video/webm; codecs="vp9"') ? '/video/hero-orbit.webm' : '/video/hero-orbit.mp4';
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
      ro.disconnect();
      window.removeEventListener('load', start);
    };
  }, []);

  return <video ref={ref} className="hero-loop" muted loop playsInline preload="none" aria-hidden="true" />;
}
