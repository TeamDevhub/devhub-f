import { useMemo } from 'react';
import { getSkillTrends } from '@/api/web/api.skilltrend';
import { useSelect } from '@/hooks/_common/api.hook';
import { MOCK_TREND } from './mock.skilltrend';

export default function useSelectSkillTrends() {
  const options = useMemo(
    () => ({
      apiFn: getSkillTrends,
      req: {},
      cacheKey: 'skilltrend',
      enabled: false,
    }),
    [],
  );

  const { res, loading } = useSelect(options);

  return {
    trendData: res?.data ?? MOCK_TREND,
    loading,
  };
}
