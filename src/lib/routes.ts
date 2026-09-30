import { PRODUCTS } from './products';

type Route = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' };

// Every public page, used for the sitemap and llms.txt. Keep in sync with src/app.
export const ROUTES: Route[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
  ...PRODUCTS.map((p) => ({ path: `/solutions/${p.id}`, priority: 0.9, changeFrequency: 'monthly' as const })),
  { path: '/whitepapers', priority: 0.7, changeFrequency: 'monthly' },
  ...PRODUCTS.map((p) => ({ path: `/whitepapers/${p.id}`, priority: 0.6, changeFrequency: 'monthly' as const })),
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/partners', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/invest', priority: 0.5, changeFrequency: 'monthly' },
];
