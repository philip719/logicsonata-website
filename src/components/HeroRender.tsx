/**
 * The homepage hero: a photoreal render of the appliance with its parts separated (tools/hero-render).
 * Desktop gets the labelled 4:3 image; phones get a tighter, label-free square crop. Both ship a 2x file.
 */
export function HeroRender({ alt }: { alt: string }) {
  return (
    <div className="hero-render">
      <picture>
        <source
          media="(max-width: 720px)"
          srcSet="/images/hero-render-mobile.webp 640w, /images/hero-render-mobile@2x.webp 1280w"
          sizes="100vw"
          width={640}
          height={640}
        />
        <img
          src="/images/hero-render.webp"
          srcSet="/images/hero-render.webp 1200w, /images/hero-render@2x.webp 2400w"
          sizes="(min-width: 1025px) 52vw, 100vw"
          alt={alt}
          width={1200}
          height={900}
          fetchPriority="high"
        />
      </picture>
    </div>
  );
}
