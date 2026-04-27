import { useSyncExternalStore } from 'react';
import { loadingStore } from '@/stores/loading.store';
import Loading from './Loading';

export default function LoadingRenderer() {
  const { isLoading } = useSyncExternalStore(
    loadingStore.subscribe,
    loadingStore.getSnapshot,
  );

  return isLoading ? <Loading /> : null;
}
