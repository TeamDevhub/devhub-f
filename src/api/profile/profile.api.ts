import type { UserDetailResponse } from '@/types/type.user.ts';
import fetcher from '@/utils/util.api';

export const getUserDetail = () => fetcher<UserDetailResponse, void>(`/user/profile`, void , { method: 'post' });
