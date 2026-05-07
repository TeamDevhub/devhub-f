import { banAdminUser, unbanAdminUser } from '@/api/admin/api.users';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import type { AdminBanUserRequest } from '@/types/type.user';

type BanRequest = { userGuid: string } & AdminBanUserRequest;

export default function useUpdateUserStatus(onUpdated?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('회원 상태가 변경되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('회원 상태 변경에 실패했습니다.');
  };

  const { mutate: ban, loading: banLoading } = useMutation<BanRequest, void>(
    ({ userGuid, ...req }) => banAdminUser(userGuid, req),
    onSuccess,
    onFail,
    { invalidateKeys: ['admin-users-list'] },
  );

  const { mutate: unban, loading: unbanLoading } = useMutation<string, void>(
    unbanAdminUser,
    onSuccess,
    onFail,
    { invalidateKeys: ['admin-users-list'] },
  );

  const handleSuspend = async (userGuid: string) => {
    if (!(await confirm('해당 회원을 정지 처리하시겠습니까?'))) return;
    await ban({ userGuid });
  };

  const handleActivate = async (userGuid: string) => {
    if (!(await confirm('해당 회원의 정지를 해제하시겠습니까?'))) return;
    await unban(userGuid);
  };

  return { handleSuspend, handleActivate, loading: banLoading || unbanLoading };
}
