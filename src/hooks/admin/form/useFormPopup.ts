import { useState } from 'react';
import useFormState from "@/hooks/_common/useFormState.ts";
import { useMutation } from "@/hooks/_common/api.hook.ts";
import { saveForm } from "@/api/admin/api.forms.ts";
import { useModal } from "@/hooks/_common/useModal.ts";
import { Validators } from "@/utils/util._common.ts";
import type { FormFieldType, FormItem, RequestSaveForm } from "@/types/type.forms.ts";

const OPTION_TYPES: FormFieldType[] = ['radio', 'select', 'checkbox'];

export default function useFormPopup(initData: FormItem | null, onClose: (saved: boolean) => void) {
    const init: RequestSaveForm = {
        fieldName: '',
        type: 'text',
        helpYn: 'false',
        usedYn: 'Y',
        defaultFieldYn: 'N',
    };

    const initialValue: RequestSaveForm = initData
        ? { applicationFormGuid: initData.applicationFormGuid, fieldName: initData.fieldName, type: initData.type, helpYn: initData.helpYn, helpText: initData.helpText, usedYn: initData.usedYn, defaultFieldYn: initData.defaultFieldYn }
        : init;

    const validations = {
        fieldName: [Validators.required()],
        type: [Validators.required()],
    };

    const { state, handleChange: setField, reset: resetState, checkError } = useFormState<RequestSaveForm>(initialValue, { mode: 'manual', validations });
    const [options, setOptions] = useState<string[]>(initData?.options ?? ['']);
    const { alert } = useModal();

    const handleChange = (key: keyof RequestSaveForm, value: string) => {
        if (key === 'type' && !OPTION_TYPES.includes(value as FormFieldType)) {
            setOptions(['']);
        }
        setField(key, value);
    };

    const handleAddOption = () => setOptions(prev => [...prev, '']);

    const handleRemoveOption = (idx: number) => {
        setOptions(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
    };

    const handleOptionChange = (idx: number, value: string) => {
        setOptions(prev => prev.map((v, i) => i === idx ? value : v));
    };

    const reset = () => {
        setOptions(['']);
        resetState();
    };

    const handleSuccess = () => {
        alert('저장이 완료되었습니다.');
        reset();
        onClose(true);
    };

    const handleFail = () => {
        alert('저장이 실패하였습니다.');
        onClose(false);
    };

    const { mutate } = useMutation<RequestSaveForm, void>(saveForm, handleSuccess, handleFail);

    const handleSave = async () => {
        if (checkError()) return false;
        const payload: RequestSaveForm = OPTION_TYPES.includes(state.type)
            ? { ...state, options }
            : state;
        console.log('[FormPopup] save payload:', payload);
        await mutate(payload);
    };

    return { state, handleChange, reset, handleSave, options, handleAddOption, handleRemoveOption, handleOptionChange };
}
