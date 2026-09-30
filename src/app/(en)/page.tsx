import { homeMeta, HomeView } from '@/views/Home';

export const metadata = homeMeta('en');

export default function Page() {
  return <HomeView lang="en" />;
}
