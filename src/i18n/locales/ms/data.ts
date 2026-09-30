import type { DataDict } from '../en/data';

// Kandungan perniagaan bersama yang digunakan di beberapa halaman.

export const data: DataDict = {
  description:
    'Logic Sonata menyediakan AI peribadi yang selamat untuk syarikat di Singapura, Vietnam, Indonesia, Malaysia dan Thailand: perkakasan, perisian, pengetahuan syarikat, kawalan akses, pelaksanaan, latihan dan sokongan berterusan.',
  hardwareSpecs: [
    'Cip super AI: CPU, GPU dan NPU',
    'Memori bersatu sehingga 128 GB',
    'Model bahasa besar berjalan secara setempat',
    'Storan NVMe setempat',
    'Penyejukan kipas dan ruang wap',
    'Boleh diskala daripada satu unit hingga kluster',
  ],
  // Kod dan susunan mesti kekal sama dalam setiap bahasa.
  markets: [
    { code: 'SG', name: 'Singapura', city: 'Singapura' },
    { code: 'VN', name: 'Vietnam', city: 'Bandar Raya Ho Chi Minh' },
    { code: 'ID', name: 'Indonesia', city: 'Jakarta' },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur' },
    { code: 'TH', name: 'Thailand', city: 'Bangkok' },
  ],
  stack: [
    {
      name: 'Perkakasan',
      detail: 'Superkomputer AI yang padat, pelayan GPU atau cloud GPU peribadi terurus, disaizkan mengikut beban kerja anda.',
      icon: 'chip',
    },
    {
      name: 'Perisian & model',
      detail: 'Perisian AI terbuka yang tidak terikat kepada mana-mana model, jadi anda tidak pernah bergantung pada satu pembekal sahaja.',
      icon: 'layers',
    },
    {
      name: 'Pengetahuan syarikat',
      detail: 'Dokumen, SOP dan data anda diubah menjadi pangkalan pengetahuan yang kemas dan berasaskan kebenaran akses.',
      icon: 'database',
    },
    {
      name: 'Kawalan akses',
      detail: 'Kebenaran berasaskan peranan, log masuk tunggal (SSO) dan jejak audit lengkap bagi setiap pertanyaan.',
      icon: 'key',
    },
    {
      name: 'Pelaksanaan',
      detail: 'Seni bina, integrasi dengan sistem anda dan projek perintis yang membuktikan nilainya terlebih dahulu.',
      icon: 'rocket',
    },
    {
      name: 'Latihan',
      detail: 'Bengkel mengikut peranan yang menjadikan AI yang dipasang sebagai amalan harian dalam setiap pasukan.',
      icon: 'users',
    },
    {
      name: 'Sokongan berterusan',
      detail: 'Pemantauan, kemas kini model, penyegaran pengetahuan dan semakan perniagaan setiap suku tahun.',
      icon: 'support',
    },
  ],
  industries: [
    {
      name: 'Pengilang',
      detail: 'SOP, laporan kualiti dan kepakaran pengeluaran dijawab serta-merta di lantai kilang.',
      icon: 'factory',
    },
    {
      name: 'Peruncit',
      detail: 'Pengetahuan produk, fail harga dan draf khidmat pelanggan kekal di dalam syarikat anda.',
      icon: 'store',
    },
    {
      name: 'Syarikat reka bentuk',
      detail: 'Jana dan perhalusi konsep secara peribadi, supaya reka bentuk anda tidak pernah melatih model awam.',
      icon: 'pen',
    },
    {
      name: 'Pembekal',
      detail: 'RFQ, pengiraan kos dan komunikasi dengan pembeli yang lebih pantas tanpa mendedahkan margin atau data pembeli.',
      icon: 'truck',
    },
    {
      name: 'Syarikat serantau',
      detail: 'Satu lapisan pengetahuan peribadi merentasi anak syarikat, bahasa dan sempadan negara.',
      icon: 'network',
    },
    {
      name: 'Mana-mana syarikat yang mementingkan privasi',
      detail: 'Jika anda mahukan produktiviti AI tanpa menyerahkan data anda, kami pilihan yang tepat.',
      icon: 'shield',
    },
  ],
  process: [
    { step: 'Nilai', detail: 'Semak penggunaan AI, pendedahan data dan kes penggunaan peribadi yang paling sesuai.' },
    { step: 'Rintis', detail: 'Wujudkan satu kes penggunaan yang berfungsi dan buktikan nilainya bersama pengguna sebenar.' },
    { step: 'Luaskan', detail: 'Kembangkan ke seluruh jabatan dengan tadbir urus, latihan dan kawalan akses.' },
    { step: 'Urus', detail: 'Pastikan ia terus ditadbir, disokong dan ditambah baik, suku demi suku tahun.' },
  ],
  faq: [
    {
      q: 'Apakah itu AI peribadi?',
      a: 'AI peribadi menjalankan model AI generatif dalam persekitaran yang dikawal oleh syarikat anda: pada perkakasan anda sendiri, dalam cloud peribadi atau dalam susunan hibrid. Dokumen dan data anda tidak pernah dihantar ke perkhidmatan AI awam dan tidak pernah digunakan untuk melatih model pihak lain.',
    },
    {
      q: 'Apakah bezanya Logic Sonata dengan menggunakan ChatGPT di tempat kerja?',
      a: 'Alat AI awam memproses gesaan anda pada infrastruktur yang bukan di bawah kawalan anda. Logic Sonata memasang model, pangkalan pengetahuan dan kawalan akses di dalam persekitaran anda, jadi data pembeli, fail kos, kontrak dan kod sumber kekal di bawah tadbir urus anda dengan jejak audit yang lengkap.',
    },
    {
      q: 'Apakah yang terkandung dalam penyelesaian AI peribadi Logic Sonata?',
      a: 'Segala yang diperlukan untuk menjalankan AI secara peribadi: perkakasan, perisian dan model, pengetahuan syarikat anda yang disediakan sebagai pangkalan pengetahuan yang selamat, kawalan akses, pelaksanaan, latihan kakitangan dan sokongan terurus berterusan. Satu rakan kongsi bertanggungjawab ke atas keseluruhan tindanan.',
    },
    {
      q: 'Perlukah kami membeli perkakasan GPU?',
      a: 'Tidak. Setiap produk tersedia dalam tiga model penempatan: dihoskan pada cloud GPU peribadi terurus tanpa perlu membeli perkakasan, on-premise pada perkakasan khusus di dalam bangunan anda, atau hibrid, dengan on-premise untuk data sensitif dan dihoskan untuk selebihnya.',
    },
    {
      q: 'Perkakasan apakah yang anda pasang secara on-premise?',
      a: 'Kami tidak terikat kepada mana-mana jenama perkakasan dan menyaizkan platform mengikut beban kerja anda. Pasukan yang lebih kecil biasanya bermula dengan stesen kerja AI yang padat seperti NVIDIA DGX Spark atau sistem AMD Ryzen AI Max+, kedua-duanya menawarkan memori bersatu sehingga 128 GB dalam unit sebesar komputer meja. Pelancaran yang lebih besar menggunakan pelayan berbilang GPU atau kluster cloud peribadi.',
    },
    {
      q: 'Negara manakah yang anda layani?',
      a: 'Logic Sonata berkhidmat kepada syarikat di Singapura, Vietnam, Indonesia, Malaysia dan Thailand, dengan penghantaran dan sokongan di seluruh Asia Tenggara.',
    },
    {
      q: 'Industri apakah yang anda layani?',
      a: 'Pengilang, peruncit, syarikat reka bentuk, pembekal dan kumpulan perniagaan serantau ialah pelanggan teras kami. Pada praktiknya, mana-mana syarikat yang ingin menggunakan AI sambil memastikan datanya kekal peribadi adalah padanan yang baik.',
    },
    {
      q: 'Berapa lamakah projek perintis AI peribadi mengambil masa?',
      a: 'Kebanyakan pelanggan bermula dengan Penilaian Privasi dan Kesediaan AI, yang menghasilkan pelan hala tuju 30/60/90 hari. Projek perintis kemudiannya merangkumi satu kes penggunaan yang berfungsi, supaya anda membuktikan nilainya bersama pengguna sebenar sebelum komited kepada pelancaran penuh.',
    },
    {
      q: 'Bagaimanakah sokongan berterusan berfungsi?',
      a: 'Setiap penempatan beralih ke peringkat sokongan terurus yang disesuaikan dengan bilangan pengguna dan tahap kritikal sistem, daripada pemeriksaan kesihatan bulanan hingga ketua teknikal khusus dengan tahap perkhidmatan tersuai. Kami mengesyorkan peringkat yang sesuai semasa penilaian.',
    },
  ],
};
