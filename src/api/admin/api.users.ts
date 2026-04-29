import fetcher from '@/utils/util.api';
import type {
  AdminUserSummary,
  AdminUserDetail,
  AdminUserSearchRequest,
  UpdateUserStatusRequest,
} from '@/types/type.user';

export const getAdminUsers = (req: AdminUserSearchRequest) =>
  fetcher<AdminUserSummary, AdminUserSearchRequest>('/admin/users', req, { method: 'get' });

export const getAdminUserDetail = (userGuid: string) =>
  fetcher<AdminUserDetail>(`/admin/users/${userGuid}`, undefined, { method: 'get' });

export const updateUserStatus = (req: UpdateUserStatusRequest) =>
  fetcher<void, UpdateUserStatusRequest>(`/admin/users/${req.userGuid}/status`, req, { method: 'put' });
