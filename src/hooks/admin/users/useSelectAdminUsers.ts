import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminUsers } from '@/api/admin/api.users';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminUserSearchRequest } from '@/types/type.user';

const initData: AdminUserSearchRequest = {
  page: 0,
  size: 10,
  username: '',
  userStatusCd: '',
  registeredStartDate: null,
  registeredEndDate: null,
};

export default function useSelectAdminUsers() {
  const { state, setState, handleChange, reset } = useFormState<AdminUserSearchRequest>({ ...initData });
  const [request, setRequest] = useState<AdminUserSearchRequest>({ ...initData });

  const options = {
    apiFn: getAdminUsers,
    req: request,
    cacheKey: 'admin-users-list',
  };

  const { res, loading, refetch } = useSelect(options);

  const navigate = useNavigate();
  const handleDetail = (userGuid: string) => {
    if (!userGuid) return;
    navigate(`/admin/users/${userGuid}`);
  };

  const userSearch = () => {
    const searchParams = { ...state, page: 0 };
    setRequest(searchParams);
    setState(searchParams);
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
