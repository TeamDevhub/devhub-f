import { useMemo } from 'react';
import { getHome } from '@/api/web/api.home';
import { useSelect } from '@/hooks/_common/api.hook';

export default function useSelectHome() {
  const options = useMemo(() => ({
    apiFn: getHome,
    req: {},
    cacheKey: 'home',
  }), []);

  const { res, loading } = useSelect(options);

  return {
    home: res?.data,
    loading,
  };
}
