import fetcher from '@/utils/util.api';
import type { TermsResponse } from '@/types/type.terms';

export const getTerms = () => fetcher<TermsResponse[]>(`/terms`, undefined, { method: 'get' });
