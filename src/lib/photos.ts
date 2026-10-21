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
  'knowledge-assistant': { name: 'pipeline-knowledge', pins: [[0.095, 0.4], [0.29, 0.3], [0.495, 0.18], [0.7, 0.08], [0.89, 0.06]] },
  'vision-intelligence': { name: 'pipeline-vision', pins: [[0.11, 0.26], [0.29, 0.3], [0.49, 0.26], [0.68, 0.12], [0.88, 0.04]] },
  'coding-assistant': { name: 'pipeline-coding', pins: [[0.09, 0.4], [0.295, 0.3], [0.49, 0.22], [0.7, 0.12], [0.89, 0.06]] },
  'agent-platform': { name: 'pipeline-agents', pins: [[0.12, 0.34], [0.295, 0.3], [0.49, 0.2], [0.7, 0.12], [0.905, 0.06]] },
  'image-studio': { name: 'pipeline-image-studio', pins: [[0.09, 0.48], [0.275, 0.36], [0.49, 0.26], [0.695, 0.15], [0.905, 0.06]] },
};
