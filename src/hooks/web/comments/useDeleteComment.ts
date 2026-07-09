import type { CommentDelete } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import {deleteComment} from '@/api/web/api.comments';

export default function useDeleteComment(
) {
    const handleSuccessCreate = () => {
        alert('삭제가 완료되었습니다.');
        location.reload();
    }

    const handleFailCreate = () => {
        alert('삭제가 실패되었습니다.');
    }

    const {mutate:requestDeleteComment} = useMutation<CommentDelete, void>(deleteComment, handleSuccessCreate, handleFailCreate);

    //버튼
    const handleDelete = async (boardGuid:string, commentGuid:string) => {
        console.log(boardGuid, commentGuid);
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