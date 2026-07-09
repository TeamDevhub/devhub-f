import { useState } from 'react';
import { getAdminUserProjects } from '@/api/admin/api.project';
import { useSelect } from '@/hooks/_common/api.hook';
import type { AdminUserProjectsReqData } from '@/types/type.project';

const PAGE_SIZE = 10;

export default function useSelectAdminUserProjects(userGuid: string | undefined) {
  const [request, setRequest] = useState<AdminUserProjectsReqData>({
    page: 0,
    size: PAGE_SIZE,
    userGuid: userGuid,
  });

  const { res, loading, refetch } = useSelect({
    apiFn: getAdminUserProjects,
    req: request,
    enabled: !!userGuid,
  });

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page - 1 }));
  };

  return { res, loading, refetch, setPage };
}
