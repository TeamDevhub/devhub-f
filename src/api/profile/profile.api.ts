import type { UpdateProfileRequest, UserDetailResponse, UpdatePasswordRequest } from '@/types/type.user.ts';
import fetcher from '@/utils/util.api';

export const getUserProfile = () => fetcher<UserDetailResponse>(`/user/profile`, undefined, { method: 'get' });

export const updateProfile = (req: UpdateProfileRequest) => fetcher<void, UpdateProfileRequest>('/user/profile', req, { method: 'put' });

export const updatePassword = (req: UpdatePasswordRequest) => fetcher<void, UpdatePasswordRequest>('/user/profile/password', req, { method: 'put' });
