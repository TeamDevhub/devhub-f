import { useMemo, useState } from 'react';
import { getAdminUserApplyProjects } from '@/api/admin/api.project';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminUserProjectsReqData } from '@/types/type.project';

const pageData: AdminUserProjectsReqData = {
  page: 0,
  size: 10
};
export default function useSelectAdminUserApplyProjects(userGuid: string | undefined) {
  const [request, setRequest] = useState<AdminUserProjectsReqData>({ ...pageData, userGuid:userGuid });
  
  const { state, setState, handleChange, reset } = useFormState<AdminUserProjectsReqData>({ ...pageData, userGuid:userGuid });
  const options = useMemo(
      () => ({
        apiFn: getAdminUserApplyProjects,
        req: state,
        enabled: !!userGuid,
      }),
      [userGuid],
    );

  const { res, loading, refetch } = useSelect(options);
  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  return { res, loading, refetch, setPage };
}
