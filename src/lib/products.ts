import type { IconName } from './site';

// The five Logic Sonata product lines. Content lives per language in
// src/i18n/locales/<lang>/products.ts; the English file also feeds the whitepaper PDFs.

export type Feature = { title: string; detail: string; icon: IconName };
export type Step = { title: string; detail: string };
export type QA = { q: string; a: string };
export type Visual = { src: string; alt: string; caption: string; width: number; height: number };

export type Spotlight = { eyebrow: string; title: string; lead: string; items: Array<{ label: string; text: string }> };
export type FlowStage = { title: string; detail: string; icon: IconName };

export type Product = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  summary: string;
  icon: IconName;
  heroLead: string;
  highlights: string[];
  problem: { title: string; body: string };
  capabilities: Feature[];
  useCases: Feature[];
  steps: Step[];
  controls: string[];
  builtOn: string;
  visuals: { ui: Visual; photo: Visual };
  spotlight: Spotlight;
  flow: FlowStage[];
  faq: QA[];
  whitepaper: { title: string; subtitle: string; file: string; contents: string[] };
};

export const PRODUCT_IDS = ['knowledge-assistant', 'vision-intelligence', 'coding-assistant', 'agent-platform', 'image-studio'] as const;
