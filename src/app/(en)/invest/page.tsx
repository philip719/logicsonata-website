import { investMeta, InvestView } from '@/views/Invest';

export const metadata = investMeta('en');

export default function Page() {
  return <InvestView lang="en" />;
}
