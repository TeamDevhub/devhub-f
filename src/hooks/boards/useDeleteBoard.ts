import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import {deleteBoard} from '@/api/boards/boards.api';

export default function useDeleteBoard() {

    const { alert, confirm, closeModal} = useModal();
    const onSuccess = () => {
        location.reload();
    }
    const onFail = () => {
        alert("게시글 삭제에 실패했습니다.");
    }

    const { mutate } = useMutation<string, void>(deleteBoard, onSuccess, onFail);
    
    const handleDelete = async (boardGuid:string) => {
        const isConfirmed = await confirm("게시글을 삭제하시겠습니까?");
        if(!isConfirmed) {
            closeModal?.();
            return; 
        }
        closeModal?.();
        await mutate(boardGuid);
    }

    return {
        handleDelete
    }
}