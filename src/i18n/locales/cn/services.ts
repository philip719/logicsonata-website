import type { ServicesDict } from '../en/services';

export const services: ServicesDict = {
  meta: {
    title: '私有 AI 服务、培训与托管支持',
    description:
      '为东南亚企业提供 AI 就绪度评估、试点实施、知识库建设、AI 治理、员工培训和私有 AI 托管支持。',
  },
  breadcrumb: '服务',
  catalogName: '私有 AI 托管支持等级',
  offerName: '{name}支持',
  hero: {
    eyebrow: '服务',
    title: '硬件和软件，*只完成了一半。*',
    lead: '大多数企业不知道如何选择模型、整理文件、培训员工或治理 AI 使用。这正是我们的专长，从首次评估到长期托管支持，全程负责。',
    cta: '从评估开始',
  },
  deliver: {
    eyebrow: '我们交付什么',
    title: '六项服务，一个可问责的伙伴。',
    items: [
      {
        name: 'AI 隐私与就绪度评估',
        detail: '梳理 AI 风险，找出最适合私有化的应用场景，并获得一份 30/60/90 天路线图。最轻松的第一步。',
        icon: 'search',
      },
      {
        name: '私有 AI 试点实施',
        detail: '在全面推广之前，先部署一个可用的应用场景，并由真实用户验证。',
        icon: 'flask',
      },
      {
        name: '数据整理与知识库建设',
        detail: '把杂乱的文件变成规范、权限分明且经过测试的私有知识库。大多数 AI 项目败在这里，而我们不会。',
        icon: 'database',
      },
      {
        name: 'AI 治理与政策',
        detail: '使用政策、核准工具清单和基于角色的访问规则，让团队从第一天起就能安全使用 AI。',
        icon: 'policy',
      },
      {
        name: 'AI 培训与落地应用',
        detail: '为管理层、人事、销售、运营和财务定制的岗位工作坊。硬件不会带来普及，培训才会。',
        icon: 'users',
      },
      {
        name: '私有 AI 托管支持',
        detail: '系统监控、模型更新、知识库更新和季度回顾，确保每个部署稳定健康。',
        icon: 'support',
      },
    ],
  },
  support: {
    eyebrow: '托管支持',
    title: '长期可靠，而非一次性服务台。',
    lead: '每个部署都会续约进入四个托管支持等级之一，根据用户数量和系统的关键程度确定。',
    badge: '最常选择',
    response: '响应时间',
    tiers: [
      { name: '基础版', users: '10 至 30 名用户', response: '下一个工作日', detail: '每月健康检查、提示词微调和知识库更新。', featured: false },
      { name: '商务版', users: '30 至 150 名用户', response: '当个工作日', detail: '优先支持、每周检查和季度业务回顾。', featured: false },
      { name: '企业版', users: '150 名以上用户', response: '紧急问题 4 至 8 小时', detail: '专属支持经理、安全补丁协调和治理报告。', featured: true },
      { name: '尊享版', users: '关键业务', response: '定制 SLA', detail: '专属技术负责人、可选现场服务和月度指导委员会。', featured: false },
    ],
  },
  process: {
    eyebrow: '合作流程',
    title: '从初次沟通到托管运营。',
  },
};
