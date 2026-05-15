import { getSessionStorage, setSessionStorage } from '@/utils/util._common';

const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  get: (): string | null => getSessionStorage<string>(ACCESS_TOKEN_KEY),
  set: (token: string): void => setSessionStorage(ACCESS_TOKEN_KEY, token),
  clear: (): void => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
