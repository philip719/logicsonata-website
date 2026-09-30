import { aboutMeta, AboutView } from '@/views/About';

export const metadata = aboutMeta('en');

export default function Page() {
  return <AboutView lang="en" />;
}
