import type { IconName } from '@/lib/site';

type Item = { name: string; detail: string; icon: IconName };

export const partners = {
  meta: {
    title: 'Partner Programme for Private AI Resellers',
    description:
      'Resellers, system integrators, consultants and managed service providers: add secure private AI to your portfolio with Logic Sonata across Southeast Asia.',
  },
  breadcrumb: 'Partners',
  apply: 'Apply to become a partner',
  hero: {
    eyebrow: 'Partner with us',
    title: 'Bring private AI to *your market.*',
    lead: 'We partner with technology resellers, system integrators, consultants and managed service providers to deliver secure private AI to businesses across Southeast Asia.',
  },
  why: {
    eyebrow: 'Why partner with us',
    title: 'Private AI is a strategic priority, not a side project.',
    lead: 'Businesses are increasingly concerned about data privacy, cybersecurity, regulatory compliance and dependence on public AI platforms. Our programme gives partners a practical way into that market.',
    items: [
      { name: 'Expand your portfolio', detail: 'Add private AI to your cybersecurity, infrastructure, cloud and data offerings.', icon: 'layers' },
      { name: 'New revenue streams', detail: 'Earn across hardware, software, implementation, integration, training and support.', icon: 'rocket' },
      { name: 'Stronger relationships', detail: 'Solve real customer problems around confidential data, internal knowledge and automation.', icon: 'users' },
      { name: 'Recurring revenue', detail: 'Annual support, managed AI services, model updates, monitoring and optimisation.', icon: 'support' },
      { name: 'Differentiate', detail: 'Move beyond traditional resale with securely deployed, business-ready AI.', icon: 'shield' },
      { name: 'Grow with the market', detail: 'Private AI is becoming a strategic priority for businesses across the region.', icon: 'globe' },
    ] as Item[],
  },
  portfolio: {
    eyebrow: 'What you can sell',
    title: 'A portfolio you can adapt to any industry.',
    items: [
      { name: 'Private Knowledge Assistant', detail: 'A secure internal assistant for documents, policies, manuals, contracts and reports.', icon: 'book' },
      { name: 'Private AI Agents', detail: 'Workflows and agents that automate repetitive processes inside the customer’s environment.', icon: 'agent' },
      { name: 'Private Code Assistant', detail: 'A secure coding assistant for teams working with proprietary source code.', icon: 'code' },
      { name: 'Private Translation', detail: 'Multilingual translation for documents, communications and technical content.', icon: 'translate' },
      { name: 'Private Vision AI', detail: 'Image analysis, visual inspection, document processing and industry computer vision.', icon: 'eye' },
      { name: 'Private Voice AI', detail: 'Speech recognition, transcription and internal voice assistants.', icon: 'wave' },
      { name: 'Private AI Infrastructure', detail: 'Preconfigured AI servers, GPU workstations, private cloud, model hosting, access control and monitoring.', icon: 'chip' },
    ] as Item[],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Five steps, with our team beside you.',
    items: [
      { name: 'Identify the opportunity', detail: 'You spot customers with data privacy, internal AI or secure infrastructure needs.' },
      { name: 'Qualify the use case', detail: 'We work with you on objectives, data requirements, security and expected outcomes.' },
      { name: 'Design the solution', detail: 'Our technical team supports architecture, model selection, sizing, demos and proposals.' },
      { name: 'Deliver the project', detail: 'Partner-led, joint or supported by our team, depending on your capability.' },
      { name: 'Support and expand', detail: 'Ongoing support, managed services, training and additional AI applications.' },
    ],
  },
  models: {
    eyebrow: 'Partnership models',
    title: 'Four ways to work with us.',
    lead: 'Structure, margin, territory, enablement and commercial terms are agreed based on your capability, market coverage and commitment.',
    items: [
      { name: 'Referral Partner', detail: 'Introduce qualified opportunities and earn a referral fee when they close.' },
      { name: 'Authorised Reseller', detail: 'Sell our private AI solutions directly and earn margin on approved products and services.' },
      { name: 'Solution Partner', detail: 'Combine our technology with your consulting, integration, implementation and managed services.' },
      { name: 'Strategic Market Partner', detail: 'Represent us in an agreed market, industry or territory and build long-term business together.' },
    ],
  },
  support: {
    eyebrow: 'Partner support',
    title: 'You will not be selling this alone.',
    lead: 'We partner with enterprise resellers, system integrators, managed service providers, cybersecurity firms, cloud providers, data consultancies, software vendors and industry specialists.',
    items: [
      'Sales and product training',
      'Technical enablement',
      'Solution-design support',
      'Customer presentations',
      'Demonstration assistance',
      'Proof-of-concept support',
      'Proposal and pricing guidance',
      'Joint customer meetings',
      'Marketing materials',
      'Implementation assistance',
      'Ongoing technical support',
      'Deal registration and protection',
    ],
  },
  closing: {
    eyebrow: 'Apply',
    title: 'Build the private AI market with us.',
    lead: 'Tell us about your company, market coverage, technical capabilities and customer base. Or write to [partner@logicsonata.com](mailto:partner@logicsonata.com).',
  },
};

export type PartnersDict = typeof partners;
