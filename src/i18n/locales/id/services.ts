import type { ServicesDict } from '../en/services';

export const services: ServicesDict = {
  meta: {
    title: 'Layanan AI Privat, Pelatihan dan Dukungan Terkelola',
    description:
      'Asesmen kesiapan AI, implementasi pilot, penyiapan basis pengetahuan, tata kelola AI, pelatihan karyawan dan dukungan AI privat terkelola di Asia Tenggara.',
  },
  breadcrumb: 'Layanan',
  catalogName: 'Paket dukungan AI privat terkelola',
  offerName: 'Dukungan {name}',
  hero: {
    eyebrow: 'Layanan',
    title: 'Hardware dan software baru *separuh pekerjaan.*',
    lead: 'Sebagian besar perusahaan tidak tahu cara memilih model, merapikan dokumen, melatih karyawan atau mengatur penggunaan AI. Itulah yang kami kerjakan, mulai dari asesmen pertama hingga dukungan terkelola jangka panjang.',
    cta: 'Mulai dengan asesmen',
  },
  deliver: {
    eyebrow: 'Apa yang kami berikan',
    title: 'Enam layanan. Satu mitra yang bertanggung jawab.',
    items: [
      {
        name: 'Asesmen Privasi & Kesiapan AI',
        detail: 'Petakan risiko AI Anda, temukan use case privat terbaik dan dapatkan roadmap 30/60/90 hari. Langkah pertama yang paling mudah.',
        icon: 'search',
      },
      {
        name: 'Implementasi Pilot AI Privat',
        detail: 'Satu use case yang berfungsi, diterapkan dan terbukti bersama pengguna nyata, sebelum Anda berkomitmen pada penerapan penuh.',
        icon: 'flask',
      },
      {
        name: 'Penyiapan Data & Basis Pengetahuan',
        detail: 'File yang berantakan menjadi basis pengetahuan privat yang rapi, teruji dan memiliki hak akses yang jelas. Di sinilah sebagian besar proyek AI gagal, dan di sinilah kami berhasil.',
        icon: 'database',
      },
      {
        name: 'Tata Kelola & Kebijakan AI',
        detail: 'Kebijakan penggunaan, daftar tool yang disetujui dan aturan akses berbasis peran, sehingga tim Anda dapat menggunakan AI dengan aman sejak hari pertama.',
        icon: 'policy',
      },
      {
        name: 'Pelatihan & Adopsi AI',
        detail: 'Workshop berbasis peran untuk manajer, HR, sales, operasional dan keuangan. Hardware tidak menciptakan adopsi. Pelatihanlah yang melakukannya.',
        icon: 'users',
      },
      {
        name: 'Dukungan AI Privat Terkelola',
        detail: 'Pemantauan, pembaruan model, penyegaran basis pengetahuan dan tinjauan kuartalan yang menjaga setiap penerapan tetap sehat.',
        icon: 'support',
      },
    ],
  },
  support: {
    eyebrow: 'Dukungan terkelola',
    title: 'Keandalan jangka panjang, bukan helpdesk sekali pakai.',
    lead: 'Setiap penerapan berlanjut ke salah satu dari empat paket dukungan terkelola, disesuaikan dengan jumlah pengguna dan tingkat kekritisan sistem.',
    badge: 'PALING BANYAK DIPILIH',
    response: 'Respons',
    tiers: [
      { name: 'Basic', users: '10 hingga 30 pengguna', response: 'Hari kerja berikutnya', detail: 'Pemeriksaan kesehatan sistem bulanan, penyesuaian prompt ringan dan penyegaran basis pengetahuan.', featured: false },
      { name: 'Business', users: '30 hingga 150 pengguna', response: 'Di hari kerja yang sama', detail: 'Dukungan prioritas, pemeriksaan mingguan dan tinjauan bisnis kuartalan.', featured: false },
      { name: 'Enterprise', users: '150+ pengguna', response: '4 hingga 8 jam untuk kasus mendesak', detail: 'Manajer dukungan khusus, koordinasi patch keamanan dan pelaporan tata kelola.', featured: true },
      { name: 'Premium', users: 'Sistem mission-critical', response: 'SLA khusus', detail: 'Technical lead khusus, opsi dukungan di lokasi dan steering committee bulanan.', featured: false },
    ],
  },
  process: {
    eyebrow: 'Proses',
    title: 'Dari percakapan pertama hingga operasional terkelola.',
  },
};
