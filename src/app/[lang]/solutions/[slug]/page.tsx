import { notFound } from 'next/navigation';
import { getDict } from '@/i18n/dictionaries';
import { type LangParams, localeFrom } from '@/i18n/params';
import { PRODUCT_IDS } from '@/lib/products';
import { productMeta, ProductView } from '@/views/Product';

type Params = LangParams & { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return PRODUCT_IDS.map((slug) => ({ slug }));
}

async function resolve(params: Promise<Params>) {
  const lang = await localeFrom(params);
  const { slug } = await params;
  const p = getDict(lang).products.find((x) => x.id === slug);
  return { lang, p };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { lang, p } = await resolve(params);
  return p ? productMeta(lang, p) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { lang, p } = await resolve(params);
  if (!p) notFound();
  return <ProductView lang={lang} product={p} />;
}
