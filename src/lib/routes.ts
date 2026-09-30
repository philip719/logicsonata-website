// Every public page, used for the sitemap. Keep in sync with src/app.
export const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/partners', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/invest', priority: 0.6, changeFrequency: 'monthly' },
] as const;
