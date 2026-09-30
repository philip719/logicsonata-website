export const contact = {
  meta: {
    title: 'Book a Private AI Consultation',
    description:
      'Book a free 30-minute private AI consultation with Logic Sonata. Discuss your requirements, data exposure and a suitable pilot for your business.',
  },
  breadcrumb: 'Contact',
  eyebrow: 'Private AI consultation',
  title: 'Let’s talk about *your data.*',
  lead: 'Tell us about your business and what you want AI to do. We will map your requirements and recommend a pilot that proves value quickly, without your data leaving your control.',
  next: [
    { title: 'We review your request', detail: 'A specialist reads your goals and prepares for the call. You hear from us within one business day.' },
    { title: '30-minute consultation', detail: 'We discuss your requirements, current AI use, data sensitivity and the systems you already run.' },
    { title: 'A recommended pilot', detail: 'You receive a suggested use case, deployment model and hardware sizing, with no obligation.' },
  ],
  sales: 'Sales',
  partnerships: 'Partnerships',
  investors: 'Investors',
};

export type ContactDict = typeof contact;
