import fetcher from '@/utils/util.api';
import type { HomeResponse } from '@/types/type.home';

export const getHome = () =>
  fetcher<HomeResponse>('/home', undefined, { method: 'get' });
