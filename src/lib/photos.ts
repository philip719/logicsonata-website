// Generated photography per product and market (tools/photos/manifest.json). Names map to /images/photos/<name>-<w>.webp.
const PRODUCT_SLUGS: Record<string, string> = {
  'knowledge-assistant': 'product-knowledge',
  'vision-intelligence': 'product-vision',
  'coding-assistant': 'product-coding',
  'agent-platform': 'product-agents',
  'image-studio': 'product-image-studio',
};

export const productPhoto = (id: string, kind: 'wide' | 'close') => `${PRODUCT_SLUGS[id]}-${kind}`;

export const MARKET_PHOTOS: Record<string, string> = {
  SG: 'city-singapore',
  VN: 'city-ho-chi-minh',
  ID: 'city-jakarta',
  MY: 'city-kuala-lumpur',
  TH: 'city-bangkok',
};

// Focal points for the 3:4 market cards (default: centre).
export const MARKET_FOCUS: Partial<Record<string, string>> = { SG: '64% 50%' };
