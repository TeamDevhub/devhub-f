// 외부 스토어 기반으로 교체됨 — 하위 호환 re-export
export { useLoading } from '@/hooks/_common/useLoading';
export { loadingStore } from '@/stores/loading.store';

import { loadingStore } from '@/stores/loading.store';
import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';

export const LoadingBridge = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') loadingStore.show();
    else loadingStore.hide();
  }, [navigation.state]);

  return null;
};
