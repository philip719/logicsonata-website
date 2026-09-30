import { careersMeta, CareersView } from '@/views/Careers';

export const metadata = careersMeta('en');

export default function Page() {
  return <CareersView lang="en" />;
}
