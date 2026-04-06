import { useState } from 'react';
import type { CommentCreate } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import {createComment} from '@/api/boards/comments.api';

export default function useCreateComment(
    boardGuid:string,
    initialContent?:string,
) {
    
    const handleSuccessCreate = () => {
        alert('생성이 완료되었습니다.');
        location.reload();
        setContent("");
    }

    const handleFailCreate = () => {
        alert('생성이 실패되었습니다.');
    }

    const baseContent = initialContent ?? ""
    const [content, setContent] = useState<string>(baseContent);
    const {mutate:requestCreateComment} = useMutation<CommentCreate, void>(createComment, handleSuccessCreate, handleFailCreate);

    //버튼
    const onSubmit = async () => {
        if(!content) return;
        await requestCreateComment({
            boardGuid:boardGuid,
            content:content
        })
    }

    return{
        content, setContent,
        onSubmit
    };
} 