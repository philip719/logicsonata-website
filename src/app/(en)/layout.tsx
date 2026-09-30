import { SiteShell, siteMetadata, siteViewport } from '@/components/SiteShell';

// Root layout for the English site, served from the site root (/about, /solutions ...).
export const metadata = siteMetadata('en');
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
