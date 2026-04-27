import { useSelect } from '../../_common/api.hook';
import { useCallback } from 'react';
import { getUserProfile } from '@/api/web/api.profile';

import type { UserDetailResponse } from '@/types/type.user';

export default function useSelectUserProfile() {
  const apiFn = useCallback(() => getUserProfile(), []);

  const { res, loading, error } = useSelect<UserDetailResponse, void>({
    apiFn,
    req: undefined,
  });

  return { res, loading, error };
}
