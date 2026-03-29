import { useSelect } from '../_common/api.hook';
import { useCallback } from 'react';
import { getTerms } from '@/api/terms/terms.api';

import type { TermsResponse } from '@/types/type.terms';

export default function useSelectTerms() {
  const apiFn = useCallback(() => getTerms(), []);

  const { res, loading, error } = useSelect<TermsResponse[], void>({
    apiFn,
    req: undefined,
  });

  return { res, loading, error };
}
