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
export const MARKET_FOCUS: Partial<Record<string, string>> = { SG: '64% 50%', VN: '66% 50%', ID: '22% 50%' };

// Product architecture worlds (tools/photos/pipeline_base.py); pins are station positions as shares of width and height.
export const PIPELINE_ART: Partial<Record<string, { name: string; pins: Array<[number, number]> }>> = {
  'vision-intelligence': { name: 'pipeline-vision', pins: [[0.11, 0.26], [0.29, 0.3], [0.49, 0.26], [0.68, 0.12], [0.88, 0.04]] },
};
