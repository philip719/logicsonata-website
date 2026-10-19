'use client';

import { useEffect, useRef, useState } from 'react';

type Chapter = { label: string; title: string; text: string };

/**
 * Arago-style scroll story: a pre-rendered frame sequence (tools/photos/story) drawn to a canvas and scrubbed by
 * scroll position. Frames load only when the section comes near; phones get the 720 px set. Reduced motion shows
 * the poster and all chapters as plain text (cyber.css).
 */
export function ScrollStory({
  frames,
  poster,
  chapters,
  counterLabel,
}: {
  frames: number;
  poster: string;
  chapters: Chapter[];
  counterLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    if (!el || !cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const set = window.matchMedia('(max-width: 720px)').matches ? 720 : 1280;
    const imgs: HTMLImageElement[] = [];
    let current = -1;
    let raf = 0;

    const draw = (i: number) => {
      // Nearest loaded frame, so fast scrolling never shows a blank canvas.
      let k = i;
      while (k > 0 && !imgs[k]?.complete) k--;
      const img = imgs[k];
      if (!img?.complete || !img.naturalWidth) return;
      const w = cv.clientWidth * Math.min(2, devicePixelRatio);
      const h = cv.clientHeight * Math.min(2, devicePixelRatio);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
      }
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / (r.height - window.innerHeight)));
      const i = Math.round(p * (frames - 1));
      if (i !== current) {
        current = i;
        draw(i);
      }
      bar.current?.style.setProperty('--p', p.toFixed(3));
      setChapter(Math.min(chapters.length - 1, Math.floor(p * chapters.length * 0.999)));
    };
    const queue = () => (raf ||= requestAnimationFrame(update));

    const load = () => {
      for (let i = 0; i < frames; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = `/images/story/${set}/f${String(i).padStart(3, '0')}.webp`;
        img.onload = () => {
          if (i === current || (current >= 0 && Math.abs(i - current) < 2)) draw(current);
        };
        imgs[i] = img;
      }
    };
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          io.disconnect();
          load();
          queue();
        }
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      cancelAnimationFrame(raf);
    };
  }, [frames, chapters.length]);

  return (
    <section className="story" ref={root} aria-label={chapters.map((c) => c.label).join(', ')}>
      <div className="story-stage">
        <img className="story-poster" src={poster} alt="" loading="lazy" width={1280} height={720} />
        <canvas ref={canvas} aria-hidden="true" />
        <div className="container story-hud">
          <div className="story-top hud">
            <span>
              [_ <b>{chapters[chapter].label}</b> ]
            </span>
            <span className="story-progress">
              <span className="bar">
                <i ref={bar} />
              </span>
              {counterLabel} _{String(chapter + 1).padStart(3, '0')} / _{String(chapters.length).padStart(3, '0')}
            </span>
          </div>
          <div className="story-chapters">
            {chapters.map((c, i) => (
              <div key={c.title} className={`story-chapter${i === chapter ? ' on' : ''}`}>
                <p className="hud">
                  <b>{String(i + 1).padStart(2, '0')}</b> · {c.label}
                </p>
                <h2 className="h2">{c.title}</h2>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
