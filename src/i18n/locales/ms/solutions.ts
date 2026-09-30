import type { SolutionsDict } from '../en/solutions';

export const solutions: SolutionsDict = {
  meta: {
    title: 'Produk dan Perkakasan AI Peribadi',
    description:
      'Pembantu pengetahuan, AI visual langsung, pembantu pengekodan, ejen AI dan penjanaan imej, secara on-premise, dihoskan atau hibrid pada perkakasan yang sesuai.',
  },
  breadcrumb: 'Penyelesaian',
  listName: 'Produk AI peribadi Logic Sonata',
  hero: {
    eyebrow: 'Penyelesaian',
    title: 'Sistem AI peribadi, *sedia untuk ditempatkan.*',
    lead: 'Lima sistem AI sedia produksi, setiap satunya disertakan dengan perkakasan, pengetahuan syarikat anda, kawalan akses, latihan dan sokongan yang diperlukan untuk menjalankannya secara peribadi.',
    secondary: 'Lihat perkakasan',
  },
  products: {
    eyebrow: 'Produk',
    title: 'Pilih sistem yang sesuai dengan data anda.',
  },
  hardware: {
    eyebrow: 'Perkakasan',
    title: 'AI setaraf pusat data yang muat di atas meja.',
    lead: 'Kami tidak terikat kepada mana-mana jenama perkakasan. Bagi banyak pasukan, AI peribadi bermula dengan stesen kerja AI yang padat berasaskan cip NVIDIA atau AMD, dan kami mengesyorkan platform yang sesuai dengan model, perisian dan bajet anda. Kami membekal, mengkonfigurasi dan menyokongnya sebagai sebahagian daripada penyelesaian anda.',
    imageAlt:
      'Paparan terurai peranti AI peribadi yang padat: casis aluminium, panel aliran udara berlubang, penyejukan kipas dan ruang wap, cip super AI, memori bersatu, storan NVMe dan rangkaian berkelajuan tinggi',
    specHeader: 'Spesifikasi',
    platforms: [
      ['Pemproses', 'Cip super GB10 Grace Blackwell: CPU Arm 20 teras dengan GPU Blackwell', 'Ryzen AI Max+ 395: CPU Zen 5 16 teras, GPU Radeon 8060S, NPU XDNA 2'],
      ['Memori bersatu', '128 GB', 'Sehingga 128 GB, dengan sehingga 96 GB boleh diperuntukkan kepada GPU'],
      ['Prestasi AI', 'Sehingga 1 petaFLOP (FP4)', 'NPU 50+ TOPS serta GPU 40 teras'],
      ['Rangkaian', 'ConnectX-7 pada 200 Gb/s, sambungkan dua unit untuk model yang lebih besar', 'Bergantung pada pengeluar sistem'],
      ['Paling sesuai untuk', 'Ekosistem perisian CUDA dan model setempat yang terbesar', 'Keserasian x86 dan inferens setempat yang menjimatkan kos'],
    ],
    finePrint:
      'Imej ilustrasi peranti generik dengan susun atur dalaman yang dipermudahkan. Spesifikasi adalah angka yang diterbitkan oleh setiap pengeluar. NVIDIA dan DGX Spark ialah tanda dagangan NVIDIA Corporation. AMD dan Ryzen ialah tanda dagangan Advanced Micro Devices, Inc.',
    tiers: [
      {
        name: 'Stesen kerja AI padat',
        fit: 'Projek perintis dan pasukan kecil',
        detail: 'Unit meja seperti NVIDIA DGX Spark atau sistem AMD Ryzen AI Max+. Direka untuk pejabat, cukup berkuasa untuk model yang serius.',
        icon: 'chip',
      },
      {
        name: 'Pelayan GPU',
        fit: 'Pelancaran peringkat jabatan dan seluruh syarikat',
        detail: 'Pelayan berbilang GPU jenis rak di bilik pelayan atau pusat data anda untuk menampung lebih ramai pengguna serentak.',
        icon: 'layers',
      },
      {
        name: 'Cloud peribadi terurus',
        fit: 'Tanpa membeli perkakasan',
        detail: 'Kapasiti GPU khusus dalam persekitaran peribadi terurus, terasing daripada perkhidmatan AI awam.',
        icon: 'cloud',
      },
    ],
  },
  deployment: {
    eyebrow: 'Penempatan',
    title: 'On-premise, dihoskan atau hibrid.',
    lead: 'Setiap produk berjalan dalam persekitaran yang sesuai dengan setiap jenis data, dengan tadbir urus yang sama.',
    items: [
      { variant: 'onprem', name: 'On-premise', detail: 'Perkakasan di dalam bangunan anda untuk data yang paling sensitif.' },
      { variant: 'hosted', name: 'Dihoskan', detail: 'Cloud GPU peribadi khusus tanpa perlu membeli perkakasan.' },
      { variant: 'hybrid', name: 'Hibrid', detail: 'Beban kerja sensitif di lokasi, selebihnya dihoskan.' },
    ],
  },
  extended: {
    eyebrow: 'Keupayaan tambahan',
    title: 'Lebih banyak AI peribadi, dibina pada platform yang sama.',
    lead: 'Tersedia sebagai modul tambahan atau projek khusus untuk aliran kerja industri tertentu.',
    items: [
      { name: 'Terjemahan Peribadi', detail: 'Terjemahan pelbagai bahasa untuk dokumen, komunikasi dan kandungan teknikal.', icon: 'translate' },
      { name: 'AI Dokumen Peribadi', detail: 'Pengekstrakan data daripada invois, borang, sijil dan dokumen imbasan terus ke dalam sistem anda.', icon: 'policy' },
      { name: 'AI Suara Peribadi', detail: 'Pengecaman pertuturan, transkripsi dan pembantu suara dalaman.', icon: 'wave' },
    ],
  },
  ctaTitle: 'Tidak pasti sistem mana yang sesuai?',
  ctaLead: 'Mulakan dengan konsultasi. Kami memetakan data anda, mengesyorkan sistem yang tepat dan menentukan saiz perkakasan.',
};
