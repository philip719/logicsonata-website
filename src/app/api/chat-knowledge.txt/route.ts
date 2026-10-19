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

// What prospects see in the consultation demo. Written from the Apex Apparel demo knowledge on the
// LSAI lab stack (port 12002) on the Spark; update it when that demo changes.
const LIVE_DEMO = `# The live demo (shown in the free consultation)

The demo runs the Private Knowledge Assistant (PAI-KB) on a Logic Sonata appliance, loaded with the knowledge
of Apex Apparel: a fictional apparel manufacturer invented for demonstrations, with a Singapore head office and
sewing plants in Vietnam, Indonesia and Cambodia. Apex is not a real company and not a customer: never present
its details as facts about Logic Sonata or any real client.

What prospects see in the demo:
- One governed chat interface over seven knowledge areas held in five secured collections: company knowledge
  and HR handbook, production SOP, quality management, industrial engineering, machine troubleshooting,
  product tech packs, and sales and customer accounts.
- Everyday questions answered in seconds with citations to the exact document, for example "How many
  annual-leave days do confirmed employees receive?", "What should be done when shade variation is
  detected?", "Which machine should attach rib neck binding?" or "Summarise style APX-JK310 and its
  production risks."
- Version control: when an SOP is superseded, answers follow the current version and cite it.
- Multi-step (agentic) questions that plan, search several knowledge areas and produce an action plan, for
  example: "Line 12 is at 61% efficiency. Review the tech pack, production report, quality data, IE guidelines
  and SOP, and create a management action plan to reach 75% within two weeks."
- Role-based access: the same question gets a different, correct answer depending on who asks. Payroll,
  budgets and board material are refused for standard users, and every attempt is logged in the Security
  Center.
- Administration: administrators curate the knowledge; standard users can use it but cannot delete or
  re-index it.

How to use this: when a visitor is interested, describe what they would see, relate it to their own industry
and documents (the demo can be tailored to their use case), and invite them to book. Do not answer questions
about Apex's documents yourself; offer to show them in the live demo instead.`;

// Capabilities that go beyond a standard RAG chatbot. Written from the LSAI lab stack (port 12002)
// install guide; describe what they do, not which open-source components provide them.
const BEYOND_RAG = `# Beyond standard RAG (included in the Private Knowledge Assistant today)

Most document chatbots only search plain text and answer from whatever they find. Logic Sonata's knowledge
assistant adds the following, all available now on the appliance.

Reads the documents companies really have:
- PDFs including their figures, charts, tables and diagrams drawn with lines and boxes, not just the text.
- Older and less common formats such as DOC, XLS, PPT, RTF, OpenDocument (ODT, ODS, ODP), EPUB and HTML,
  including the pictures embedded inside them.
- Emails (EML and MSG) and their attachments, read exactly like uploaded files.
- Scanned pages and photos through text recognition (OCR) that keeps exact characters, so part numbers,
  codes and Thai or Chinese text stay correct.

Finds the right passage:
- Hybrid search: exact-word search (part numbers, error codes, names, Thai and Chinese text) combined with
  meaning search, so it finds both "what the user meant" and "the exact code they typed".
- A re-ranking step on the GPU picks the best passages before the answer is written; if it is busy,
  answers still arrive.
- Documents are split along their headings, so tables and step-by-step procedures stay whole.

Shows its evidence:
- Answers can show the pictures they used (diagrams, charts, scanned pages), up to three by default. Every
  view re-checks the user's folder access and is recorded in the audit log.

Honest answers (designed to prevent made-up answers):
- If the approved documents do not contain the answer, it says "This is not in the approved documents
  available to you." instead of guessing. It gives exactly the same reply for folders the user is not
  allowed to see, so it never reveals that restricted documents exist.
- Every sentence in an answer must match the document it comes from.
- When documents disagree, it shows them side by side with their sources rather than picking one silently.
- Superseded editions are not used; answers follow the current version.
- For questions that need a second document, it runs one extra targeted search.

Governance and operations:
- Request Access: users can ask for access to a folder through an approval step; access can be
  time-limited and is revoked automatically when it expires, or manually at any time.
- An extra sign-in step (multi-factor authentication) for sensitive actions.
- A full audit timeline of who asked what, what was answered, refused or viewed.
- Automatic encrypted backups (nightly full, hourly for documents and chats) to the customer's own network
  storage, checked every week by reading a copy back, and restorable onto another machine.
- Encryption of stored data, and health monitoring of the appliance (services, disk, backups) in the
  Security Center.

How to use this: describe these as capabilities in plain business terms and relate them to the visitor's
documents (for example scanned forms, old Excel files, email archives, technical drawings, Thai or Chinese
documents). Do not name the underlying open-source components unless a technical visitor asks directly;
if they do, you may say it is built on proven open-source document, search and policy components, and that
a specialist can walk through the exact architecture in the consultation. Offer to show these in the live
demo.`;

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

// Answers to questions visitors ask that the website pages do not cover. Add a line here
// whenever the chat emails show the assistant guessing; it never invents these.
const PRECISE_FACTS = `# Precise facts (state these exactly)

- Hosted (managed private cloud) data location: agreed with each customer, including hosting in the
  customer's own country where required. A specialist confirms the location in the consultation. Never
  say data is or is not stored in a particular country.
- Prices are not published: they depend on users, data and deployment model. The free consultation
  produces a sizing and a recommended pilot.`;

export function GET() {
  const body = [company(), deployment(), products(), services(), consultation(), LIVE_DEMO, BEYOND_RAG, faq(), otherAudiences(), pages(), PRECISE_FACTS].join('\n\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
