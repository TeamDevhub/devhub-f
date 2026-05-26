import fetcher from '@/utils/util.api';
import type { SkillTrendResponse } from '@/types/type.skilltrend';

export const getSkillTrends = () => fetcher<SkillTrendResponse>('/skilltrend', undefined, { method: 'get' });
