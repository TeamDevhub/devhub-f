import type { BoardCreate } from "@/types/type.boards";
import {createBoard} from '@/api/web/api.boards';
import { useMutation } from '@/hooks/_common/api.hook';
import { Validators } from '@/utils/util._common';
import useFormState from "@/hooks/_common/useFormState.ts";
import { useNavigate } from 'react-router-dom';

const initData : BoardCreate = {
    title:'',
    content:'',
    categoryCd:''
};

export default function useCreateBoard() {

    const validations = {
        title : [Validators.required()],
        content : [Validators.required()],
        categoryCd : [Validators.required()],
    }

    const navigate = useNavigate();
    const handleSuccessCreate = () => {
        alert('생성이 완료되었습니다.');
        navigate(`/boards`);
    }

    const handleFailCreate = () => {
        alert('생성이 실패되었습니다.');
    }

    const {state, setState, handleChange, checkError, errors} = useFormState(initData, {validations, mode:'manual'}); 
    const {mutate:requestCreateBoard} = useMutation<BoardCreate, void>(createBoard, handleSuccessCreate, handleFailCreate);

    const onSubmit = async () => {
        if (checkError()) {return;}
        await requestCreateBoard(state);
    };

    return {
        values: state,
        setValues: setState,
        errors : errors,
        onHandleEvent : handleChange,
        onSubmit: onSubmit,
    }
}