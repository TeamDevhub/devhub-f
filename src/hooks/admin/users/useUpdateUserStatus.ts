import { updateUserStatus } from '@/api/admin/api.users';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import type { UpdateUserStatusRequest } from '@/types/type.user';

const SUSPENDED_STATUS_CD = '7002';
const ACTIVE_STATUS_CD = '7001';

export default function useUpdateUserStatus(onUpdated?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('회원 상태가 변경되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('회원 상태 변경에 실패했습니다.');
  };

  const { mutate, loading } = useMutation<UpdateUserStatusRequest, void>(
    updateUserStatus,
    onSuccess,
    onFail,
    { invalidateKeys: ['admin-users-list'] },
  );

  const handleSuspend = async (userGuid: string) => {
    if (!(await confirm('해당 회원을 정지 처리하시겠습니까?'))) return;
    await mutate({ userGuid, userStatusCd: SUSPENDED_STATUS_CD });
  };

  const handleActivate = async (userGuid: string) => {
    if (!(await confirm('해당 회원의 정지를 해제하시겠습니까?'))) return;
    await mutate({ userGuid, userStatusCd: ACTIVE_STATUS_CD });
  };

  return { handleSuspend, handleActivate, loading };
}
