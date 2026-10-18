import { en } from '@/i18n/locales/en';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Reference material for the website chat assistant (public/api/chat.php reads this file
// from disk; .htaccess blocks it from the web). Generated from the English site content
// at build time, so the assistant always knows exactly what the website says.

const plain = (s: string) => s.replace(/\*/g, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
const list = (items: string[]) => items.map((i) => `- ${plain(i)}`).join('\n');

function company() {
  const { data, about, home } = en;
  return [
    '# Company',
    plain(data.description),
    `Tagline: ${SITE.tagline}`,
    plain(home.hero.lead),
    plain(about.why.paragraphs.join(' ')),
    `Vision: ${plain(about.vision.statement)} ${plain(about.vision.lead)}`,
    '## Principles',
    list(about.principles.items.map((p) => `${p.name}: ${p.detail}`)),
    '## What stays under the customer’s control',
    list(about.control.items),
    '## Markets',
    list(data.markets.map((m) => `${m.name} (${m.code}), based around ${m.city}`)),
    '## Industries',
    list(data.industries.map((i) => `${i.name}: ${i.detail}`)),
    `Also: ${about.serve.items.join(', ')}.`,
    '## The problem we solve',
    plain(home.problem.lead),
    list(home.problem.exposure.map((e) => e.text)),
    '## What every solution includes (the private AI stack)',
    list(data.stack.map((s) => `${s.name}: ${s.detail}`)),
    '## Engagement process',
    list(data.process.map((p) => `${p.step}: ${p.detail}`)),
  ].join('\n\n');
}

function deployment() {
  const { solutions } = en;
  const h = solutions.hardware;
  return [
    '# Deployment and hardware',
    list(en.home.deployment.items.map((d) => `${d.name}: ${d.line} ${d.detail}`)),
    plain(h.lead),
    '## Hardware tiers',
    list(h.tiers.map((t) => `${t.name} (${t.fit}): ${t.detail}`)),
    '## Compact workstation platforms (manufacturer published figures)',
    list(h.platforms.map(([label, nvidia, amd]) => `${label}: NVIDIA DGX Spark: ${nvidia}. AMD Ryzen AI Max+: ${amd}.`)),
    '## Extended capabilities (add-ons or tailored projects)',
    list(solutions.extended.items.map((i) => `${i.name}: ${i.detail}`)),
  ].join('\n\n');
}

function products() {
  return en.products
    .map((p) =>
      [
        `# Product: ${p.name} (${p.code})`,
        `Page: /solutions/${p.id} · Whitepaper: /whitepapers/${p.id} (${p.whitepaper.title}, free PDF in English)`,
        p.tagline,
        p.summary,
        p.heroLead,
        `Problem: ${p.problem.title} ${p.problem.body}`,
        '## Capabilities',
        list(p.capabilities.map((c) => `${c.title}: ${c.detail}`)),
        '## Use cases',
        list(p.useCases.map((u) => `${u.title}: ${u.detail}`)),
        '## How it works',
        list(p.steps.map((s) => `${s.title}: ${s.detail}`)),
        '## Security controls',
        list(p.controls),
        `Built on: ${p.builtOn}`,
        `## ${p.spotlight.title}`,
        p.spotlight.lead,
        list(p.spotlight.items.map((i) => `${i.label}: ${i.text}`)),
        '## FAQ',
        p.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n'),
      ].join('\n\n'),
    )
    .join('\n\n');
}

function services() {
  const { services } = en;
  return [
    '# Services',
    plain(services.hero.lead),
    list(services.deliver.items.map((s) => `${s.name}: ${s.detail}`)),
    '## Managed support tiers',
    plain(services.support.lead),
    list(services.support.tiers.map((t) => `${t.name} (${t.users}, response: ${t.response}): ${t.detail}`)),
  ].join('\n\n');
}

function consultation() {
  const { contact, common } = en;
  return [
    '# Free consultation and demo',
    plain(common.ctaBand.lead),
    plain(contact.lead),
    'What happens next:',
    list(contact.next.map((n) => `${n.title}: ${n.detail}`)),
    'In the consultation we can show a live demonstration, such as the Private Knowledge Assistant apparel demo, tailored to the visitor’s use case.',
  ].join('\n\n');
}

function faq() {
  return ['# General FAQ', en.data.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')].join('\n\n');
}

function otherAudiences() {
  const { partners, careers } = en;
  return [
    '# Partners, careers and investors',
    `Partner programme (/partners): ${plain(partners.hero.lead)} Models: ${partners.models.items.map((m) => `${m.name} (${m.detail})`).join('; ')}. Contact ${SITE.emails.partners}.`,
    `Careers (/careers): ${plain(careers.hero.lead)} Open roles: ${careers.roles.items.map((r) => `${r.title}, ${r.country} (${r.location})`).join('; ')}. Applications go through the form on the careers page.`,
    `Investor relations (/invest): enquiries to ${SITE.emails.investors}. Do not discuss valuation, funding rounds or financial figures.`,
  ].join('\n\n');
}

function pages() {
  return [
    '# Website pages (English paths; other languages add a prefix such as /th)',
    list([
      '/ : home',
      '/solutions : all products and hardware',
      ...en.products.map((p) => `/solutions/${p.id} : ${p.name} (${p.code})`),
      '/whitepapers : free whitepapers',
      '/services : services and managed support tiers',
      '/contact : book a free private AI consultation',
      '/about : about Logic Sonata',
      '/partners : partner programme',
      '/careers : open roles',
      '/invest : investor relations',
    ]),
    `Sales email: ${SITE.emails.sales}`,
  ].join('\n\n');
}

export function GET() {
  const body = [company(), deployment(), products(), services(), consultation(), faq(), otherAudiences(), pages()].join('\n\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
