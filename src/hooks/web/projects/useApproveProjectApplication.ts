import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import { approveProjectApplication } from "@/api/web/api.projects";
import type { ApproveApplicationRequest } from "@/types/type.projects";
import { projectApplicationListCacheKey } from "@/hooks/web/projects/useSelectProjectApplicationList";

export default function useApproveProjectApplication(projectGuid: string, onDone?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('처리가 완료되었습니다.');
    onDone?.();
  };

  const onFail = () => {
    alert('처리에 실패했습니다.');
  };

  const { mutate, loading } = useMutation<ApproveApplicationRequest, void>(
    approveProjectApplication,
    onSuccess,
    onFail,
    { invalidateKeys: [projectApplicationListCacheKey(projectGuid)] },
  );

  const handleApprove = async (applicationGuid: string) => {
    if (!(await confirm('해당 지원자를 승인하시겠습니까?'))) return;
    await mutate({ projectGuid, applicationGuid, approved: true });
  };

  const handleReject = async (applicationGuid: string) => {
    if (!(await confirm('해당 지원자를 거절하시겠습니까?'))) return;
    await mutate({ projectGuid, applicationGuid, approved: false });
  };

  return { handleApprove, handleReject, loading };
}
