import { notFound } from 'next/navigation';
import { getDict } from '@/i18n/dictionaries';
import { PRODUCT_IDS } from '@/lib/products';
import { whitepaperMeta, WhitepaperView } from '@/views/Whitepapers';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PRODUCT_IDS.map((slug) => ({ slug }));
}

const product = (slug: string) => getDict('en').products.find((p) => p.id === slug);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const p = product((await params).slug);
  return p ? whitepaperMeta('en', p) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const p = product((await params).slug);
  if (!p) notFound();
  return <WhitepaperView lang="en" product={p} />;
}
