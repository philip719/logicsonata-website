import type { Metadata } from 'next';
import Link from 'next/link';
import { DeploymentArt } from '@/components/graphics/DeploymentArt';
import { Icon } from '@/components/Icon';
import { breadcrumbs, JsonLd } from '@/components/JsonLd';
import { Corners, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { PRODUCTS, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Private AI Products and Hardware',
  description:
    'Private knowledge assistants, live vision AI, coding assistants, AI agents and image generation, deployed on-premise, hosted or hybrid on hardware sized to your business.',
  alternates: { canonical: '/solutions' },
  openGraph: { url: '/solutions' },
};

// Two compact platforms we deploy, from each manufacturer's published figures.
const PLATFORMS: Array<[string, string, string]> = [
  ['Processor', 'GB10 Grace Blackwell superchip: 20-core Arm CPU with Blackwell GPU', 'Ryzen AI Max+ 395: 16-core Zen 5 CPU, Radeon 8060S GPU, XDNA 2 NPU'],
  ['Unified memory', '128 GB', 'Up to 128 GB, with up to 96 GB assignable to the GPU'],
  ['AI performance', 'Up to 1 petaFLOP (FP4)', '50+ TOPS NPU plus a 40-core GPU'],
  ['Networking', 'ConnectX-7 at 200 Gb/s, link two units for larger models', 'Varies by system manufacturer'],
  ['Best fit', 'CUDA software ecosystem and the largest local models', 'x86 compatibility and cost-efficient local inference'],
];

const TIERS = [
  {
    name: 'Compact AI workstation',
    fit: 'Pilots and smaller teams',
    detail: 'A desktop unit such as NVIDIA DGX Spark or an AMD Ryzen AI Max+ system. Designed for the office, powerful enough for serious models.',
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
  { name: 'Private Document AI', detail: 'Extraction from invoices, forms, certificates and scanned documents into your systems.', icon: 'policy' as const },
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
              url: `${SITE.url}/solutions/${p.id}`,
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
                <Link href={`/solutions/${p.id}`} className="product-thumb" tabIndex={-1} aria-hidden="true">
                  <img src={p.visuals.ui.src} alt="" width={p.visuals.ui.width} height={p.visuals.ui.height} loading="lazy" />
                </Link>
                <div className="product-body">
                  <span className="mono card-code">{p.code}</span>
                  <h2>
                    <Link href={`/solutions/${p.id}`} className="card-title-link">
                      {p.name}
                    </Link>
                  </h2>
                  <p className="product-tagline">{p.tagline}</p>
                  <p>{p.summary}</p>
                  <ul className="check-list">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={16} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="btn-row">
                    <Link href={`/solutions/${p.id}`} className="btn btn-primary btn-sm">
                      Explore {p.code}
                      <Icon name="arrow" size={15} />
                    </Link>
                    <Link href={`/whitepapers/${p.id}`} className="btn btn-ghost btn-sm">
                      <Icon name="book" size={15} />
                      Download whitepaper
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="hardware">
        <div className="container">
          <div className="hardware">
            <div className="panel panel-graphic panel-photo" data-reveal>
              <Corners />
              <img
                src="/images/hero-appliance-exploded.webp"
                width={1200}
                height={900}
                loading="lazy"
                alt="Exploded view of a compact private AI appliance: aluminium chassis, perforated airflow panels, fan and vapor-chamber cooling, AI superchip, unified memory, NVMe storage and high-speed networking"
              />
            </div>
            <div data-reveal>
              <SectionHead
                index="02"
                eyebrow="Hardware"
                title="Data-centre AI that fits on a desk."
                lead="We are hardware-neutral. For many teams, private AI starts with a compact AI workstation on NVIDIA or AMD silicon, and we recommend the platform that fits your models, software and budget. We supply, configure and support it as part of your solution."
              />
              <div className="table-scroll">
                <table className="spec-table compare-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className="visually-hidden">Specification</span>
                      </th>
                      <th scope="col">NVIDIA DGX Spark</th>
                      <th scope="col">AMD Ryzen AI Max+</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORMS.map(([k, nvidia, amd]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td>{nvidia}</td>
                        <td>{amd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fine-print">
                Illustrative render of a generic appliance with a simplified internal layout. Specifications are each
                manufacturer’s published figures. NVIDIA and DGX Spark are trademarks of NVIDIA Corporation. AMD and
                Ryzen are trademarks of Advanced Micro Devices, Inc.
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
