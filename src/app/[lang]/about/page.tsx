import { type LangParams, localeFrom } from '@/i18n/params';
import { aboutMeta, AboutView } from '@/views/About';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return aboutMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <AboutView lang={await localeFrom(params)} />;
}
