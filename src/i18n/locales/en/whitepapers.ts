export const whitepapers = {
  index: {
    meta: {
      title: 'Private AI Whitepapers',
      description:
        'Free whitepapers on private knowledge assistants, on-site vision AI, private coding assistants, governed AI agents and private image generation.',
    },
    breadcrumb: 'Whitepapers',
    eyebrow: 'Resources',
    title: 'Private AI, *explained.*',
    lead: 'Practical whitepapers for business and technology leaders: how each system works, the controls that keep data private, where it pays off first and how to roll it out.',
  },
  landing: {
    metaTitle: 'Whitepaper: {title}',
    metaDescription: 'Free whitepaper from Logic Sonata: {subtitle}. {contents}.',
    eyebrow: 'Free whitepaper · {code}',
    inside: 'What is inside',
    checklist: 'Security controls checklist',
    // {name} is the product name; {nameLower} is the same in lower case.
    audience: 'PDF · Written for business and technology leaders evaluating {nameLower} solutions.',
    language: '',
    coverAlt: 'Cover of the {title} whitepaper',
    formTitle: 'Get your free copy',
    formIntro: 'Tell us where to send it. Your download starts as soon as you submit.',
    more: 'Prefer to see {code} first? [Explore the {name}](/solutions/{id}) or [book a consultation](/contact).',
  },
};

export type WhitepapersDict = typeof whitepapers;
