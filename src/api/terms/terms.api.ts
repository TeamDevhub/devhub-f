import fetcher from '@/utils/util.api';
import type { TermsResponse } from '@/types/type.terms';

export const getTerms = (page = 0, size = 100) => fetcher<TermsResponse[]>(`/terms?page=${page}&size=${size}`, undefined, { method: 'get' });
