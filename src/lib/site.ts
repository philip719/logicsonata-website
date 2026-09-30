export const SITE = {
  name: 'Logic Sonata',
  url: 'https://www.logicsonata.com',
  tagline: 'Intelligence. Harmony. Impact.',
  // Meta description: keep under ~160 characters for search result snippets.
  metaDescription:
    'Secure private AI for businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand. Hardware, software, training and support from one partner.',
  description:
    'Logic Sonata delivers secure private AI for businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand: hardware, software, company knowledge, access controls, implementation, training and ongoing support.',
  // Existing Formspree form, so consultation requests keep landing in the same inbox.
  formEndpoint: 'https://formspree.io/f/mlgqveyn',
  careersFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfRCqXIUmQtD6SmTCMEBghBM8DPDTQvMVsj2MytQ-zRn04yHw/viewform?embedded=true',
  emails: {
    partners: 'partner@logicsonata.com',
    investors: 'investment@logicsonata.com',
  },
  primaryCta: { label: 'Book a Private AI Consultation', href: '/contact' },
} as const;

export const MARKETS = [
  { name: 'Singapore', code: 'SG', city: 'Singapore', lon: 103.82, lat: 1.35 },
  { name: 'Vietnam', code: 'VN', city: 'Ho Chi Minh City', lon: 106.7, lat: 10.8 },
  { name: 'Indonesia', code: 'ID', city: 'Jakarta', lon: 106.85, lat: -6.2 },
  { name: 'Malaysia', code: 'MY', city: 'Kuala Lumpur', lon: 101.69, lat: 3.14 },
  { name: 'Thailand', code: 'TH', city: 'Bangkok', lon: 100.5, lat: 13.75 },
] as const;

export const NAV = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
  { label: 'Invest', href: '/invest' },
  { label: 'Careers', href: '/careers' },
] as const;

export type Product = {
  id: string;
  code: string;
  name: string;
  summary: string;
  uses: string[];
  price: string;
  icon: IconName;
};

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

export const PRODUCTS: Product[] = [
  {
    id: 'knowledge-assistant',
    code: 'PAI-KB',
    name: 'Private Knowledge Assistant',
    summary:
      'Ask questions across your HR, SOP, compliance and finance documents in a private assistant that never touches the public internet.',
    uses: ['Policy and SOP answers in seconds', 'New-hire onboarding', 'Compliance and audit lookups'],
    price: 'From US$5k setup',
    icon: 'book',
  },
  {
    id: 'enterprise-knowledge-assistant',
    code: 'PAI-KB-ENT',
    name: 'Enterprise Knowledge Assistant',
    summary:
      'Department workspaces, role-based access and an admin dashboard, so every team gets answers while management keeps control.',
    uses: ['Separate workspaces per department', 'Role-based document permissions', 'Usage and audit dashboard'],
    price: 'From US$15k setup',
    icon: 'grid',
  },
  {
    id: 'coding-assistant',
    code: 'PAI-CODE',
    name: 'Private Coding Assistant',
    summary:
      'Repo-aware AI pair programming with IDE and Git integration. Your source code never reaches a public model.',
    uses: ['Code completion and review', 'Legacy code explanation', 'Test and documentation drafting'],
    price: 'From US$10k setup',
    icon: 'code',
  },
  {
    id: 'agent-platform',
    code: 'PAI-AGENT',
    name: 'Private AI Agent Platform',
    summary:
      'Agents that draft reports, summarise documents and prepare responses across operations, sales and finance, with human approval on every action.',
    uses: ['Daily production and sales reports', 'RFQ and tender preparation', 'Email and document triage'],
    price: 'From US$15k setup',
    icon: 'agent',
  },
  {
    id: 'image-studio',
    code: 'PAI-IMG',
    name: 'Private Image Generation Studio',
    summary:
      'On-brand concept, marketing and packaging imagery generated in a private studio. Nothing trains a public model on your designs.',
    uses: ['Product and packaging concepts', 'Campaign visuals', 'Design iteration without IP leakage'],
    price: 'Contact us for pricing',
    icon: 'image',
  },
];

export const STACK = [
  {
    name: 'Hardware',
    detail: 'Compact AI supercomputers, GPU servers or managed private GPU cloud, sized to your workload.',
    icon: 'chip',
  },
  {
    name: 'Software & models',
    detail: 'Open, model-independent AI software, so you are never locked to one provider.',
    icon: 'layers',
  },
  {
    name: 'Company knowledge',
    detail: 'Your documents, SOPs and data turned into a clean, permissioned knowledge base.',
    icon: 'database',
  },
  {
    name: 'Access controls',
    detail: 'Role-based permissions, single sign-on and a full audit trail of every query.',
    icon: 'key',
  },
  {
    name: 'Implementation',
    detail: 'Architecture, integration with your systems and a pilot that proves value first.',
    icon: 'rocket',
  },
  {
    name: 'Training',
    detail: 'Role-based workshops that turn installed AI into daily habits across every team.',
    icon: 'users',
  },
  {
    name: 'Ongoing support',
    detail: 'Monitoring, model updates, knowledge refreshes and quarterly business reviews.',
    icon: 'support',
  },
] as const satisfies ReadonlyArray<{ name: string; detail: string; icon: IconName }>;

export const INDUSTRIES = [
  {
    name: 'Manufacturers',
    detail: 'SOPs, quality reports and production know-how answered instantly on the factory floor.',
    icon: 'factory',
  },
  {
    name: 'Retailers',
    detail: 'Product knowledge, pricing files and customer service drafts kept inside your business.',
    icon: 'store',
  },
  {
    name: 'Design companies',
    detail: 'Generate and iterate concepts privately, so your designs never train a public model.',
    icon: 'pen',
  },
  {
    name: 'Suppliers',
    detail: 'Faster RFQs, costing and buyer communication without exposing margins or buyer data.',
    icon: 'truck',
  },
  {
    name: 'Regional businesses',
    detail: 'One private knowledge layer across subsidiaries, languages and borders.',
    icon: 'network',
  },
  {
    name: 'Any company that values privacy',
    detail: 'If you want the productivity of AI without handing over your data, we are a fit.',
    icon: 'shield',
  },
] as const satisfies ReadonlyArray<{ name: string; detail: string; icon: IconName }>;

export const PROCESS = [
  { step: 'Assess', detail: 'Review your AI usage, data exposure and the best private use cases.' },
  { step: 'Pilot', detail: 'Stand up one working use case and prove value with real users.' },
  { step: 'Roll out', detail: 'Expand across departments with governance, training and access control.' },
  { step: 'Manage', detail: 'Keep it governed, supported and improving, quarter after quarter.' },
] as const;

export const FAQ = [
  {
    q: 'What is private AI?',
    a: 'Private AI runs generative AI models inside an environment your company controls: on your own hardware, in a private cloud, or in a hybrid setup. Your documents and data are never sent to a public AI service and are never used to train someone else’s model.',
  },
  {
    q: 'How is Logic Sonata different from using ChatGPT at work?',
    a: 'Public AI tools process your prompts on infrastructure you do not control. Logic Sonata deploys the model, the knowledge base and the access controls inside your environment, so buyer data, costing files, contracts and source code stay under your governance with a full audit trail.',
  },
  {
    q: 'What does a Logic Sonata private AI solution include?',
    a: 'Everything needed to run AI privately: the hardware, the software and models, your company knowledge prepared as a secure knowledge base, access controls, implementation, staff training and ongoing managed support. One partner is accountable for the whole stack.',
  },
  {
    q: 'Do we need to buy GPU hardware?',
    a: 'No. Every product is available in three deployment models: hosted on managed private GPU cloud with no hardware purchase, on-premise on dedicated hardware inside your building, or hybrid, with on-premise for sensitive data and hosted for everything else.',
  },
  {
    q: 'What hardware do you deploy on-premise?',
    a: 'We size hardware to your workload. Smaller teams can start with a compact AI supercomputer such as NVIDIA DGX Spark, which combines a Grace Blackwell superchip with 128 GB of unified memory in a desktop-sized unit. Larger rollouts use multi-GPU servers or a private cloud cluster.',
  },
  {
    q: 'Which countries do you serve?',
    a: 'Logic Sonata serves businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand, with delivery and support across Southeast Asia.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'Manufacturers, retailers, design companies, suppliers and regional business groups are our core customers. In practice, any company that wants to use AI while keeping its data private is a good fit.',
  },
  {
    q: 'How long does a private AI pilot take?',
    a: 'Most customers start with an AI Privacy and Readiness Assessment, which produces a 30/60/90-day roadmap. The pilot then covers one working use case, so you prove value with real users before committing to a full rollout.',
  },
  {
    q: 'What does ongoing support cost?',
    a: 'Managed support runs in four tiers: Basic for 10 to 30 users at US$1k to 3k per month, Business for 30 to 150 users at US$3k to 8k per month, Enterprise for 150+ users at US$8k to 20k per month, and Premium for mission-critical deployments from US$20k per month.',
  },
] as const;
