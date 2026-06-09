import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProjects } from '@/api/admin/api.project';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminProjectSearchRequest } from '@/types/type.project';
import type { DateType } from '@/types/type.api';

const initData: AdminProjectSearchRequest = {
  page: 0,
  keyword: '',
  recruitmentTypeCd: '',
  recruitStatusCd: '',
  progressTypeCd: '',
  progressRegionCd: '',
  recruitmentStartDate: null as DateType,
  recruitmentEndDate: null as DateType,
  progressStartDate: null as DateType,
  progressEndDate: null as DateType,
};

export default function useSelectAdminProjects() {
  const { state, setState, handleChange, reset } = useFormState<AdminProjectSearchRequest>({ ...initData });
  const [request, setRequest] = useState<AdminProjectSearchRequest>({ ...initData });

  const { res, loading, refetch } = useSelect({
    apiFn: getAdminProjects,
    req: request,
    cacheKey: 'admin-projects-list',
  });

  const navigate = useNavigate();
  const handleDetail = (projectGuid: string) => {
    if (!projectGuid) return;
    navigate(`/admin/projects/${projectGuid}`);
  };

  const projectSearch = () => {
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
    projectSearch,
    handleDetail,
    handleReset: reset,
    onHandleEvent: handleChange,
    refetch,
  };
}
