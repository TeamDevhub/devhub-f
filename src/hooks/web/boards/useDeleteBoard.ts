import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import { deleteBoard } from '@/api/web/api.boards';

export default function useDeleteBoard(onDeleted?: () => void) {

    const { alert, confirm } = useModal();
    const onSuccess = () => {
        alert("게시글이 삭제되었습니다.");
        onDeleted?.();
    }
    const onFail = () => {
        alert("게시글 삭제에 실패했습니다.");
    }

    const { mutate } = useMutation<string, void>(deleteBoard, onSuccess, onFail);
    
    const handleDelete = async (boardGuid:string) => {
        const isConfirmed = await confirm("게시글을 삭제하시겠습니까?", { variant: 'warning' });
        if(!isConfirmed) return;
        await mutate(boardGuid);
    }

    return {
        handleDelete
    }
}