import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import {deleteBoard} from '@/api/web/boards.api';

export default function useDeleteBoard(onSuccessAdminBoardDelete?: () => void) {

    const { alert, confirm, closeModal} = useModal();
    const onSuccess = () => {
        if(onSuccessAdminBoardDelete) {
            onSuccessAdminBoardDelete();
        } else {
            location.reload();
        }
    }
    const onFail = () => {
        alert("게시글 삭제에 실패했습니다.");
    }

    const { mutate } = useMutation<string[], void>(deleteBoard, onSuccess, onFail);
    
    const handleDelete = async (boardGuids:string | string[]) => {
        const requestData = Array.isArray(boardGuids) ? boardGuids : [boardGuids];
        const isConfirmed = await confirm("게시글을 삭제하시겠습니까?");
        if(!isConfirmed) {
            closeModal?.();
            return; 
        }
        closeModal?.();
        await mutate(requestData);
    }

    return {
        handleDelete
    }
}