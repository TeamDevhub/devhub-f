import fetcher from '@/utils/util.api';
import type { HomeResponse } from '@/types/type.home';

export const getHome = (_?: Record<string, never>) =>
  fetcher<HomeResponse>('/home', undefined, { method: 'get' });
