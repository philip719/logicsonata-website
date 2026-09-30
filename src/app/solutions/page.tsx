import type { Metadata } from 'next';
import Link from 'next/link';
import { DeploymentArt } from '@/components/graphics/DeploymentArt';
import { ExplodedSpark } from '@/components/graphics/ExplodedSpark';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { PRODUCTS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Private AI Products and Hardware',
  description:
    'Private knowledge assistants, coding assistants, AI agents and image generation, deployed on-premise, hosted or hybrid on hardware sized to your business. Pricing from US$5k.',
  alternates: { canonical: '/solutions' },
  openGraph: { url: '/solutions' },
};

const HARDWARE_SPECS: Array<[string, string]> = [
  ['Superchip', 'NVIDIA GB10 Grace Blackwell'],
  ['AI performance', 'Up to 1 petaFLOP (FP4)'],
  ['Memory', '128 GB unified LPDDR5x'],
  ['Model size', 'Up to 200B parameters on one unit'],
  ['Storage', 'Up to 4 TB NVMe'],
  ['Networking', 'ConnectX-7, link two units for larger models'],
  ['Footprint', '150 × 150 mm, fits on a desk'],
];

const TIERS = [
  {
    name: 'Compact AI supercomputer',
    fit: 'Pilots and smaller teams',
    detail: 'A desktop unit such as NVIDIA DGX Spark. Designed for the office, powerful enough for serious models.',
    icon: 'chip' as const,
  },
  {
    name: 'GPU server',
    fit: 'Department and company-wide rollouts',
    detail: 'Rack-mounted multi-GPU servers in your server room or data centre for higher concurrency.',
    icon: 'layers' as const,
  },
  {
    name: 'Managed private cloud',
    fit: 'No hardware purchase',
    detail: 'Dedicated GPU capacity in a managed private environment, isolated from public AI services.',
    icon: 'cloud' as const,
  },
];

const EXTENDED = [
  { name: 'Private Translation', detail: 'Multilingual translation for documents, communications and technical content.', icon: 'translate' as const },
  { name: 'Private Vision AI', detail: 'Visual inspection, image analysis and document processing for industry workflows.', icon: 'eye' as const },
  { name: 'Private Voice AI', detail: 'Speech recognition, transcription and internal voice assistants.', icon: 'wave' as const },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'Solutions', path: '/solutions' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Logic Sonata private AI products',
          itemListElement: PRODUCTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: p.name,
              description: p.summary,
              url: `${SITE.url}/solutions#${p.id}`,
              provider: { '@id': `${SITE.url}/#org` },
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Private AI systems, <span className="accent">ready to deploy.</span>
          </>
        }
        lead="Five production-ready AI systems, each delivered with the hardware, your company knowledge, access controls, training and support needed to run it privately."
      >
        <div className="btn-row">
          <Link href={SITE.primaryCta.href} className="btn btn-primary btn-lg">
            {SITE.primaryCta.label}
            <Icon name="arrow" size={18} />
          </Link>
          <Link href="#hardware" className="btn btn-ghost btn-lg">
            View the hardware
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" eyebrow="Products" title="Choose the system that fits your data." />
          <div className="product-list">
            {PRODUCTS.map((p) => (
              <article key={p.id} id={p.id} className="product-row" data-reveal>
                <div>
                  <span className="card-icon">
                    <Icon name={p.icon} />
                  </span>
                  <h2>{p.name}</h2>
                  <span className="mono card-code">{p.code}</span>
                </div>
                <div>
                  <p className="lead">{p.summary}</p>
                </div>
                <div className="product-price">
                  <ul className="check-list">
                    {p.uses.map((u) => (
                      <li key={u}>
                        <Icon name="check" size={16} />
                        {u}
                      </li>
                    ))}
                  </ul>
                  <span className="mono">{p.price}</span>
                  <small>On-premise, hosted or hybrid</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="hardware">
        <div className="container">
          <div className="hardware">
            <div className="panel panel-graphic" data-reveal>
              <Corners />
              <ExplodedSpark />
            </div>
            <div data-reveal>
              <SectionHead
                index="02"
                eyebrow="Hardware"
                title="Data-centre AI that fits on a desk."
                lead="For many teams, private AI starts with a compact AI supercomputer such as NVIDIA DGX Spark. We supply, configure and support it as part of your solution."
              />
              <table className="spec-table">
                <tbody>
                  {HARDWARE_SPECS.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="fine-print">
                Specifications are the manufacturer’s published figures for NVIDIA DGX Spark. NVIDIA and DGX Spark are
                trademarks of NVIDIA Corporation.
              </p>
            </div>
          </div>
          <div className="cards cards-3" style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
            {TIERS.map((t) => (
              <article key={t.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={t.icon} />
                </span>
                <h3 className="h3">{t.name}</h3>
                <p className="card-strong">{t.fit}</p>
                <p>{t.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03"
            eyebrow="Deployment"
            title="On-premise, hosted or hybrid."
            lead="Every product runs in the environment that suits each type of data, with identical governance."
          />
          <div className="cards cards-3">
            {(
              [
                ['onprem', 'On-premise', 'Hardware inside your building for the most sensitive data.'],
                ['hosted', 'Hosted', 'Dedicated private GPU cloud with no hardware purchase.'],
                ['hybrid', 'Hybrid', 'Sensitive workloads on-site, everything else hosted.'],
              ] as const
            ).map(([v, name, detail]) => (
              <article key={v} className="card card-art" data-reveal>
                <DeploymentArt variant={v} />
                <h3 className="h3">{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Extended capabilities"
            title="More private AI, built on the same platform."
            lead="Available as add-ons or tailored projects for specific industry workflows."
          />
          <div className="cards cards-3">
            {EXTENDED.map((e) => (
              <article key={e.name} className="card" data-reveal>
                <span className="card-icon">
                  <Icon name={e.icon} />
                </span>
                <h3 className="h3">{e.name}</h3>
                <p>{e.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which system fits?" lead="Start with a consultation. We map your data, recommend the right system and size the hardware." />
    </>
  );
}
