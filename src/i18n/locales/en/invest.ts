import type { IconName } from '@/lib/site';

type Card = { title: string; detail: string; icon: IconName };

export const invest = {
  meta: {
    title: 'Investor Relations',
    description:
      'Investor relations at Logic Sonata: our investment thesis, business model and growth strategy for private AI in Southeast Asia, and how to contact our investor relations team.',
  },
  breadcrumb: 'Investor relations',
  hero: {
    eyebrow: 'Investor relations',
    title: 'Building Southeast Asia’s trusted *private AI company.*',
    lead: 'Information for prospective investors, strategic partners and analysts about Logic Sonata’s strategy, business model and growth plans, and how to reach our investor relations team.',
    primary: 'Contact investor relations',
    secondary: 'Our investment thesis',
  },
  snapshot: {
    eyebrow: 'At a glance',
    title: 'Logic Sonata in brief.',
    // The markets card shows the market codes; the other values are translated.
    items: [
      { label: 'Focus', text: 'Private AI for businesses', icon: 'shield' },
      { label: 'Markets', text: 'SG · VN · ID · MY · TH', icon: 'globe' },
      { label: 'Revenue model', text: 'Projects plus recurring managed services', icon: 'layers' },
      { label: 'Route to market', text: 'Direct sales and a partner channel', icon: 'network' },
    ] as Array<{ label: string; text: string; icon: IconName }>,
    body: 'Logic Sonata designs, deploys and manages private AI for businesses that cannot send confidential data to public AI services. Each solution combines hardware, software, company knowledge, access controls, implementation, training and ongoing support. See our [product portfolio](/solutions).',
  },
  thesis: {
    eyebrow: 'Investment thesis',
    title: 'Why private AI, why Southeast Asia, why now.',
    items: [
      {
        title: 'Data control is becoming non-negotiable',
        detail:
          'Businesses want the productivity of AI but cannot place confidential documents, source code and customer data into systems they do not control. Demand for private deployment is structural, not cyclical.',
        icon: 'lock',
      },
      {
        title: 'Private AI has become affordable',
        detail:
          'Compact AI workstations with up to 128 GB of unified memory now run capable open models on a desk. On-premise AI is within reach of mid-sized companies for the first time.',
        icon: 'chip',
      },
      {
        title: 'The mid-market needs a full-stack partner',
        detail:
          'Regional companies rarely have the in-house skills to select models, prepare data, secure access and drive adoption. One accountable partner for the whole stack is what they buy.',
        icon: 'users',
      },
      {
        title: 'Recurring revenue compounds',
        detail:
          'Every deployment moves into a managed support tier. Each additional product line deployed at an existing customer adds recurring value without new acquisition cost.',
        icon: 'rocket',
      },
      {
        title: 'Partners multiply reach',
        detail:
          'Resellers, system integrators and managed service providers extend our reach across five markets faster than a direct sales force alone.',
        icon: 'network',
      },
    ] as Card[],
  },
  market: {
    eyebrow: 'Market opportunity',
    title: 'Structural forces behind demand.',
    lead: 'The shift to private AI is driven by regulation, risk and the economics of new hardware, across a region with a deep manufacturing and supplier base.',
    items: [
      { title: 'Data protection regulation', detail: 'Personal data protection laws across Singapore, Malaysia, Thailand, Indonesia and Vietnam raise the cost of uncontrolled AI use.' },
      { title: 'Shadow AI inside companies', detail: 'Staff already use public AI tools with company data, creating risk that boards now want addressed.' },
      { title: 'Model independence', detail: 'Buyers want to choose and change models rather than commit to a single provider.' },
      { title: 'Manufacturing and supply-chain base', detail: 'Southeast Asia’s manufacturing, apparel and supplier sectors hold sensitive buyer, costing and design data.' },
      { title: 'Governance expectations', detail: 'Boards, auditors and customers increasingly expect a traceable record of how AI is used.' },
      { title: 'Early market', detail: 'Most regional businesses are at the start of AI adoption, leaving room to establish a trusted brand.' },
    ],
  },
  model: {
    eyebrow: 'Business model',
    title: 'Land, deploy, retain, expand.',
    lead: 'Project revenue opens each relationship; recurring managed services and additional product lines build long-term value.',
    items: [
      { title: 'Land', detail: 'Readiness assessments and pilots prove value on one use case and open the relationship.', icon: 'flask' },
      { title: 'Deploy', detail: 'Implementation projects cover hardware, software, knowledge preparation, integration and training.', icon: 'rocket' },
      { title: 'Retain', detail: 'Managed support tiers provide monitoring, model updates, governance reviews and ongoing improvement.', icon: 'support' },
      { title: 'Expand', detail: 'Five product lines, from knowledge assistants to vision and agents, grow value within each customer.', icon: 'layers' },
    ] as Card[],
  },
  growth: {
    eyebrow: 'Growth strategy',
    title: 'Where we are focused next.',
    items: [
      'Phased expansion across Singapore, Vietnam, Indonesia, Malaysia and Thailand',
      'Building a partner channel of resellers, integrators and managed service providers',
      'Industry packages for manufacturing, apparel, retail and supply chain',
      'Appliance automation for faster, repeatable deployments',
      'Strengthening managed services and governance tooling',
      'Selective hiring of regional sales and pre-sales leaders',
    ],
  },
  advantages: {
    eyebrow: 'Competitive position',
    title: 'What sets us apart.',
    items: [
      'Private by design, with governance and audit built in from the start',
      'Model- and hardware-independent: no lock-in for customers',
      'A productised appliance with signed updates, backup and recovery',
      'Full-stack delivery, from hardware to adoption training',
      'Regional presence and language capability',
      'Partner programme extending reach beyond direct sales',
    ],
  },
  faq: {
    eyebrow: 'Investor FAQ',
    title: 'Engaging with Logic Sonata.',
    items: [
      {
        q: 'Is Logic Sonata raising capital?',
        a: 'We are not running an open fundraising process. We speak selectively with investors and strategic partners who bring value beyond capital, such as regional market access, enterprise relationships or channel networks.',
      },
      {
        q: 'Can I receive financial information or an investor briefing?',
        a: 'Detailed materials are shared personally with qualified parties under a non-disclosure agreement. Use the enquiry form below and our team will be in touch.',
      },
      {
        q: 'Do you publish financial results?',
        a: 'Logic Sonata is a private company and does not publish financial statements or forward-looking financial information on this website.',
      },
      {
        q: 'Who should I contact?',
        a: 'Write to investment@logicsonata.com or use the enquiry form. Customer and partnership questions are handled separately by our sales and partner teams.',
      },
    ],
  },
  enquiry: {
    eyebrow: 'Contact investor relations',
    title: 'Start a confidential conversation.',
    lead: 'Tell us about your organisation and your interest in Logic Sonata. We reply personally to every enquiry and share detailed materials under a non-disclosure agreement.',
    email: 'Investor relations',
  },
};

export type InvestDict = typeof invest;
