import { cancelProjectApplication } from "@/api/web/api.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import type { ApiResponse } from "@/types/type.api";

export default function useCancelApplication(onDone?: () => void) {
  const { alert } = useModal();

  const handleSuccess = () => {
    alert('지원이 취소되었습니다.');
    onDone?.();
  };

  const handleFail = (res: ApiResponse<void>) => {
    alert(res.error?.message || '지원 취소에 실패했습니다.');
  };

  const { mutate: cancelApplicationMutate, loading } = useMutation<string, void>(
    cancelProjectApplication,
    handleSuccess,
    handleFail,
  );

  return { cancelApplicationMutate, loading };
}
