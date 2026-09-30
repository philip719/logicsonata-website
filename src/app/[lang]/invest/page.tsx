import { type LangParams, localeFrom } from '@/i18n/params';
import { investMeta, InvestView } from '@/views/Invest';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return investMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <InvestView lang={await localeFrom(params)} />;
}
