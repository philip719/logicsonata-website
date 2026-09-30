import { whitepapersMeta, WhitepapersView } from '@/views/Whitepapers';

export const metadata = whitepapersMeta('en');

export default function Page() {
  return <WhitepapersView lang="en" />;
}
