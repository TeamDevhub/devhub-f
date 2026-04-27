import { useSyncExternalStore } from 'react';
import { loadingStore } from '@/stores/loading.store';

export const useLoading = () => {
  const { isLoading } = useSyncExternalStore(
    loadingStore.subscribe,
    loadingStore.getSnapshot,
  );

  return {
    isLoading,
    show: loadingStore.show,
    hide: loadingStore.hide,
  };
};
