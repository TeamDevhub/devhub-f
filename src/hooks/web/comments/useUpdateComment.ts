import { useState } from 'react';
import type { CommentUpdate } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import {updateComment} from '@/api/web/api.comments';

export default function useUpdateComment(
    boardGuid:string,
    commentGuid:string,
    content:string,
) {
    
    const handleSuccessUpdate = () => {
        alert('수정이 완료되었습니다.');
        location.reload();
        setUpdateContent("");
    }

    const handleFailUpdate = () => {
        alert('수정이 실패되었습니다.');
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