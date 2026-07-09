import { processAdminReport } from '@/api/admin/api.reports';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';

export default function useProcessReport(onUpdated?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('신고가 처리 완료로 변경되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('신고 처리에 실패했습니다.');
  };

  const { mutate, loading } = useMutation<string, void>(
    processAdminReport,
    onSuccess,
    onFail,
  );

  const handleProcess = async (reportGuid: string) => {
    if (!(await confirm('해당 신고를 처리 완료로 변경하시겠습니까?'))) return;
    await mutate(reportGuid);
  };

  return { handleProcess, loading };
}
