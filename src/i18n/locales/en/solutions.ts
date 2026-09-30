import type { IconName } from '@/lib/site';

export const solutions = {
  meta: {
    title: 'Private AI Products and Hardware',
    description:
      'Private knowledge assistants, live vision AI, coding assistants, AI agents and image generation, deployed on-premise, hosted or hybrid on hardware sized to your business.',
  },
  breadcrumb: 'Solutions',
  listName: 'Logic Sonata private AI products',
  hero: {
    eyebrow: 'Solutions',
    title: 'Private AI systems, *ready to deploy.*',
    lead: 'Five production-ready AI systems, each delivered with the hardware, your company knowledge, access controls, training and support needed to run it privately.',
    secondary: 'View the hardware',
  },
  products: {
    eyebrow: 'Products',
    title: 'Choose the system that fits your data.',
  },
  hardware: {
    eyebrow: 'Hardware',
    title: 'Data-centre AI that fits on a desk.',
    lead: 'We are hardware-neutral. For many teams, private AI starts with a compact AI workstation on NVIDIA or AMD silicon, and we recommend the platform that fits your models, software and budget. We supply, configure and support it as part of your solution.',
    imageAlt:
      'Exploded view of a compact private AI appliance: aluminium chassis, perforated airflow panels, fan and vapor-chamber cooling, AI superchip, unified memory, NVMe storage and high-speed networking',
    specHeader: 'Specification',
    // Rows: [label, NVIDIA DGX Spark, AMD Ryzen AI Max+], from each manufacturer's published figures.
    platforms: [
      ['Processor', 'GB10 Grace Blackwell superchip: 20-core Arm CPU with Blackwell GPU', 'Ryzen AI Max+ 395: 16-core Zen 5 CPU, Radeon 8060S GPU, XDNA 2 NPU'],
      ['Unified memory', '128 GB', 'Up to 128 GB, with up to 96 GB assignable to the GPU'],
      ['AI performance', 'Up to 1 petaFLOP (FP4)', '50+ TOPS NPU plus a 40-core GPU'],
      ['Networking', 'ConnectX-7 at 200 Gb/s, link two units for larger models', 'Varies by system manufacturer'],
      ['Best fit', 'CUDA software ecosystem and the largest local models', 'x86 compatibility and cost-efficient local inference'],
    ] as Array<[string, string, string]>,
    finePrint:
      'Illustrative render of a generic appliance with a simplified internal layout. Specifications are each manufacturer’s published figures. NVIDIA and DGX Spark are trademarks of NVIDIA Corporation. AMD and Ryzen are trademarks of Advanced Micro Devices, Inc.',
    tiers: [
      {
        name: 'Compact AI workstation',
        fit: 'Pilots and smaller teams',
        detail: 'A desktop unit such as NVIDIA DGX Spark or an AMD Ryzen AI Max+ system. Designed for the office, powerful enough for serious models.',
        icon: 'chip',
      },
      {
        name: 'GPU server',
        fit: 'Department and company-wide rollouts',
        detail: 'Rack-mounted multi-GPU servers in your server room or data centre for higher concurrency.',
        icon: 'layers',
      },
      {
        name: 'Managed private cloud',
        fit: 'No hardware purchase',
        detail: 'Dedicated GPU capacity in a managed private environment, isolated from public AI services.',
        icon: 'cloud',
      },
    ] as Array<{ name: string; fit: string; detail: string; icon: IconName }>,
  },
  deployment: {
    eyebrow: 'Deployment',
    title: 'On-premise, hosted or hybrid.',
    lead: 'Every product runs in the environment that suits each type of data, with identical governance.',
    items: [
      { variant: 'onprem', name: 'On-premise', detail: 'Hardware inside your building for the most sensitive data.' },
      { variant: 'hosted', name: 'Hosted', detail: 'Dedicated private GPU cloud with no hardware purchase.' },
      { variant: 'hybrid', name: 'Hybrid', detail: 'Sensitive workloads on-site, everything else hosted.' },
    ] as Array<{ variant: 'onprem' | 'hosted' | 'hybrid'; name: string; detail: string }>,
  },
  extended: {
    eyebrow: 'Extended capabilities',
    title: 'More private AI, built on the same platform.',
    lead: 'Available as add-ons or tailored projects for specific industry workflows.',
    items: [
      { name: 'Private Translation', detail: 'Multilingual translation for documents, communications and technical content.', icon: 'translate' },
      { name: 'Private Document AI', detail: 'Extraction from invoices, forms, certificates and scanned documents into your systems.', icon: 'policy' },
      { name: 'Private Voice AI', detail: 'Speech recognition, transcription and internal voice assistants.', icon: 'wave' },
    ] as Array<{ name: string; detail: string; icon: IconName }>,
  },
  ctaTitle: 'Not sure which system fits?',
  ctaLead: 'Start with a consultation. We map your data, recommend the right system and size the hardware.',
};

export type SolutionsDict = typeof solutions;
