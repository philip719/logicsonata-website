import { LOCALE_META, PREFIXED_LOCALES } from '@/i18n/config';
import { en } from '@/i18n/locales/en';
import { ROUTES } from '@/lib/routes';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Plain-text company summary for AI assistants and answer engines.
// Generated from the same data as the site so it never drifts.

const INTRO = `# Logic Sonata

> Logic Sonata delivers secure private AI solutions for businesses in Singapore, Vietnam, Indonesia,
> Malaysia and Thailand. Each solution combines hardware, software, company knowledge, access controls,
> implementation, training and ongoing support. Solutions run on-premise on customer hardware, hosted on
> managed private GPU cloud, or in a hybrid configuration, so confidential documents, buyer data, costing
> files, contracts and source code never reach a public AI model.

Tagline: Intelligence. Harmony. Impact.
Website: https://www.logicsonata.com
Primary call to action: Book a Private AI Consultation at https://www.logicsonata.com/contact

## What a Logic Sonata solution includes

1. Hardware: compact AI workstations (such as NVIDIA DGX Spark or AMD Ryzen AI Max+ systems), multi-GPU servers or managed private GPU cloud. Logic Sonata is hardware-neutral.
2. Software and models: open, model-independent AI software with no lock-in to one provider.
3. Company knowledge: documents, SOPs and data prepared as a clean, permissioned knowledge base.
4. Access controls: role-based permissions, single sign-on and a full audit trail.
5. Implementation: architecture, integration with existing systems and a pilot that proves value first.
6. Training: role-based workshops for managers, HR, sales, operations and finance.
7. Ongoing support: monitoring, model updates, knowledge refreshes and quarterly business reviews.

`;

const HARDWARE = `## On-premise hardware

Logic Sonata is hardware-neutral and sizes the platform to each workload. Smaller teams often start with a
compact AI workstation:

- NVIDIA DGX Spark: GB10 Grace Blackwell superchip, 128 GB unified memory, up to 1 petaFLOP of FP4 AI
  performance, ConnectX-7 networking to link two units for larger models.
- AMD Ryzen AI Max+ 395 systems: 16-core Zen 5 CPU, Radeon 8060S GPU and XDNA 2 NPU, up to 128 GB unified
  memory with up to 96 GB assignable to the GPU.

Larger rollouts use multi-GPU servers or a private cloud cluster.

`;

const SERVICES = `## Services

1. AI Privacy and Readiness Assessment: risk mapping and a 30/60/90-day roadmap. The usual first engagement.
2. Private AI Pilot Implementation: one working use case, proven before full rollout.
3. Data Preparation and Knowledge Base: messy files turned into a clean, permissioned, tested knowledge base.
4. AI Governance and Policy: usage policy, approved tools list and role-based access rules.
5. AI Training and Adoption: role-based workshops.
6. Managed Private AI Support: monitoring, model updates, knowledge base refreshes and quarterly reviews.

`;

const SUPPORT = `## Managed support tiers

- Basic: 10 to 30 users, next-business-day response.
- Business: 30 to 150 users, same-business-day response.
- Enterprise: 150+ users, 4 to 8 hour urgent response, dedicated support manager.
- Premium: mission-critical, custom SLA, dedicated technical lead, on-site option.

`;

const CUSTOMERS = `## Customers

Core customers: manufacturers, retailers, design companies, suppliers and regional business groups.
Any company that wants to use AI while keeping its data private is a good fit.
Markets: Singapore, Vietnam, Indonesia, Malaysia and Thailand.

## Engagement process

Assess, Pilot, Roll out, Manage.

## Positioning

Logic Sonata is not a reseller of public AI services. It combines AI models, secure infrastructure,
company data, software integration and business-process understanding into complete private AI
solutions, with one partner accountable for the whole stack.

`;

function products() {
  const lines = ['## Products', '', 'Each product is available on-premise, hosted or hybrid.', ''];
  for (const p of en.products) {
    lines.push(`### ${p.name} (${p.code})`, '', p.tagline, '', p.summary, '');
    lines.push(`Built on: ${p.builtOn}`, '');
    lines.push('Use cases: ' + p.useCases.map((u) => u.title).join('; ') + '.', '');
    lines.push(`Page: ${SITE.url}/solutions/${p.id}`, `Whitepaper: ${SITE.url}/whitepapers/${p.id}`, '');
  }
  return lines.join('\n');
}

function pages() {
  const lines = ['## Pages', ''];
  for (const r of ROUTES) lines.push(`- ${SITE.url}${r.path === '/' ? '/' : r.path}`);
  lines.push('', '## Languages', '', 'English is served at the paths above. Every page is also available in:');
  for (const l of PREFIXED_LOCALES) lines.push(`- ${LOCALE_META[l].name} (${LOCALE_META[l].hreflang}): ${SITE.url}/${l}`);
  lines.push('', 'Whitepaper PDFs are written in English.');
  return lines.join('\n') + '\n\n';
}

const CONTACT = `## Contact

Consultations: ${SITE.url}/contact
Sales: ${SITE.emails.sales}
Partner enquiries: ${SITE.emails.partners}
Investor relations: ${SITE.emails.investors}
`;

export function GET() {
  const body = [INTRO, products(), '\n', HARDWARE, SERVICES, SUPPORT, CUSTOMERS, pages(), CONTACT].join('');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
