import { useMutation } from "@/hooks/_common/api.hook.ts";
import { deleteForm } from "@/api/admin/api.forms.ts";
import { useModal } from "@/hooks/_common/useModal.ts";

export default function useDeleteForm(onSuccess?: () => void) {
    const { alert, confirm } = useModal();

    const handleSuccess = () => {
        alert('삭제가 완료되었습니다.');
        onSuccess?.();
    };

    const handleFail = () => {
        alert('삭제가 실패하였습니다.');
    };

    const { mutate } = useMutation<string, void>(deleteForm, handleSuccess, handleFail);

    const handleDelete = async (fieldName: string) => {
        const confirmed = await confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;
        await mutate(fieldName);
    };

    return { handleDelete };
}
