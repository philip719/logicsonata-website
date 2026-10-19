'use client';

import { useEffect, useRef } from 'react';

/**
 * Muted ambient loop over a still (the still is the poster and the fallback). The video loads only near the viewport,
 * pauses off screen, and never loads under reduced motion or Save-Data.
 */
export function BgVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = `/video/${name}.mp4`;
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [name]);

  return <video ref={ref} className="bg-video" muted loop playsInline preload="none" aria-hidden="true" />;
}
