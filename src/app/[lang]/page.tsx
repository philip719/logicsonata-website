import { type LangParams, localeFrom } from '@/i18n/params';
import { homeMeta, HomeView } from '@/views/Home';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return homeMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <HomeView lang={await localeFrom(params)} />;
}
