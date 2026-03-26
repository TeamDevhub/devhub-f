import { useCallback } from 'react';
import { useSelect } from '@/hooks/_common/api.hook';
import { getTerms } from '@/api/terms/terms.api';

import type { TermsResponse } from '@/types/type.terms';

export default function useSelectTerms() {
  const apiFn = useCallback(() => getTerms(), []);

  const { res, loading, error } = useSelect<TermsResponse[], void>({
    apiFn,
    req: undefined,
  });

  return {
    termsList: res?.dataList ?? [],
    loading,
    error,
  };
}
