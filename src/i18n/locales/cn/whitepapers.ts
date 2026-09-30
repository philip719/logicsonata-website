import type { WhitepapersDict } from '../en/whitepapers';

export const whitepapers: WhitepapersDict = {
  index: {
    meta: {
      title: '私有 AI 白皮书',
      description:
        '免费白皮书，涵盖私有知识助手、现场视觉 AI、私有编程助手、受治理的 AI 智能体和私有图像生成。',
    },
    breadcrumb: '白皮书',
    eyebrow: '资源',
    title: '私有 AI，*一文读懂。*',
    lead: '为企业与技术负责人准备的实用白皮书：每套系统如何运作、哪些管控措施保障数据私密、最先在哪里见效，以及如何推广落地。',
  },
  landing: {
    metaTitle: '白皮书：{title}',
    metaDescription: 'Logic Sonata 免费白皮书：{subtitle}。{contents}。',
    eyebrow: '免费白皮书 · {code}',
    inside: '内容概览',
    checklist: '安全管控清单',
    // {name} is the product name; {nameLower} is the same in lower case.
    audience: 'PDF · 专为正在评估{name}方案的企业与技术负责人撰写。',
    language: '本白皮书以英文撰写。',
    coverAlt: '《{title}》白皮书封面',
    formTitle: '免费获取',
    formIntro: '请告诉我们发送到哪里。提交后即可开始下载。',
    more: '想先了解 {code}？[查看{name}](/solutions/{id})，或[预约咨询](/contact)。',
  },
};
