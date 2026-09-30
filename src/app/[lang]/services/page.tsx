import { type LangParams, localeFrom } from '@/i18n/params';
import { servicesMeta, ServicesView } from '@/views/Services';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return servicesMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <ServicesView lang={await localeFrom(params)} />;
}
