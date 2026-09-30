import type { DataDict } from '../en/data';

export const data: DataDict = {
  description:
    'Logic Sonata menghadirkan AI privat yang aman untuk bisnis di Singapura, Vietnam, Indonesia, Malaysia dan Thailand: hardware, software, pengetahuan perusahaan, kontrol akses, implementasi, pelatihan dan dukungan berkelanjutan.',
  hardwareSpecs: [
    'Superchip AI: CPU, GPU dan NPU',
    'Unified memory hingga 128 GB',
    'Large language model berjalan secara lokal',
    'Penyimpanan NVMe lokal',
    'Pendingin kipas dan vapor chamber',
    'Dapat ditingkatkan dari satu unit hingga cluster',
  ],
  markets: [
    { code: 'SG', name: 'Singapura', city: 'Singapura' },
    { code: 'VN', name: 'Vietnam', city: 'Kota Ho Chi Minh' },
    { code: 'ID', name: 'Indonesia', city: 'Jakarta' },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur' },
    { code: 'TH', name: 'Thailand', city: 'Bangkok' },
  ],
  stack: [
    {
      name: 'Hardware',
      detail: 'Superkomputer AI ringkas, server GPU atau private GPU cloud terkelola, disesuaikan dengan beban kerja Anda.',
      icon: 'chip',
    },
    {
      name: 'Software & model',
      detail: 'Software AI terbuka yang tidak terikat pada satu model, sehingga Anda tidak pernah terkunci pada satu penyedia.',
      icon: 'layers',
    },
    {
      name: 'Pengetahuan perusahaan',
      detail: 'Dokumen, SOP dan data Anda diolah menjadi basis pengetahuan yang rapi dengan hak akses yang jelas.',
      icon: 'database',
    },
    {
      name: 'Kontrol akses',
      detail: 'Hak akses berbasis peran, single sign-on dan jejak audit lengkap untuk setiap pertanyaan.',
      icon: 'key',
    },
    {
      name: 'Implementasi',
      detail: 'Arsitektur, integrasi dengan sistem Anda dan pilot yang membuktikan nilainya terlebih dahulu.',
      icon: 'rocket',
    },
    {
      name: 'Pelatihan',
      detail: 'Workshop berbasis peran yang menjadikan AI sebagai kebiasaan kerja harian di setiap tim.',
      icon: 'users',
    },
    {
      name: 'Dukungan berkelanjutan',
      detail: 'Pemantauan, pembaruan model, penyegaran basis pengetahuan dan tinjauan bisnis setiap kuartal.',
      icon: 'support',
    },
  ],
  industries: [
    {
      name: 'Manufaktur',
      detail: 'SOP, laporan mutu dan pengetahuan produksi terjawab seketika di lantai pabrik.',
      icon: 'factory',
    },
    {
      name: 'Ritel',
      detail: 'Pengetahuan produk, file harga dan draf layanan pelanggan tetap berada di dalam perusahaan Anda.',
      icon: 'store',
    },
    {
      name: 'Perusahaan desain',
      detail: 'Buat dan kembangkan konsep secara privat, sehingga desain Anda tidak pernah melatih model publik.',
      icon: 'pen',
    },
    {
      name: 'Pemasok',
      detail: 'RFQ, kalkulasi biaya dan komunikasi dengan buyer lebih cepat tanpa membuka margin atau data buyer.',
      icon: 'truck',
    },
    {
      name: 'Grup usaha regional',
      detail: 'Satu lapisan pengetahuan privat untuk seluruh anak perusahaan, bahasa dan negara.',
      icon: 'network',
    },
    {
      name: 'Setiap perusahaan yang menjaga privasi',
      detail: 'Jika Anda menginginkan produktivitas AI tanpa menyerahkan data Anda, kami mitra yang tepat.',
      icon: 'shield',
    },
  ],
  process: [
    { step: 'Asesmen', detail: 'Meninjau penggunaan AI, eksposur data dan use case privat terbaik untuk Anda.' },
    { step: 'Pilot', detail: 'Menjalankan satu use case yang berfungsi dan membuktikan nilainya bersama pengguna nyata.' },
    { step: 'Perluasan', detail: 'Memperluas ke berbagai departemen dengan tata kelola, pelatihan dan kontrol akses.' },
    { step: 'Pengelolaan', detail: 'Menjaganya tetap terkelola, didukung dan terus berkembang dari kuartal ke kuartal.' },
  ],
  faq: [
    {
      q: 'Apa itu AI privat?',
      a: 'AI privat menjalankan model AI generatif di dalam lingkungan yang dikendalikan perusahaan Anda: di hardware milik sendiri, di private cloud, atau dalam konfigurasi hybrid. Dokumen dan data Anda tidak pernah dikirim ke layanan AI publik dan tidak pernah digunakan untuk melatih model milik pihak lain.',
    },
    {
      q: 'Apa bedanya Logic Sonata dengan menggunakan ChatGPT di kantor?',
      a: 'Tool AI publik memproses prompt Anda di infrastruktur yang tidak Anda kendalikan. Logic Sonata menerapkan model, basis pengetahuan dan kontrol akses di dalam lingkungan Anda, sehingga data buyer, file kalkulasi biaya, kontrak dan source code tetap berada di bawah tata kelola Anda dengan jejak audit lengkap.',
    },
    {
      q: 'Apa saja yang termasuk dalam solusi AI privat Logic Sonata?',
      a: 'Semua yang dibutuhkan untuk menjalankan AI secara privat: hardware, software dan model, pengetahuan perusahaan yang disiapkan sebagai basis pengetahuan yang aman, kontrol akses, implementasi, pelatihan karyawan dan dukungan terkelola berkelanjutan. Satu mitra bertanggung jawab atas seluruh stack.',
    },
    {
      q: 'Apakah kami harus membeli hardware GPU?',
      a: 'Tidak. Setiap produk tersedia dalam tiga model penerapan: hosted di private GPU cloud terkelola tanpa membeli hardware, on-premise di hardware khusus di dalam gedung Anda, atau hybrid, yaitu on-premise untuk data sensitif dan hosted untuk kebutuhan lainnya.',
    },
    {
      q: 'Hardware apa yang Anda gunakan untuk penerapan on-premise?',
      a: 'Kami netral terhadap merek hardware dan menyesuaikan platform dengan beban kerja Anda. Tim yang lebih kecil sering memulai dengan workstation AI ringkas seperti NVIDIA DGX Spark atau sistem AMD Ryzen AI Max+, yang keduanya menawarkan unified memory hingga 128 GB dalam unit seukuran desktop. Penerapan yang lebih besar menggunakan server multi-GPU atau cluster private cloud.',
    },
    {
      q: 'Negara mana saja yang Anda layani?',
      a: 'Logic Sonata melayani bisnis di Singapura, Vietnam, Indonesia, Malaysia dan Thailand, dengan layanan implementasi dan dukungan di seluruh Asia Tenggara.',
    },
    {
      q: 'Industri apa saja yang Anda layani?',
      a: 'Pelanggan utama kami adalah perusahaan manufaktur, ritel, desain, pemasok dan grup usaha regional. Pada praktiknya, setiap perusahaan yang ingin memanfaatkan AI sambil menjaga kerahasiaan datanya adalah mitra yang cocok.',
    },
    {
      q: 'Berapa lama pilot AI privat berlangsung?',
      a: 'Sebagian besar pelanggan memulai dengan Asesmen Privasi dan Kesiapan AI, yang menghasilkan roadmap 30/60/90 hari. Pilot kemudian mencakup satu use case yang berfungsi, sehingga Anda membuktikan nilainya bersama pengguna nyata sebelum berkomitmen pada penerapan penuh.',
    },
    {
      q: 'Bagaimana dukungan berkelanjutan berjalan?',
      a: 'Setiap penerapan masuk ke paket dukungan terkelola yang disesuaikan dengan jumlah pengguna dan tingkat kekritisan sistem, mulai dari pemeriksaan kesehatan sistem bulanan hingga technical lead khusus dengan tingkat layanan yang disesuaikan. Kami merekomendasikan paket yang tepat selama asesmen.',
    },
  ],
};
