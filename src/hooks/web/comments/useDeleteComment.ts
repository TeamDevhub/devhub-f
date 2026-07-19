import type { CommentDelete } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import {deleteComment} from '@/api/web/api.comments';

export default function useDeleteComment(
    onDeleted?: () => void,
) {
    const { alert } = useModal();

    const handleSuccessDelete = () => {
        alert('댓글이 삭제되었습니다.');
        onDeleted?.();
    }

    const handleFailDelete = () => {
        alert('댓글 삭제에 실패했습니다.');
    }

    const {mutate:requestDeleteComment} = useMutation<CommentDelete, void>(deleteComment, handleSuccessDelete, handleFailDelete);

    //버튼
    const handleDelete = async (boardGuid:string, commentGuid:string) => {
        if(!boardGuid || !commentGuid) return;
        await requestDeleteComment({
            boardGuid:boardGuid,
            commentGuid:commentGuid,
        })
    }

    return{
        handleDelete
    };
}
