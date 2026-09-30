import type { IconName } from '@/lib/site';

export const home = {
  serviceSchemaName: 'Private AI solutions',
  serviceSchemaType: 'Private AI implementation and managed services',
  serviceSchemaDescription:
    'Complete private AI solutions combining hardware, software, company knowledge, access controls, implementation, training and ongoing support, deployed on-premise, hosted or hybrid.',
  serviceCatalogName: 'Private AI products',
  hero: {
    eyebrow: 'Private AI',
    title: 'Private AI,\nbuilt inside *your walls.*',
    lead: 'Logic Sonata delivers complete private AI for businesses across Southeast Asia: the hardware, the software, your company knowledge, access controls, implementation, training and ongoing support. Your data never leaves your control.',
    secondary: 'See the full stack',
    stats: [
      { value: '100%', label: 'Data stays under your control' },
      { value: '3', label: 'Deployment models: on-premise, hosted, hybrid' },
      { value: '5', label: 'Southeast Asian markets served' },
    ],
    caption: 'Illustrative render · internal layout simplified',
    specsLabel: 'Hardware highlights',
  },
  marqueeLabel: 'Industries we serve',
  marquee: ['Manufacturing', 'Retail', 'Design', 'Suppliers', 'Regional groups', 'Apparel & textile', 'Logistics', 'Engineering', 'Professional services', 'Software teams'],
  problem: {
    eyebrow: 'The problem',
    title: 'Your team is already using AI. Do you know what it’s *exposing?*',
    lead: 'Staff paste production reports, buyer emails and costing sheets into public AI tools every day, often without a policy and without anyone knowing where that data ends up. This is not a future risk. It is happening now, in every department.',
    exposure: [
      { icon: 'eye', text: 'Buyer data and pricing pasted into public chatbots' },
      { icon: 'policy', text: 'Costing, contracts and compliance files with no audit trail' },
      { icon: 'lock', text: 'No policy, no visibility and no control over where data goes' },
    ] as Array<{ icon: IconName; text: string }>,
  },
  stack: {
    eyebrow: 'The solution',
    title: 'One partner. The complete private AI stack.',
    lead: 'Hardware and software are only half the job. We deliver every layer needed to make private AI work in a real business, and we stay accountable for all of it.',
  },
  deployment: {
    eyebrow: 'Deployment',
    title: 'The right AI environment for the right data.',
    lead: 'Every Logic Sonata product runs in any of three deployment models, with the same governance and the same control.',
    items: [
      {
        variant: 'onprem',
        name: 'On-premise private AI',
        line: 'AI that runs inside your building.',
        detail: 'For buyer data, HR records, contracts and source code that should never leave your walls.',
      },
      {
        variant: 'hosted',
        name: 'Hosted private AI',
        line: 'Private AI without buying hardware.',
        detail: 'Dedicated capacity on managed private GPU cloud. Fast pilots and lower upfront cost.',
      },
      {
        variant: 'hybrid',
        name: 'Hybrid private AI',
        line: 'The right environment for each data type.',
        detail: 'On-premise control where it matters, hosted scale where it does not.',
      },
    ] as Array<{ variant: 'onprem' | 'hosted' | 'hybrid'; name: string; line: string; detail: string }>,
  },
  products: {
    eyebrow: 'Products',
    title: 'Five private AI systems.\nOne that fits your data.',
    aside: 'Each system ships on-premise, hosted or hybrid, fully configured with your knowledge and access rules.',
    ctaTitle: 'Not sure which one fits?',
    ctaText: 'Most customers start with a Readiness Assessment. We map your data and recommend the right system.',
  },
  industries: {
    eyebrow: 'Who we serve',
    title: 'Built for businesses that cannot send their data to public AI.',
    lead: 'Our core customers are manufacturers, retailers, design companies, suppliers and regional groups. In practice, any company that wants AI without giving up its data is a fit.',
  },
  process: {
    eyebrow: 'Process',
    title: 'From first conversation to managed operations.',
  },
  markets: {
    eyebrow: 'Markets',
    title: 'Serving five markets across Southeast Asia.',
    lead: 'We work with businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand, with delivery, training and managed support across the region.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions we get asked first.',
  },
};

export type HomeDict = typeof home;
