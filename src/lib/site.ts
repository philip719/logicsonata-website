export const SITE = {
  name: 'Logic Sonata',
  url: 'https://www.logicsonata.com',
  tagline: 'Intelligence. Harmony. Impact.',
  // Existing Formspree form, so consultation requests keep landing in the same inbox.
  formEndpoint: 'https://formspree.io/f/mlgqveyn',
  // Job applications post here; the PHP script on Hostinger emails them to emails.careers.
  careersEndpoint: '/api/apply.php',
  emails: {
    sales: 'sales@logicsonata.com',
    partners: 'partner@logicsonata.com',
    investors: 'investment@logicsonata.com',
    careers: 'careers@logicsonata.com',
  },
  primaryCtaHref: '/contact',
} as const;

// Language-independent market data; names and cities are translated in the dictionaries.
export const MARKETS = [
  { code: 'SG', lon: 103.82, lat: 1.35 },
  { code: 'VN', lon: 106.7, lat: 10.8 },
  { code: 'ID', lon: 106.85, lat: -6.2 },
  { code: 'MY', lon: 101.69, lat: 3.14 },
  { code: 'TH', lon: 100.5, lat: 13.75 },
] as const;

// English market names, used for structured data (schema.org expects English country names).
export const MARKET_NAMES_EN = ['Singapore', 'Vietnam', 'Indonesia', 'Malaysia', 'Thailand'];

export const NAV = [
  { key: 'solutions', href: '/solutions' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'partners', href: '/partners' },
  { key: 'investors', href: '/invest' },
  { key: 'careers', href: '/careers' },
] as const;

export type IconName =
  | 'book'
  | 'grid'
  | 'code'
  | 'agent'
  | 'image'
  | 'shield'
  | 'chip'
  | 'cloud'
  | 'building'
  | 'hybrid'
  | 'database'
  | 'key'
  | 'rocket'
  | 'users'
  | 'support'
  | 'search'
  | 'flask'
  | 'layers'
  | 'policy'
  | 'factory'
  | 'store'
  | 'pen'
  | 'truck'
  | 'network'
  | 'globe'
  | 'lock'
  | 'eye'
  | 'wave'
  | 'translate'
  | 'check'
  | 'arrow';
