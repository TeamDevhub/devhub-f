import { updateApplicantStatus } from '@/api/admin/api.project';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import { PROJECT_APPROVAL_STATUS } from '@/constants/codes';
import type { UpdateApplicantStatusRequest } from '@/types/type.project';

export default function useUpdateApplicantStatus(projectGuid: string | undefined, onUpdated?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('지원자 상태가 변경되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('지원자 상태 변경에 실패했습니다.');
  };

  const { mutate, loading } = useMutation<UpdateApplicantStatusRequest, void>(
    updateApplicantStatus,
    onSuccess,
    onFail,
    {
      invalidateKeys: projectGuid ? [`admin-applicants-${projectGuid}`] : [],
    },
  );

  const handleApprove = async (applicantGuid: string) => {
    if (!projectGuid) return;
    if (!(await confirm('해당 지원자를 승인하시겠습니까?'))) return;
    await mutate({ projectGuid, applicantGuid, approvalStatusCd: PROJECT_APPROVAL_STATUS.COMPLETE.CODE });
  };

  const handleReject = async (applicantGuid: string) => {
    if (!projectGuid) return;
    if (!(await confirm('해당 지원자를 거절하시겠습니까?'))) return;
    await mutate({ projectGuid, applicantGuid, approvalStatusCd: PROJECT_APPROVAL_STATUS.REJECT.CODE });
  };

  return { handleApprove, handleReject, loading };
}
