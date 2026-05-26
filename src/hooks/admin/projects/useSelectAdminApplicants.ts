import { useState } from 'react';
import { getAdminApplicants } from '@/api/admin/api.project';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminApplicantSearchRequest } from '@/types/type.project';

const buildInitData = (projectGuid: string): AdminApplicantSearchRequest => ({
  projectGuid,
  page: 0,
  size: 10,
  approvalStatusCd: '',
  positionCd: '',
  levelCd: '',
});

export default function useSelectAdminApplicants(projectGuid: string | undefined) {
  const safeGuid = projectGuid ?? '';
  const init = buildInitData(safeGuid);

  const { state, setState, handleChange } = useFormState<AdminApplicantSearchRequest>({ ...init });
  const [request, setRequest] = useState<AdminApplicantSearchRequest>({ ...init });

  const { res, loading, refetch } = useSelect({
    apiFn: getAdminApplicants,
    req: request,
  });

  const applicantSearch = () => {
    const searchParams = { ...state, page: 0 };
    setRequest(searchParams);
    setState(searchParams);
    refetch();
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
    applicantSearch,
    onHandleEvent: handleChange,
    refetch,
  };
}
