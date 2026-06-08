import { deleteAdminBoard } from '@/api/admin/api.boards';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';

export default function useDeleteAdminBoard(onDeleted?: () => void | Promise<void>) {
    const { alert, confirm } = useModal();

    const onSuccess = async () => {
        await onDeleted?.();
        alert('게시글이 삭제되었습니다.');
    };

    const onFail = () => {
        alert('게시글 삭제에 실패했습니다.');
    };

    const { mutate, loading } = useMutation<string[], void>(deleteAdminBoard, onSuccess, onFail);

    const handleDelete = async (boardGuids: string[]) => {
        if (boardGuids.length === 0) {
            alert('삭제할 게시글을 선택해주세요.');
            return;
        }
        if (!(await confirm(`선택한 ${boardGuids.length}개의 게시글을 삭제하시겠습니까?`))) return;
        await mutate(boardGuids);
    };

    return { handleDelete, loading };
}
