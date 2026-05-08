import { banAdminUser, unbanAdminUser } from '@/api/admin/api.users';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import type { AdminBanUserRequest } from '@/types/type.user';

type BanRequest = { userGuid: string } & AdminBanUserRequest;

export default function useUpdateUserStatus(userGuid: string | undefined, onUpdated?: () => void) {
  const { alert, confirm } = useModal();

  const invalidateKeys = [
    'admin-users-list',
    ...(userGuid ? [`admin-user-detail-${userGuid}`] : []),
  ];

  const onSuccess = () => {
    alert('회원 상태가 변경되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('회원 상태 변경에 실패했습니다.');
  };

  const { mutate: ban, loading: banLoading } = useMutation<BanRequest, void>(
    ({ userGuid: targetGuid, ...req }) => banAdminUser(targetGuid, req),
    onSuccess,
    onFail,
    { invalidateKeys },
  );

  const { mutate: unban, loading: unbanLoading } = useMutation<string, void>(
    unbanAdminUser,
    onSuccess,
    onFail,
    { invalidateKeys },
  );

  const handleSuspend = async (targetGuid: string) => {
    if (!(await confirm('해당 회원을 정지 처리하시겠습니까?'))) return;
    await ban({ userGuid: targetGuid });
  };

  const handleActivate = async (targetGuid: string) => {
    if (!(await confirm('해당 회원의 정지를 해제하시겠습니까?'))) return;
    await unban(targetGuid);
  };

  return { handleSuspend, handleActivate, loading: banLoading || unbanLoading };
}
