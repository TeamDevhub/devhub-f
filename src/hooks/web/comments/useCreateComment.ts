import { useState } from 'react';
import type { CommentCreate } from "@/types/type.comments";
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';
import { createComment } from '@/api/web/api.comments';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

export default function useCreateComment(
    boardGuid:string,
    initialContent?:string,
    onCreated?: () => void,
) {
    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();

    const baseContent = initialContent ?? ""
    const [content, setContentState] = useState<string>(baseContent);
    const [error, setError] = useState<string | undefined>(undefined);

    const setContent = (value: string) => {
        setContentState(value);
        if (error) setError(undefined);
    }

    const handleSuccessCreate = () => {
        alert('댓글이 등록되었습니다.');
        setContent("");
        onCreated?.();
    }

    const handleFailCreate = () => {
        alert('댓글 등록에 실패했습니다.');
    }

    const {mutate:requestCreateComment} = useMutation<CommentCreate, void>(createComment, handleSuccessCreate, handleFailCreate);

    //버튼
    const onSubmit = async () => {
        if (!content.trim()) {
            setError(ERROR_MESSAGES.VALIDATE_REQUIRED);
            return;
        }
        await requireAuth(() => requestCreateComment({
            boardGuid:boardGuid,
            content:content
        }));
    }

    return{
        content, setContent,
        error,
        onSubmit
    };
}
