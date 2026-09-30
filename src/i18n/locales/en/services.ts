import type { IconName } from '@/lib/site';

export const services = {
  meta: {
    title: 'Private AI Services, Training and Managed Support',
    description:
      'AI readiness assessments, pilot implementation, knowledge base preparation, AI governance, staff training and managed private AI support for businesses in Southeast Asia.',
  },
  breadcrumb: 'Services',
  catalogName: 'Managed private AI support tiers',
  offerName: '{name} support',
  hero: {
    eyebrow: 'Services',
    title: 'Hardware and software are *half the job.*',
    lead: 'Most companies do not know how to choose models, clean their documents, train staff or govern AI use. That is exactly what we do, from the first assessment to long-term managed support.',
    cta: 'Start with an assessment',
  },
  deliver: {
    eyebrow: 'What we deliver',
    title: 'Six services. One accountable partner.',
    items: [
      {
        name: 'AI Privacy & Readiness Assessment',
        detail: 'Map your AI risk, find your best private use cases and leave with a 30/60/90-day roadmap. The easiest first step.',
        icon: 'search',
      },
      {
        name: 'Private AI Pilot Implementation',
        detail: 'One working use case, deployed and proven with real users, before you commit to a full rollout.',
        icon: 'flask',
      },
      {
        name: 'Data Preparation & Knowledge Base',
        detail: 'Messy files become a clean, permissioned and tested private knowledge base. This is where most AI projects fail, and where we do not.',
        icon: 'database',
      },
      {
        name: 'AI Governance & Policy',
        detail: 'Usage policy, approved tools list and role-based access rules, so your team can use AI safely from day one.',
        icon: 'policy',
      },
      {
        name: 'AI Training & Adoption',
        detail: 'Role-based workshops for managers, HR, sales, operations and finance. Hardware does not create adoption. Training does.',
        icon: 'users',
      },
      {
        name: 'Managed Private AI Support',
        detail: 'Monitoring, model updates, knowledge base refreshes and quarterly reviews that keep every deployment healthy.',
        icon: 'support',
      },
    ] as Array<{ name: string; detail: string; icon: IconName }>,
  },
  support: {
    eyebrow: 'Managed support',
    title: 'Long-term reliability, not one-off help desks.',
    lead: 'Every deployment renews into one of four managed support tiers, sized to your users and how critical the system is.',
    badge: 'MOST COMMON',
    response: 'Response',
    tiers: [
      { name: 'Basic', users: '10 to 30 users', response: 'Next business day', detail: 'Monthly health checks, minor prompt tuning and knowledge base refresh.', featured: false },
      { name: 'Business', users: '30 to 150 users', response: 'Same business day', detail: 'Priority support, weekly checks and a quarterly business review.', featured: false },
      { name: 'Enterprise', users: '150+ users', response: '4 to 8 hours urgent', detail: 'Dedicated support manager, security patch coordination and governance reporting.', featured: true },
      { name: 'Premium', users: 'Mission-critical', response: 'Custom SLA', detail: 'Dedicated technical lead, on-site option and a monthly steering committee.', featured: false },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'From first conversation to managed operations.',
  },
};

export type ServicesDict = typeof services;
