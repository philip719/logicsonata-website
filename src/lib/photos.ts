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
// The platform is level, so every station sits at the same height on its even column.
const LEVEL_PINS: Array<[number, number]> = [[0.1, 0.18], [0.3, 0.18], [0.5, 0.18], [0.7, 0.18], [0.9, 0.18]];
export const PIPELINE_ART: Partial<Record<string, { name: string; pins: Array<[number, number]> }>> = {
  'knowledge-assistant': { name: 'pipeline-knowledge', pins: LEVEL_PINS },
  'vision-intelligence': { name: 'pipeline-vision', pins: LEVEL_PINS },
  'coding-assistant': { name: 'pipeline-coding', pins: LEVEL_PINS },
  'agent-platform': { name: 'pipeline-agents', pins: LEVEL_PINS },
  'image-studio': { name: 'pipeline-image-studio', pins: LEVEL_PINS },
};
