import { useFormState } from '@/hooks/_common/common.hook';
import type { BoardBasic } from "@/types/type.boards";
import {createBoard} from '@/api/boards/boards.api';
import { useMutation } from '@/hooks/_common/api.hook';
import { Validators } from '@/utils/util._common';

const initData : BoardBasic = {
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

    const handleSuccessCreate = () => {
        alert('생성이 완료되었습니다.');
    }

    const handleFailCreate = () => {
        alert('생성이 실패되었습니다.');
    }

    const {state, setState, handleChange, checkError, errors} = useFormState(initData, {validations, mode:'manual'}); 
    const {mutate:requestCreateBoard} = useMutation<BoardBasic, void>(createBoard, handleSuccessCreate, handleFailCreate); 

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