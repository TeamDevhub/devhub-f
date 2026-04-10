import fetcher from '@/utils/util.api';
import type { OauthResponse } from '@/types/type.oauth';

export const oauthCallback = (provider: string, code: string) =>
  fetcher<OauthResponse, void>(`/auth/oauth/${provider}/callback?code=${code}`, undefined, {
    method: 'post',
    withCredentials: true,
  });
