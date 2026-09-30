import type { CommonDict } from '@/i18n/locales/en/common';

export const deployLabels = (common: CommonDict) => ({
  hosted: common.graphics.deployHosted,
  onprem: common.graphics.deployOnprem,
  hybrid: common.graphics.deployHybrid,
});
