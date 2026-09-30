import { type LangParams, localeFrom } from '@/i18n/params';
import { careersMeta, CareersView } from '@/views/Careers';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return careersMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <CareersView lang={await localeFrom(params)} />;
}
