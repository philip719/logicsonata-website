import type { HomeDict } from '../en/home';

export const home: HomeDict = {
  serviceSchemaName: '私有 AI 解决方案',
  serviceSchemaType: '私有 AI 实施与托管服务',
  serviceSchemaDescription:
    '完整的私有 AI 解决方案，整合硬件、软件、企业知识、访问控制、实施、培训和持续支持，支持本地部署、托管或混合部署。',
  serviceCatalogName: '私有 AI 产品',
  hero: {
    eyebrow: '私有 AI',
    title: '私有 AI，\n建在*您的围墙之内。*',
    lead: 'Logic Sonata 为东南亚企业提供完整的私有 AI：硬件、软件、企业知识、访问控制、实施、培训和持续支持。您的数据始终不离开您的掌控。',
    secondary: '查看完整技术栈',
    stats: [
      { value: '100%', label: '数据始终由您掌控' },
      { value: '3', label: '种部署模式：本地部署、托管、混合部署' },
      { value: '5', label: '个东南亚服务市场' },
    ],
    caption: '示意渲染图 · 内部结构已简化',
    specsLabel: '硬件亮点',
  },
  marqueeLabel: '我们服务的行业',
  marquee: ['制造', '零售', '设计', '供应商', '区域性集团', '服装与纺织', '物流', '工程', '专业服务', '软件团队'],
  problem: {
    eyebrow: '问题所在',
    title: '您的团队早已在用 AI。您知道它正在*泄露什么吗？*',
    lead: '员工每天把生产报告、买家邮件和成本核算表粘贴到公共 AI 工具中，往往没有任何政策约束，也没人知道这些数据最终去了哪里。这不是未来的风险，而是此刻正在每个部门发生的事。',
    exposure: [
      { icon: 'eye', text: '买家数据和报价被粘贴到公共聊天机器人' },
      { icon: 'policy', text: '成本、合同和合规文件毫无审计追踪' },
      { icon: 'lock', text: '没有政策、没有可见性，也无法掌控数据去向' },
    ],
  },
  stack: {
    eyebrow: '解决方案',
    title: '一个伙伴，完整的私有 AI 技术栈。',
    lead: '硬件和软件只完成了一半。我们交付让私有 AI 在真实企业中运转所需的每一层，并对全部环节负责到底。',
  },
  deployment: {
    eyebrow: '部署方式',
    title: '合适的数据，放在合适的 AI 环境。',
    lead: '每款 Logic Sonata 产品都可采用三种部署模式中的任意一种，治理和管控完全一致。',
    items: [
      {
        variant: 'onprem',
        name: '本地部署私有 AI',
        line: '在您楼宇内运行的 AI。',
        detail: '适用于买家数据、人事档案、合同和源代码等绝不应离开企业的信息。',
      },
      {
        variant: 'hosted',
        name: '托管私有 AI',
        line: '无需购买硬件的私有 AI。',
        detail: '托管式私有 GPU 云上的专用算力。试点快速启动，前期投入更低。',
      },
      {
        variant: 'hybrid',
        name: '混合部署私有 AI',
        line: '每类数据都有合适的环境。',
        detail: '关键之处本地掌控，其余部分托管扩展。',
      },
    ],
  },
  products: {
    eyebrow: '产品',
    title: '五套私有 AI 系统。\n总有一套适合您的数据。',
    aside: '每套系统均可本地部署、托管或混合部署，并按您的知识和访问规则完成全面配置。',
    ctaTitle: '不确定哪套适合？',
    ctaText: '大多数客户从就绪度评估开始。我们梳理您的数据，并推荐合适的系统。',
  },
  industries: {
    eyebrow: '服务对象',
    title: '专为不能把数据交给公共 AI 的企业打造。',
    lead: '我们的核心客户是制造企业、零售企业、设计公司、供应商和区域性集团。实际上，任何想用 AI 又不愿交出数据的企业都适合。',
  },
  process: {
    eyebrow: '合作流程',
    title: '从初次沟通到托管运营。',
  },
  markets: {
    eyebrow: '市场',
    title: '服务东南亚五大市场。',
    lead: '我们服务新加坡、越南、印尼、马来西亚和泰国的企业，交付、培训和托管支持覆盖整个区域。',
  },
  faq: {
    eyebrow: '常见问题',
    title: '客户最先问的问题。',
  },
};
