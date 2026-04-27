import { useState } from 'react';
import type { CommentUpdate } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import {createComment} from '@/api/web/api.comments';

export default function useUpdateComment(
    boardGuid:string,
    commentGuid:string,
    content:string,
) {
    
    const handleSuccessCreate = () => {
        alert('생성이 완료되었습니다.');
        location.reload();
        setUpdateContent("");
    }

    const handleFailCreate = () => {
        alert('생성이 실패되었습니다.');
    }

    const [updateContent, setUpdateContent] = useState<string>(content);
    const {mutate:requestUpdateComment} = useMutation<CommentUpdate, void>(createComment, handleSuccessCreate, handleFailCreate);

    //버튼
    const handleUpdate = async () => {
        if(!updateContent) return;
        await requestUpdateComment({
            boardGuid:boardGuid,
            commentGuid:commentGuid,
            content:content
        })
    }

    return{
        updateContent, setUpdateContent,
        handleUpdate
    };
} 