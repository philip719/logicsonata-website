import type { HomeDict } from '../en/home';

export const home: HomeDict = {
  serviceSchemaName: 'Solusi AI privat',
  serviceSchemaType: 'Implementasi AI privat dan layanan terkelola',
  serviceSchemaDescription:
    'Solusi AI privat lengkap yang menggabungkan hardware, software, pengetahuan perusahaan, kontrol akses, implementasi, pelatihan dan dukungan berkelanjutan, diterapkan secara on-premise, hosted atau hybrid.',
  serviceCatalogName: 'Produk AI privat',
  hero: {
    eyebrow: 'AI Privat',
    title: 'AI privat,\ndibangun di dalam *lingkungan Anda.*',
    lead: 'Logic Sonata menghadirkan AI privat yang lengkap untuk bisnis di seluruh Asia Tenggara: hardware, software, pengetahuan perusahaan Anda, kontrol akses, implementasi, pelatihan dan dukungan berkelanjutan. Data Anda tidak pernah lepas dari kendali Anda.',
    secondary: 'Lihat stack lengkapnya',
    stats: [
      { value: '100%', label: 'Data tetap di bawah kendali Anda' },
      { value: '3', label: 'Model penerapan: on-premise, hosted, hybrid' },
      { value: '5', label: 'Pasar Asia Tenggara yang kami layani' },
    ],
    caption: 'Render ilustratif · tata letak internal disederhanakan',
    specsLabel: 'Keunggulan hardware',
    // TODO(redesign): translate the keys below (English placeholders for the mockup phase).
    scroll: 'Scroll to discover',
    partsLabel: 'Inside the appliance',
    parts: ['Aluminium chassis', 'Fan and vapor chamber', 'AI superchip', 'Slotted airflow grilles', 'Local NVMe storage'],
  },
  // TODO(redesign): translate.
  intro: {
    eyebrow: 'Introduction',
    statement:
      'Your teams already use AI every day. Logic Sonata brings it *inside your walls*: the hardware, the models, your company knowledge and the controls, running where your data already lives.',
  },
  story: {
    counter: 'Chapter',
    chapters: [
      {
        label: 'Silicon',
        title: 'Datacentre-class AI on one superchip.',
        text: 'CPU, GPU and AI engines share up to 128 GB of unified memory, so large language models run locally at full speed.',
      },
      {
        label: 'Appliance',
        title: 'Engineered as one quiet unit.',
        text: 'Fan and vapor-chamber cooling, local NVMe storage and high-speed networking in a compact aluminium chassis that fits any office.',
      },
      {
        label: 'Deployment',
        title: 'Racked in your server room.',
        text: 'Install it on-premise, run it hosted on private GPU capacity, or combine both. Start with one unit and scale to a cluster.',
      },
    ],
  },
  readout: {
    eyebrow: 'Readout',
    title: 'Private AI that answers to you.',
    items: [
      { value: '100*%*', label: 'Of prompts, files and answers stay under your control' },
      { value: '128 *GB*', label: 'Unified memory per appliance for large models' },
      { value: '3', label: 'Deployment models: on-premise, hosted and hybrid' },
      { value: '5', label: 'Southeast Asian markets with local delivery and support' },
    ],
  },
  marqueeLabel: 'Industri yang kami layani',
  marquee: ['Manufaktur', 'Ritel', 'Desain', 'Pemasok', 'Grup regional', 'Garmen & tekstil', 'Logistik', 'Teknik', 'Jasa profesional', 'Tim software'],
  problem: {
    eyebrow: 'Masalahnya',
    title: 'Tim Anda sudah menggunakan AI. Tahukah Anda data apa yang *terekspos?*',
    lead: 'Setiap hari karyawan menempelkan laporan produksi, email buyer dan lembar kalkulasi biaya ke tool AI publik, sering kali tanpa kebijakan dan tanpa ada yang tahu ke mana data itu berakhir. Ini bukan risiko di masa depan. Ini sedang terjadi sekarang, di setiap departemen.',
    exposure: [
      { icon: 'eye', text: 'Data buyer dan harga ditempelkan ke chatbot publik' },
      { icon: 'policy', text: 'File kalkulasi biaya, kontrak dan kepatuhan tanpa jejak audit' },
      { icon: 'lock', text: 'Tanpa kebijakan, tanpa visibilitas dan tanpa kendali atas aliran data' },
    ],
  },
  stack: {
    eyebrow: 'Solusinya',
    title: 'Satu mitra. Stack AI privat yang lengkap.',
    lead: 'Hardware dan software baru separuh pekerjaan. Kami menghadirkan setiap lapisan yang dibutuhkan agar AI privat benar-benar berjalan di bisnis nyata, dan kami bertanggung jawab atas semuanya.',
  },
  deployment: {
    eyebrow: 'Penerapan',
    title: 'Lingkungan AI yang tepat untuk data yang tepat.',
    lead: 'Setiap produk Logic Sonata dapat berjalan di salah satu dari tiga model penerapan, dengan tata kelola dan kendali yang sama.',
    items: [
      {
        variant: 'onprem',
        name: 'AI privat on-premise',
        line: 'AI yang berjalan di dalam gedung Anda.',
        detail: 'Untuk data buyer, data SDM, kontrak dan source code yang tidak boleh keluar dari perusahaan.',
      },
      {
        variant: 'hosted',
        name: 'AI privat hosted',
        line: 'AI privat tanpa membeli hardware.',
        detail: 'Kapasitas khusus di private GPU cloud terkelola. Pilot lebih cepat dan biaya awal lebih rendah.',
      },
      {
        variant: 'hybrid',
        name: 'AI privat hybrid',
        line: 'Lingkungan yang tepat untuk setiap jenis data.',
        detail: 'Kendali on-premise untuk data penting, skala hosted untuk sisanya.',
      },
    ],
  },
  products: {
    eyebrow: 'Produk',
    title: 'Lima sistem AI privat.\nSatu yang sesuai dengan data Anda.',
    aside: 'Setiap sistem tersedia on-premise, hosted atau hybrid, dikonfigurasi lengkap dengan pengetahuan dan aturan akses Anda.',
    ctaTitle: 'Belum yakin mana yang cocok?',
    ctaText: 'Sebagian besar pelanggan memulai dengan Asesmen Kesiapan. Kami memetakan data Anda dan merekomendasikan sistem yang tepat.',
    view: 'View', // TODO(redesign): translate
  },
  industries: {
    eyebrow: 'Siapa yang kami layani',
    title: 'Dirancang untuk bisnis yang tidak bisa mengirim datanya ke AI publik.',
    lead: 'Pelanggan utama kami adalah perusahaan manufaktur, ritel, desain, pemasok dan grup usaha regional. Pada praktiknya, setiap perusahaan yang menginginkan AI tanpa mengorbankan datanya adalah mitra yang cocok.',
  },
  process: {
    eyebrow: 'Proses',
    title: 'Dari percakapan pertama hingga operasional terkelola.',
  },
  markets: {
    eyebrow: 'Pasar',
    title: 'Melayani lima pasar di Asia Tenggara.',
    lead: 'Kami bekerja dengan bisnis di Singapura, Vietnam, Indonesia, Malaysia dan Thailand, dengan layanan implementasi, pelatihan dan dukungan terkelola di seluruh kawasan.',
    swipe: 'Drag or scroll', // TODO(redesign): translate
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Pertanyaan yang paling sering diajukan.',
  },
};
