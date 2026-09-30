import type { ServicesDict } from '../en/services';

export const services: ServicesDict = {
  meta: {
    title: 'Perkhidmatan, Latihan dan Sokongan AI Peribadi',
    description:
      'Penilaian kesediaan AI, projek perintis, pangkalan pengetahuan, tadbir urus AI, latihan kakitangan dan sokongan terurus untuk syarikat di Asia Tenggara.',
  },
  breadcrumb: 'Perkhidmatan',
  catalogName: 'Peringkat sokongan AI peribadi terurus',
  offerName: 'Sokongan {name}',
  hero: {
    eyebrow: 'Perkhidmatan',
    title: 'Perkakasan dan perisian hanyalah *separuh daripada tugasnya.*',
    lead: 'Kebanyakan syarikat tidak tahu cara memilih model, membersihkan dokumen, melatih kakitangan atau mentadbir urus penggunaan AI. Itulah tepatnya yang kami lakukan, daripada penilaian pertama hingga sokongan terurus jangka panjang.',
    cta: 'Mulakan dengan penilaian',
  },
  deliver: {
    eyebrow: 'Apa yang kami sediakan',
    title: 'Enam perkhidmatan. Satu rakan kongsi yang bertanggungjawab.',
    items: [
      {
        name: 'Penilaian Privasi & Kesediaan AI',
        detail: 'Petakan risiko AI anda, kenal pasti kes penggunaan peribadi terbaik dan dapatkan pelan hala tuju 30/60/90 hari. Langkah pertama yang paling mudah.',
        icon: 'search',
      },
      {
        name: 'Pelaksanaan Projek Perintis AI Peribadi',
        detail: 'Satu kes penggunaan yang berfungsi, ditempatkan dan dibuktikan bersama pengguna sebenar, sebelum anda komited kepada pelancaran penuh.',
        icon: 'flask',
      },
      {
        name: 'Penyediaan Data & Pangkalan Pengetahuan',
        detail: 'Fail yang berselerak diubah menjadi pangkalan pengetahuan peribadi yang kemas, berasaskan kebenaran akses dan telah diuji. Di sinilah kebanyakan projek AI gagal, tetapi tidak bagi kami.',
        icon: 'database',
      },
      {
        name: 'Tadbir Urus & Dasar AI',
        detail: 'Dasar penggunaan, senarai alat yang diluluskan dan peraturan akses berasaskan peranan, supaya pasukan anda boleh menggunakan AI dengan selamat sejak hari pertama.',
        icon: 'policy',
      },
      {
        name: 'Latihan & Penerimaan AI',
        detail: 'Bengkel mengikut peranan untuk pengurus, sumber manusia, jualan, operasi dan kewangan. Perkakasan tidak mewujudkan penerimaan. Latihan yang melakukannya.',
        icon: 'users',
      },
      {
        name: 'Sokongan AI Peribadi Terurus',
        detail: 'Pemantauan, kemas kini model, penyegaran pangkalan pengetahuan dan semakan suku tahunan yang memastikan setiap penempatan kekal sihat.',
        icon: 'support',
      },
    ],
  },
  support: {
    eyebrow: 'Sokongan terurus',
    title: 'Kebolehpercayaan jangka panjang, bukan meja bantuan sekali guna.',
    lead: 'Setiap penempatan diteruskan ke salah satu daripada empat peringkat sokongan terurus, disesuaikan dengan bilangan pengguna dan tahap kritikal sistem.',
    badge: 'PALING POPULAR',
    response: 'Masa respons',
    tiers: [
      { name: 'Asas', users: '10 hingga 30 pengguna', response: 'Hari bekerja berikutnya', detail: 'Pemeriksaan kesihatan bulanan, penalaan gesaan kecil dan penyegaran pangkalan pengetahuan.', featured: false },
      { name: 'Perniagaan', users: '30 hingga 150 pengguna', response: 'Hari bekerja yang sama', detail: 'Sokongan keutamaan, pemeriksaan mingguan dan semakan perniagaan suku tahunan.', featured: false },
      { name: 'Enterprise', users: '150+ pengguna', response: '4 hingga 8 jam (segera)', detail: 'Pengurus sokongan khusus, penyelarasan tampalan keselamatan dan laporan tadbir urus.', featured: true },
      { name: 'Premium', users: 'Kritikal misi', response: 'SLA tersuai', detail: 'Ketua teknikal khusus, pilihan sokongan di lokasi dan jawatankuasa pemandu bulanan.', featured: false },
    ],
  },
  process: {
    eyebrow: 'Proses',
    title: 'Daripada perbualan pertama hingga operasi terurus.',
  },
};
