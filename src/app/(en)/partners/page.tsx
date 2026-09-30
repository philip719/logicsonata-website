import { partnersMeta, PartnersView } from '@/views/Partners';

export const metadata = partnersMeta('en');

export default function Page() {
  return <PartnersView lang="en" />;
}
