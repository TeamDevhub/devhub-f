import { useMemo } from 'react';
import { getHome } from '@/api/web/api.home';
import { useSelect } from '@/hooks/_common/api.hook';
import { MOCK_HOME } from './mock.home';

export default function useSelectHome() {
  const options = useMemo(() => ({
    apiFn: getHome,
    req: {},
    cacheKey: 'home',
    enabled: false, // TODO: API 연결 후 제거
  }), []);

  const { res, loading } = useSelect(options);

  return {
    home: res?.data ?? MOCK_HOME,
    loading,
  };
}
