import fetcher from '@/utils/util.api';
import type { SkillTrendResponse } from '@/types/type.skilltrend';

export const getSkillTrends = (_?: Record<string, never>) => fetcher<SkillTrendResponse>('/skilltrend', undefined, { method: 'get' });
