import fetcher from '@/utils/util.api';
import type {
  AdminUserListItem,
  AdminUserDetail,
  AdminUserSearchRequest,
  AdminUpdateUserRequest,
  AdminResetPasswordRequest,
  AdminBanUserRequest,
} from '@/types/type.user';

type AdminUsersListRequest = AdminUserSearchRequest & { page: number; size: number };

export const getAdminUsers = (req: AdminUsersListRequest) =>
  fetcher<AdminUserListItem, AdminUsersListRequest>('/admin/users', req, { method: 'get' });

export const getAdminUserDetail = (userGuid: string) => fetcher<AdminUserDetail>(`/admin/users/${userGuid}`, undefined, { method: 'get' });

export const updateAdminUser = (userGuid: string, req: AdminUpdateUserRequest) =>
  fetcher<void, AdminUpdateUserRequest>(`/admin/users/${userGuid}`, req, { method: 'put' });

export const resetAdminUserPassword = (userGuid: string, req: AdminResetPasswordRequest) =>
  fetcher<void, AdminResetPasswordRequest>(`/admin/users/${userGuid}/password`, req, { method: 'post' });

export const banAdminUser = (userGuid: string, req: AdminBanUserRequest) =>
  fetcher<void, AdminBanUserRequest>(`/admin/users/${userGuid}/ban`, req, { method: 'post' });

export const unbanAdminUser = (userGuid: string) => fetcher<void>(`/admin/users/${userGuid}/unban`, undefined, { method: 'post' });
