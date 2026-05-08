import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminUsers } from '@/api/admin/api.users';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminUserSearchRequest } from '@/types/type.user';
import type { DateType } from '@/types/type.api';
import { USER_STATUS_FILTER, type UserStatusFilter } from '@/constants/codes';

interface AdminUsersFormState {
  userStatusFilter: UserStatusFilter;
  username: string;
  registeredStartDate: DateType;
  registeredEndDate: DateType;
}

type AdminUsersRequest = AdminUserSearchRequest & { page: number; size: number };

const PAGE_SIZE = 10;

const initFormState: AdminUsersFormState = {
  userStatusFilter: USER_STATUS_FILTER.ALL.VALUE,
  username: '',
  registeredStartDate: null,
  registeredEndDate: null,
};

const initRequest: AdminUsersRequest = { page: 0, size: PAGE_SIZE };

const toStatusParams = (filter: UserStatusFilter): Pick<AdminUserSearchRequest, 'blocked' | 'deleted'> => {
  switch (filter) {
    case USER_STATUS_FILTER.ACTIVE.VALUE:
      return {
        blocked: 'N',
        deleted: 'N',
      };

    case USER_STATUS_FILTER.BLOCKED.VALUE:
      return {
        blocked: 'Y',
      };

    case USER_STATUS_FILTER.DELETED.VALUE:
      return {
        deleted: 'Y',
      };

    default:
      return {};
  }
};

export default function useSelectAdminUsers() {
  const { state, handleChange, reset } = useFormState<AdminUsersFormState>({ ...initFormState });
  const [request, setRequest] = useState<AdminUsersRequest>({ ...initRequest });

  const { res, loading, refetch } = useSelect({ apiFn: getAdminUsers, req: request });

  const navigate = useNavigate();
  const handleDetail = (userGuid: string) => {
    if (!userGuid) return;
    navigate(`/admin/users/${userGuid}`);
  };

  const userSearch = () => {
    setRequest({
      page: 0,
      size: PAGE_SIZE,
      username: state.username || undefined,
      registeredStartDate: state.registeredStartDate,
      registeredEndDate: state.registeredEndDate,
      ...toStatusParams(state.userStatusFilter),
    });
  };

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page - 1 }));
  };

  return {
    res,
    loading,
    state,
    request,
    setPage,
    userSearch,
    handleDetail,
    handleReset: reset,
    onHandleEvent: handleChange,
    refetch,
  };
}
