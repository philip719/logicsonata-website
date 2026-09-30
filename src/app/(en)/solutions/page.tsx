import { solutionsMeta, SolutionsView } from '@/views/Solutions';

export const metadata = solutionsMeta('en');

export default function Page() {
  return <SolutionsView lang="en" />;
}
