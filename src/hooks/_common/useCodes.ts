import { useSyncExternalStore } from 'react';
import { codesStore } from '@/stores/codes.store';

export const useCodes = () => {
  const { codes, loading } = useSyncExternalStore(
    codesStore.subscribe,
    codesStore.getSnapshot,
  );

  return {
    codes,
    loading,
    getCodesByGroup: codesStore.getCodesByGroup,
    getCodeName: codesStore.getCodeName,
    getSelectOptions: codesStore.getSelectOptions,
    refetch: codesStore.refetch,
  };
};
