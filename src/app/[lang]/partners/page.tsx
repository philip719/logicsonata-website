import { type LangParams, localeFrom } from '@/i18n/params';
import { partnersMeta, PartnersView } from '@/views/Partners';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return partnersMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <PartnersView lang={await localeFrom(params)} />;
}
