import type { HomeDict } from '../en/home';

export const home: HomeDict = {
  serviceSchemaName: 'โซลูชัน Private AI',
  serviceSchemaType: 'บริการติดตั้งและดูแลระบบ Private AI',
  serviceSchemaDescription:
    'โซลูชัน Private AI ครบวงจร ผสานฮาร์ดแวร์ ซอฟต์แวร์ คลังความรู้องค์กร การควบคุมสิทธิ์การเข้าถึง การติดตั้งใช้งาน การฝึกอบรม และการดูแลต่อเนื่อง ติดตั้งได้ทั้งแบบ On-premise, Hosted หรือ Hybrid',
  serviceCatalogName: 'ผลิตภัณฑ์ Private AI',
  hero: {
    eyebrow: 'Private AI',
    title: 'Private AI\nที่ทำงาน *ภายในองค์กรของคุณ*',
    lead: 'Logic Sonata ส่งมอบ Private AI ครบวงจรให้ธุรกิจทั่วเอเชียตะวันออกเฉียงใต้ ทั้งฮาร์ดแวร์ ซอฟต์แวร์ คลังความรู้องค์กร การควบคุมสิทธิ์การเข้าถึง การติดตั้งใช้งาน การฝึกอบรม และการดูแลต่อเนื่อง ข้อมูลของคุณไม่หลุดจากการควบคุมของคุณ',
    secondary: 'ดูระบบครบวงจร',
    stats: [
      { value: '100%', label: 'ข้อมูลอยู่ภายใต้การควบคุมของคุณ' },
      { value: '3', label: 'รูปแบบการติดตั้ง: On-premise, Hosted, Hybrid' },
      { value: '5', label: 'ตลาดที่ให้บริการในเอเชียตะวันออกเฉียงใต้' },
    ],
    caption: 'ภาพจำลองเพื่อประกอบ · โครงสร้างภายในแสดงแบบย่อ',
    specsLabel: 'จุดเด่นของฮาร์ดแวร์',
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
  marqueeLabel: 'อุตสาหกรรมที่เราให้บริการ',
  marquee: ['การผลิต', 'ค้าปลีก', 'งานออกแบบ', 'ซัพพลายเออร์', 'กลุ่มธุรกิจระดับภูมิภาค', 'เครื่องนุ่งห่มและสิ่งทอ', 'โลจิสติกส์', 'วิศวกรรม', 'บริการวิชาชีพ', 'ทีมพัฒนาซอฟต์แวร์'],
  problem: {
    eyebrow: 'ปัญหา',
    title: 'ทีมของคุณใช้ AI อยู่แล้ว แต่คุณรู้หรือไม่ว่า *ข้อมูลอะไรกำลังรั่วไหล*',
    lead: 'พนักงานคัดลอกรายงานการผลิต อีเมลจากผู้ซื้อ และตารางคำนวณต้นทุนไปวางในเครื่องมือ AI สาธารณะทุกวัน โดยมักไม่มีนโยบายรองรับ และไม่มีใครรู้ว่าข้อมูลเหล่านั้นไปอยู่ที่ใด นี่ไม่ใช่ความเสี่ยงในอนาคต แต่เกิดขึ้นแล้วในทุกแผนก',
    exposure: [
      { icon: 'eye', text: 'ข้อมูลผู้ซื้อและราคาถูกวางลงในแชตบอตสาธารณะ' },
      { icon: 'policy', text: 'ไฟล์ต้นทุน สัญญา และเอกสาร Compliance ที่ไม่มีบันทึกตรวจสอบย้อนหลัง' },
      { icon: 'lock', text: 'ไม่มีนโยบาย ไม่มีการมองเห็น และควบคุมไม่ได้ว่าข้อมูลไปที่ไหน' },
    ],
  },
  stack: {
    eyebrow: 'โซลูชัน',
    title: 'พาร์ทเนอร์รายเดียว ครบทุกชั้นของ Private AI',
    lead: 'ฮาร์ดแวร์และซอฟต์แวร์เป็นเพียงครึ่งหนึ่งของงาน เราส่งมอบทุกชั้นที่จำเป็นเพื่อให้ Private AI ใช้งานได้จริงในธุรกิจ และรับผิดชอบทั้งหมดด้วยตัวเราเอง',
  },
  deployment: {
    eyebrow: 'รูปแบบการติดตั้ง',
    title: 'สภาพแวดล้อม AI ที่เหมาะสมกับข้อมูลแต่ละประเภท',
    lead: 'ทุกผลิตภัณฑ์ของ Logic Sonata ทำงานได้ใน 3 รูปแบบการติดตั้ง ด้วยการกำกับดูแลและการควบคุมในระดับเดียวกัน',
    items: [
      {
        variant: 'onprem',
        name: 'Private AI แบบ On-premise',
        line: 'AI ที่ทำงานภายในอาคารของคุณ',
        detail: 'สำหรับข้อมูลผู้ซื้อ ข้อมูลบุคลากร สัญญา และซอร์สโค้ดที่ไม่ควรออกนอกองค์กรเด็ดขาด',
      },
      {
        variant: 'hosted',
        name: 'Private AI แบบ Hosted',
        line: 'Private AI โดยไม่ต้องซื้อฮาร์ดแวร์',
        detail: 'ทรัพยากรเฉพาะบน Private GPU Cloud ที่มีทีมดูแลจัดการ เริ่มโครงการนำร่องได้เร็ว และลงทุนเริ่มต้นน้อยกว่า',
      },
      {
        variant: 'hybrid',
        name: 'Private AI แบบ Hybrid',
        line: 'สภาพแวดล้อมที่เหมาะกับข้อมูลแต่ละประเภท',
        detail: 'ควบคุมแบบ On-premise ในส่วนที่สำคัญ และขยายขนาดแบบ Hosted ในส่วนที่เหลือ',
      },
    ],
  },
  products: {
    eyebrow: 'ผลิตภัณฑ์',
    title: 'ระบบ Private AI 5 ระบบ\nเลือกระบบที่ใช่สำหรับข้อมูลของคุณ',
    aside: 'ทุกระบบติดตั้งได้แบบ On-premise, Hosted หรือ Hybrid พร้อมตั้งค่าคลังความรู้และกฎการเข้าถึงขององค์กรคุณไว้ครบถ้วน',
    ctaTitle: 'ยังไม่แน่ใจว่าระบบใดเหมาะกับคุณ',
    ctaText: 'ลูกค้าส่วนใหญ่เริ่มจากการประเมินความพร้อมด้าน AI เราจะสำรวจข้อมูลของคุณและแนะนำระบบที่เหมาะสม',
    view: 'View', // TODO(redesign): translate
  },
  industries: {
    eyebrow: 'ลูกค้าของเรา',
    title: 'สร้างมาเพื่อธุรกิจที่ไม่สามารถส่งข้อมูลให้ AI สาธารณะได้',
    lead: 'ลูกค้าหลักของเราคือผู้ผลิต ธุรกิจค้าปลีก บริษัทออกแบบ ซัพพลายเออร์ และกลุ่มธุรกิจระดับภูมิภาค ในทางปฏิบัติ ทุกบริษัทที่ต้องการใช้ AI โดยไม่ต้องเสียการควบคุมข้อมูล ถือว่าเหมาะกับเรา',
  },
  process: {
    eyebrow: 'ขั้นตอน',
    title: 'ตั้งแต่การพูดคุยครั้งแรก จนถึงการดูแลระบบอย่างต่อเนื่อง',
  },
  markets: {
    eyebrow: 'ตลาด',
    title: 'ให้บริการ 5 ตลาดทั่วเอเชียตะวันออกเฉียงใต้',
    lead: 'เราทำงานกับธุรกิจในสิงคโปร์ เวียดนาม อินโดนีเซีย มาเลเซีย และไทย พร้อมบริการติดตั้ง ฝึกอบรม และดูแลระบบทั่วภูมิภาค',
    swipe: 'Drag or scroll', // TODO(redesign): translate
  },
  faq: {
    eyebrow: 'คำถามที่พบบ่อย',
    title: 'คำถามที่ลูกค้าถามเราเป็นอันดับแรก',
  },
};
