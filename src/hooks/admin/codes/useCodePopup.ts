import useFormState from "@/hooks/_common/useFormState.ts";
import type {CommonCodeItem} from "@/types/type._common.ts";
import {useMutation} from "@/hooks/_common/api.hook.ts";
import {saveCode} from "@/api/admin/codes/codes.api.ts";
import {Validators} from "@/utils/util._common.ts";

export default function useCodePopup(initCodeItem?:CommonCodeItem, onClose?: (save:boolean) => void) {

    const validations = {
        code: [Validators.required()],
        parentCode: [Validators.required()],
    };

    const initData = {
        code : "",
        parentCode : "",
        name : "",
        used : true,
        remarks : "",
        order : ""
    } as CommonCodeItem;

    const { state, handleChange, reset, checkError } = useFormState(initCodeItem ?? initData, {mode:"manual", validations});

    const handleSuccess= async () => {
        alert("저장이 완료되었습니다.");
        reset();
        onClose?.(true);
    }

    const handleFail = () => {
        alert("저장이 실패하였습니다.");
        onClose?.(false);
    }

    const { mutate } = useMutation<CommonCodeItem, void>(saveCode, handleSuccess, handleFail);

    const handleSave = async () => {
        if(checkError()) return false;
          await mutate(state);
    }

    return {
        state,
        handleChange,
        reset,
        handleSave,
    }
}