import type { BoardCreate } from "@/types/type.boards";
import {createBoard} from '@/api/web/api.boards';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';
import { Validators } from '@/utils/util._common';
import { CONTENT_MAX_LENGTH } from '@/constants/contentLimits';
import useFormState from "@/hooks/_common/useFormState.ts";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initData : BoardCreate = {
    title:'',
    content:'',
    categoryCd:''
};

export default function useCreateBoard() {

    const validations = {
        title : [Validators.required()],
        content : [Validators.required(), Validators.maxLength(CONTENT_MAX_LENGTH)],
        categoryCd : [Validators.required()],
    }

    const navigate = useNavigate();
    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();

    const handleSuccessCreate = () => {
        alert('생성이 완료되었습니다.');
        navigate(`/boards`);
    }

    const handleFailCreate = () => {
        alert('생성이 실패되었습니다.');
    }

    const {state, setState, handleChange, checkError, errors} = useFormState(initData, {validations, mode:'manual'});
    const {mutate:requestCreateBoard, loading} = useMutation<BoardCreate, void>(createBoard, handleSuccessCreate, handleFailCreate);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async () => {
        if (submitting) return;
        if (checkError()) {return;}
        setSubmitting(true);
        try {
            await requireAuth(() => requestCreateBoard(state));
        } finally {
            setSubmitting(false);
        }
    };

    return {
        values: state,
        setValues: setState,
        errors : errors,
        onHandleEvent : handleChange,
        onSubmit: onSubmit,
        loading: submitting || loading,
    }
}