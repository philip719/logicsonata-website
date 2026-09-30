import type { SolutionsDict } from '../en/solutions';

export const solutions: SolutionsDict = {
  meta: {
    title: 'Produk dan Hardware AI Privat',
    description:
      'Asisten pengetahuan privat, vision AI real-time, asisten coding, agen AI dan pembuatan gambar: on-premise, hosted atau hybrid, dengan hardware yang pas.',
  },
  breadcrumb: 'Solusi',
  listName: 'Produk AI privat Logic Sonata',
  hero: {
    eyebrow: 'Solusi',
    title: 'Sistem AI privat, *siap diterapkan.*',
    lead: 'Lima sistem AI siap produksi, masing-masing dilengkapi hardware, pengetahuan perusahaan Anda, kontrol akses, pelatihan dan dukungan yang dibutuhkan untuk menjalankannya secara privat.',
    secondary: 'Lihat hardware',
  },
  products: {
    eyebrow: 'Produk',
    title: 'Pilih sistem yang sesuai dengan data Anda.',
  },
  hardware: {
    eyebrow: 'Hardware',
    title: 'AI kelas pusat data yang muat di atas meja.',
    lead: 'Kami netral terhadap merek hardware. Bagi banyak tim, AI privat dimulai dengan workstation AI ringkas berbasis chip NVIDIA atau AMD, dan kami merekomendasikan platform yang sesuai dengan model, software dan anggaran Anda. Kami menyediakan, mengonfigurasi dan mendukungnya sebagai bagian dari solusi Anda.',
    imageAlt:
      'Tampilan terurai perangkat AI privat yang ringkas: sasis aluminium, panel aliran udara berlubang, pendingin kipas dan vapor chamber, superchip AI, unified memory, penyimpanan NVMe dan jaringan berkecepatan tinggi',
    specHeader: 'Spesifikasi',
    platforms: [
      ['Prosesor', 'Superchip GB10 Grace Blackwell: CPU Arm 20 inti dengan GPU Blackwell', 'Ryzen AI Max+ 395: CPU Zen 5 16 inti, GPU Radeon 8060S, NPU XDNA 2'],
      ['Unified memory', '128 GB', 'Hingga 128 GB, dengan hingga 96 GB dapat dialokasikan ke GPU'],
      ['Performa AI', 'Hingga 1 petaFLOP (FP4)', 'NPU 50+ TOPS ditambah GPU 40 inti'],
      ['Jaringan', 'ConnectX-7 200 Gb/s, dua unit dapat dihubungkan untuk model yang lebih besar', 'Bergantung pada produsen sistem'],
      ['Paling cocok untuk', 'Ekosistem software CUDA dan model lokal terbesar', 'Kompatibilitas x86 dan inferensi lokal yang hemat biaya'],
    ],
    finePrint:
      'Render ilustratif perangkat generik dengan tata letak internal yang disederhanakan. Spesifikasi mengacu pada angka resmi yang dipublikasikan masing-masing produsen. NVIDIA dan DGX Spark adalah merek dagang NVIDIA Corporation. AMD dan Ryzen adalah merek dagang Advanced Micro Devices, Inc.',
    tiers: [
      {
        name: 'Workstation AI ringkas',
        fit: 'Pilot dan tim yang lebih kecil',
        detail: 'Unit desktop seperti NVIDIA DGX Spark atau sistem AMD Ryzen AI Max+. Dirancang untuk kantor, cukup bertenaga untuk model yang serius.',
        icon: 'chip',
      },
      {
        name: 'Server GPU',
        fit: 'Penerapan di tingkat departemen hingga seluruh perusahaan',
        detail: 'Server multi-GPU rack-mount di ruang server atau pusat data Anda untuk jumlah pengguna bersamaan yang lebih tinggi.',
        icon: 'layers',
      },
      {
        name: 'Private cloud terkelola',
        fit: 'Tanpa membeli hardware',
        detail: 'Kapasitas GPU khusus di lingkungan privat terkelola, terisolasi dari layanan AI publik.',
        icon: 'cloud',
      },
    ],
  },
  deployment: {
    eyebrow: 'Penerapan',
    title: 'On-premise, hosted atau hybrid.',
    lead: 'Setiap produk berjalan di lingkungan yang sesuai untuk setiap jenis data, dengan tata kelola yang sama.',
    items: [
      { variant: 'onprem', name: 'On-premise', detail: 'Hardware di dalam gedung Anda untuk data yang paling sensitif.' },
      { variant: 'hosted', name: 'Hosted', detail: 'Private GPU cloud khusus tanpa perlu membeli hardware.' },
      { variant: 'hybrid', name: 'Hybrid', detail: 'Beban kerja sensitif on-premise, sisanya hosted.' },
    ],
  },
  extended: {
    eyebrow: 'Kemampuan tambahan',
    title: 'Lebih banyak AI privat, di platform yang sama.',
    lead: 'Tersedia sebagai add-on atau proyek khusus untuk alur kerja industri tertentu.',
    items: [
      { name: 'Penerjemahan Privat', detail: 'Penerjemahan multibahasa untuk dokumen, komunikasi dan konten teknis.', icon: 'translate' },
      { name: 'AI Dokumen Privat', detail: 'Ekstraksi data dari invoice, formulir, sertifikat dan dokumen hasil pindaian ke sistem Anda.', icon: 'policy' },
      { name: 'AI Suara Privat', detail: 'Pengenalan suara, transkripsi dan asisten suara internal.', icon: 'wave' },
    ],
  },
  ctaTitle: 'Belum yakin sistem mana yang cocok?',
  ctaLead: 'Mulailah dengan konsultasi. Kami memetakan data Anda, merekomendasikan sistem yang tepat dan menentukan spesifikasi hardware.',
};
