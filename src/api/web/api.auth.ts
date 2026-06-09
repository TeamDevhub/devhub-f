import type { LoginRequest, TokenResponseDto } from '@/types/type.auth';
import fetcher from '@/utils/util.api';

export const login = (req: LoginRequest) => fetcher<TokenResponseDto, LoginRequest>(`/auth/login`, req, { method: 'post', withCredentials: true });

export const reissue = () =>
  fetcher<TokenResponseDto, void>(`/auth/reissue`, undefined, {
    method: 'post',
    withCredentials: true,
  });
