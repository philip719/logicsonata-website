import { HeroVideoControl } from './HeroVideoControl';

// Rendered as raw HTML so the `muted` attribute is present in the static page:
// browsers only autoplay muted video, and React omits `muted` from server markup.
// The <picture> underneath is the art-directed placeholder (and LCP image) that
// shows until the first video frame paints; phones get a tighter square cut.
const VIDEO_HTML = `
<picture aria-hidden="true">
  <source media="(max-width: 720px)" srcset="/images/hero-spark-poster-mobile.webp" width="640" height="640">
  <img class="hero-video-poster" src="/images/hero-spark-poster.webp" alt="" width="1200" height="900" fetchpriority="high">
</picture>
<video class="hero-video" autoplay muted loop playsinline preload="auto" width="1200" height="900"
  aria-label="Animation of a compact AI supercomputer exploding into its components: gold metal chassis, metal-foam panels, vapor-chamber cooling, GB10 Grace Blackwell superchip, 128 GB unified memory, NVMe storage and ConnectX-7 networking, then reassembling.">
  <source src="/videos/hero-spark-mobile.mp4" type="video/mp4" media="(max-width: 720px)">
  <source src="/videos/hero-spark-mobile.webm" type="video/webm" media="(max-width: 720px)">
  <source src="/videos/hero-spark.mp4" type="video/mp4">
  <source src="/videos/hero-spark.webm" type="video/webm">
</video>`;

export function HeroVideo() {
  return (
    <div className="hero-video-wrap">
      <div className="hero-video-layers" dangerouslySetInnerHTML={{ __html: VIDEO_HTML }} />
      <HeroVideoControl />
    </div>
  );
}
