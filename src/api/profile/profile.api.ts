import type { UpdateProfileRequest, UserDetailResponse, UpdatePasswordRequest, UpdateProfileImageRequest } from '@/types/type.user.ts';
import type {BoardSummary, BoardSearchRequest} from "@/types/type.boards";

import fetcher from '@/utils/util.api';

export const getUserProfile = () => fetcher<UserDetailResponse>(`/user/profile`, undefined, { method: 'get' });

export const updateProfile = (req: UpdateProfileRequest) => fetcher<void, UpdateProfileRequest>('/user/profile', req, { method: 'put' });

export const updatePassword = (req: UpdatePasswordRequest) => fetcher<void, UpdatePasswordRequest>('/user/profile/password', req, { method: 'put' });

export const updateProfileImage = (req: UpdateProfileImageRequest) =>
  fetcher<void, UpdateProfileImageRequest>('/user/profile/image', req, { method: 'post' });

export const getUserBoards = (req:BoardSearchRequest) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(req.page));

    return fetcher<BoardSummary>(
        `/user/profile/boards?${searchParams.toString()}`,
        undefined,
        { method : "get"}
    );
}


