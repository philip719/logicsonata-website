import type { IconName } from '@/lib/site';

// Shared business content used across several pages.

type Item = { name: string; detail: string; icon: IconName };

export const data = {
  description:
    'Logic Sonata delivers secure private AI for businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand: hardware, software, company knowledge, access controls, implementation, training and ongoing support.',
  hardwareSpecs: [
    'AI superchip: CPU, GPU and NPU',
    'Up to 128 GB unified memory',
    'Large language models run locally',
    'Local NVMe storage',
    'Fan and vapor-chamber cooling',
    'Scales from one unit to a cluster',
  ],
  // Codes and order must stay the same in every language; map coordinates live in src/lib/site.ts.
  markets: [
    { code: 'SG', name: 'Singapore', city: 'Singapore' },
    { code: 'VN', name: 'Vietnam', city: 'Ho Chi Minh City' },
    { code: 'ID', name: 'Indonesia', city: 'Jakarta' },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur' },
    { code: 'TH', name: 'Thailand', city: 'Bangkok' },
  ],
  stack: [
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
  ] as Item[],
  industries: [
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
  ] as Item[],
  process: [
    { step: 'Assess', detail: 'Review your AI usage, data exposure and the best private use cases.' },
    { step: 'Pilot', detail: 'Stand up one working use case and prove value with real users.' },
    { step: 'Roll out', detail: 'Expand across departments with governance, training and access control.' },
    { step: 'Manage', detail: 'Keep it governed, supported and improving, quarter after quarter.' },
  ],
  faq: [
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
      a: 'We are hardware-neutral and size the platform to your workload. Smaller teams often start with a compact AI workstation such as NVIDIA DGX Spark or an AMD Ryzen AI Max+ system, both of which offer up to 128 GB of unified memory in a desktop-sized unit. Larger rollouts use multi-GPU servers or a private cloud cluster.',
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
      q: 'How does ongoing support work?',
      a: 'Every deployment moves into a managed support tier sized to your users and how critical the system is, from monthly health checks to a dedicated technical lead with a custom service level. We recommend the right tier during the assessment.',
    },
  ],
};

export type DataDict = typeof data;
