'use client';

import { useEffect } from 'react';

// Exploded frame of the loop, shown as a still when motion is reduced.
const EXPLODED_AT = 4;

/** Pauses the hero video off-screen and respects reduced-motion preferences. */
export function HeroVideoControl() {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>('.hero-video');
    if (!video) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const showStill = () => {
      video.pause();
      const seek = () => {
        video.currentTime = EXPLODED_AT;
      };
      if (video.readyState >= 1) seek();
      else video.addEventListener('loadedmetadata', seek, { once: true });
    };
    const play = () => {
      if (!reduce.matches) video.play().catch(() => {});
    };

    if (reduce.matches) showStill();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else video.pause();
    });
    observer.observe(video);

    const onMotionChange = () => (reduce.matches ? showStill() : play());
    reduce.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      reduce.removeEventListener('change', onMotionChange);
    };
  }, []);

  return null;
}
