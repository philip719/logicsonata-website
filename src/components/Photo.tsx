/** A graded photo from tools/photos, served as WebP at 768, 1536 and 3072 pixels wide. */
export function Photo({
  name,
  alt = '',
  sizes = '100vw',
  priority = false,
  className,
  position,
}: {
  name: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position, for crops that need a focal point other than the centre. */
  position?: string;
}) {
  const src = (w: number) => `/images/photos/${name}-${w}.webp`;
  return (
    <img
      className={className}
      style={position ? { objectPosition: position } : undefined}
      src={src(1536)}
      srcSet={`${src(768)} 768w, ${src(1536)} 1536w, ${src(3072)} 3072w`}
      sizes={sizes}
      alt={alt}
      width={1536}
      height={864}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
