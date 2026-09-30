import { type LangParams, localeFrom } from '@/i18n/params';
import { whitepapersMeta, WhitepapersView } from '@/views/Whitepapers';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return whitepapersMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <WhitepapersView lang={await localeFrom(params)} />;
}
