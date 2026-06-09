import { useMemo } from 'react';
import { getAdminUserDetail } from '@/api/admin/api.users';
import { useSelect } from '@/hooks/_common/api.hook';

export default function useSelectAdminUserDetail(userGuid: string | undefined) {
  const options = useMemo(
    () => ({
      apiFn: getAdminUserDetail,
      req: userGuid ?? '',
      cacheKey: userGuid ? `admin-user-detail-${userGuid}` : undefined,
      enabled: !!userGuid,
    }),
    [userGuid],
  );

  const { res, loading, refetch } = useSelect(options);

  return { res, loading, refetch };
}
