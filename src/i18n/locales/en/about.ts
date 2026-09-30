import type { IconName } from '@/lib/site';

export const about = {
  meta: {
    title: 'About Us: Private AI Built Around Business Control',
    description:
      'Logic Sonata helps businesses across Southeast Asia adopt AI on their own terms: on-premise, in a private cloud or hybrid, without giving up control of confidential data.',
  },
  breadcrumb: 'About',
  schemaName: 'About Logic Sonata',
  hero: {
    eyebrow: 'About us',
    title: 'AI without losing control of *your data.*',
    lead: 'We believe every business should benefit from AI without giving up control of its confidential information, intellectual property, internal knowledge or business processes.',
  },
  why: {
    eyebrow: 'Why we exist',
    title: 'Too many companies choose between innovation and control.',
    paragraphs: [
      'Many organisations hesitate to send sensitive information to external AI services. Business documents, customer data, engineering knowledge, source code and financial records are often too valuable to place outside the company’s control.',
      'We created Logic Sonata to remove that trade-off. We help businesses adopt AI on their own terms: on their premises, in a private cloud or in a controlled hybrid environment, with the hardware, software, training and support to make it work.',
    ],
  },
  control: {
    eyebrow: 'What stays under your control',
    title: 'Everything that matters.',
    items: [
      'Confidential business information',
      'Intellectual property',
      'Customer and employee data',
      'Internal documents and knowledge',
      'AI models and infrastructure',
      'User access and permissions',
      'Audit records and governance',
      'Integration with existing systems',
    ],
  },
  principles: {
    eyebrow: 'Our approach',
    title: 'Six principles in every deployment.',
    items: [
      { name: 'Private by design', detail: 'Privacy and control are part of the architecture from the start, not added at the end.', icon: 'shield' },
      { name: 'Business-led', detail: 'We focus on practical use cases that raise productivity and protect organisational knowledge.', icon: 'rocket' },
      { name: 'Model independent', detail: 'You are never locked to one AI provider. Models and infrastructure evolve with your business.', icon: 'layers' },
      { name: 'Built for integration', detail: 'AI should work with the documents, databases and platforms you already use.', icon: 'network' },
      { name: 'Designed to scale', detail: 'Most customers start with one pilot. We help it grow into a company-wide AI platform.', icon: 'grid' },
      { name: 'Measurable value', detail: 'Every AI project should deliver clear business results, not just a technology demo.', icon: 'check' },
    ] as Array<{ name: string; detail: string; icon: IconName }>,
  },
  serve: {
    eyebrow: 'Who we serve',
    title: 'Businesses across Southeast Asia.',
    lead: 'We support business and technical teams alike, from executive strategy and use-case discovery to infrastructure design, implementation, adoption and ongoing support.',
    items: [
      'Manufacturers',
      'Retailers',
      'Design companies',
      'Suppliers',
      'Apparel & textile',
      'Logistics & supply chain',
      'Engineering & construction',
      'Technology',
      'Professional services',
      'Regional & family-owned groups',
    ],
  },
  vision: {
    eyebrow: 'Our vision',
    statement: 'AI will not replace business control. *It will strengthen it.*',
    lead: 'Our ambition is to be the trusted private AI partner for organisations in Singapore, Vietnam, Indonesia, Malaysia and Thailand. Use AI. Protect your knowledge. Keep control.',
  },
};

export type AboutDict = typeof about;
