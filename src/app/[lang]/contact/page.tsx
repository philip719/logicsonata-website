import { type LangParams, localeFrom } from '@/i18n/params';
import { contactMeta, ContactView } from '@/views/Contact';

export async function generateMetadata({ params }: { params: Promise<LangParams> }) {
  return contactMeta(await localeFrom(params));
}

export default async function Page({ params }: { params: Promise<LangParams> }) {
  return <ContactView lang={await localeFrom(params)} />;
}
