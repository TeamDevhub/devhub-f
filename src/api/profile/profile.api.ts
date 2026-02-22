import type { UserDetailResponse } from '@/types/type.user.ts';
import fetcher from '@/utils/util.api';

export const getUserProfile = () => fetcher<UserDetailResponse>(`/user/profile`, undefined, { method: 'get' });
