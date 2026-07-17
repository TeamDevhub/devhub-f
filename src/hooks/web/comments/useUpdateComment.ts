import { useState } from 'react';
import type { CommentUpdate } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import {updateComment} from '@/api/web/api.comments';

export default function useUpdateComment(
    boardGuid:string,
    commentGuid:string,
    content:string,
    onUpdated?: () => void,
) {
    const { alert } = useModal();

    const handleSuccessUpdate = () => {
        alert('댓글이 수정되었습니다.');
        onUpdated?.();
    }

    const handleFailUpdate = () => {
        alert('댓글 수정에 실패했습니다.');
    }

    const [updateContent, setUpdateContent] = useState<string>(content);
    const {mutate:requestUpdateComment} = useMutation<CommentUpdate, void>(updateComment, handleSuccessUpdate, handleFailUpdate);

    //버튼
    const handleUpdate = async () => {
        if(!updateContent) return;
        await requestUpdateComment({
            boardGuid:boardGuid,
            commentGuid:commentGuid,
            content:updateContent
        })
    }

    return{
        updateContent, setUpdateContent,
        handleUpdate
    };
}
