import type { SolutionsDict } from '../en/solutions';

export const solutions: SolutionsDict = {
  meta: {
    title: '私有 AI 产品与硬件',
    description:
      '私有知识助手、实时视觉 AI、编程助手、AI 智能体与图像生成，按企业规模配置硬件，支持本地部署、托管或混合部署。',
  },
  breadcrumb: '解决方案',
  listName: 'Logic Sonata 私有 AI 产品',
  hero: {
    eyebrow: '解决方案',
    title: '私有 AI 系统，*即刻部署。*',
    lead: '五套可投入生产的 AI 系统，每套都配备私有化运行所需的硬件、企业知识、访问控制、培训和支持。',
    secondary: '查看硬件',
  },
  products: {
    eyebrow: '产品',
    title: '选择适合您数据的系统。',
  },
  hardware: {
    eyebrow: '硬件',
    title: '数据中心级 AI，放在桌面上。',
    lead: '我们不绑定任何硬件品牌。对许多团队来说，私有 AI 从一台基于 NVIDIA 或 AMD 芯片的紧凑型 AI 工作站开始，我们会推荐最适合您的模型、软件和预算的平台，并作为解决方案的一部分负责供货、配置和支持。',
    imageAlt:
      '紧凑型私有 AI 设备的分解图：铝制机身、多孔散热面板、风扇与均热板散热、AI 超级芯片、统一内存、NVMe 存储和高速网络',
    specHeader: '规格',
    // Rows: [label, NVIDIA DGX Spark, AMD Ryzen AI Max+], from each manufacturer's published figures.
    platforms: [
      ['处理器', 'GB10 Grace Blackwell 超级芯片：20 核 Arm CPU 搭配 Blackwell GPU', 'Ryzen AI Max+ 395：16 核 Zen 5 CPU、Radeon 8060S GPU、XDNA 2 NPU'],
      ['统一内存', '128 GB', '最高 128 GB，其中最多 96 GB 可分配给 GPU'],
      ['AI 性能', '最高 1 petaFLOP（FP4）', '50+ TOPS NPU，另加 40 核 GPU'],
      ['网络', 'ConnectX-7，速率 200 Gb/s，可连接两台运行更大模型', '因系统制造商而异'],
      ['最适合', 'CUDA 软件生态和最大规模的本地模型', 'x86 兼容性和高性价比的本地推理'],
    ],
    finePrint:
      '通用设备的示意渲染图，内部结构已简化。规格数据来自各制造商公布的数据。NVIDIA 和 DGX Spark 是 NVIDIA Corporation 的商标。AMD 和 Ryzen 是 Advanced Micro Devices, Inc. 的商标。',
    tiers: [
      {
        name: '紧凑型 AI 工作站',
        fit: '试点与小型团队',
        detail: '桌面级设备，例如 NVIDIA DGX Spark 或 AMD Ryzen AI Max+ 系统。专为办公室设计，性能足以运行大型模型。',
        icon: 'chip',
      },
      {
        name: 'GPU 服务器',
        fit: '部门级及全公司推广',
        detail: '部署在您机房或数据中心的机架式多 GPU 服务器，支持更高并发。',
        icon: 'layers',
      },
      {
        name: '托管私有云',
        fit: '无需购买硬件',
        detail: '托管私有环境中的专用 GPU 算力，与公共 AI 服务完全隔离。',
        icon: 'cloud',
      },
    ],
  },
  deployment: {
    eyebrow: '部署方式',
    title: '本地部署、托管或混合部署。',
    lead: '每款产品都能在适合各类数据的环境中运行，治理标准完全一致。',
    items: [
      { variant: 'onprem', name: '本地部署', detail: '硬件放在您的楼宇内，守护最敏感的数据。' },
      { variant: 'hosted', name: '托管', detail: '专用私有 GPU 云，无需购买硬件。' },
      { variant: 'hybrid', name: '混合部署', detail: '敏感工作负载在本地运行，其余全部托管。' },
    ],
  },
  extended: {
    eyebrow: '扩展能力',
    title: '更多私有 AI，基于同一平台构建。',
    lead: '可作为附加模块，或针对特定行业流程定制项目。',
    items: [
      { name: '私有翻译', detail: '文件、沟通内容和技术资料的多语言翻译。', icon: 'translate' },
      { name: '私有文档 AI', detail: '从发票、表单、证书和扫描文件中提取信息，导入您的系统。', icon: 'policy' },
      { name: '私有语音 AI', detail: '语音识别、转录和内部语音助手。', icon: 'wave' },
    ],
  },
  ctaTitle: '不确定哪套系统适合？',
  ctaLead: '从一次咨询开始。我们梳理您的数据，推荐合适的系统，并确定硬件配置。',
};
