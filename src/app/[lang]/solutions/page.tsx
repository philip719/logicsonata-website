import { type LangParams, localeFrom } from '@/i18n/params';
import { solutionsMeta, SolutionsView } from '@/views/Solutions';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return solutionsMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <SolutionsView lang={await localeFrom(params)} />;
}
