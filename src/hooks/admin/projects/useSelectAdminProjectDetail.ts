import { useMemo } from 'react';
import { getAdminProjectDetail } from '@/api/admin/api.project';
import { useSelect } from '@/hooks/_common/api.hook';

export default function useSelectAdminProjectDetail(projectGuid: string | undefined) {
  const options = useMemo(
    () => ({
      apiFn: getAdminProjectDetail,
      req: projectGuid ?? '',
      cacheKey: projectGuid ? `admin-project-detail-${projectGuid}` : undefined,
      enabled: !!projectGuid,
    }),
    [projectGuid],
  );

  const { res, loading, refetch } = useSelect(options);

  return { res, loading, refetch };
}
