import useFormState from "@/hooks/_common/useFormState.ts";
import { useMutation } from "@/hooks/_common/api.hook.ts";
import { saveForm } from "@/api/admin/api.forms.ts";
import { useModal } from "@/hooks/_common/useModal.ts";
import { Validators } from "@/utils/util._common.ts";
import type { FormItem, RequestSaveForm } from "@/types/type.forms.ts";

export default function useFormPopup(initData: FormItem | null, onClose: (saved: boolean) => void) {
    const init: RequestSaveForm = {
        fieldName: '',
        type: 'text',
        usedYn: 'Y',
        defaultFieldYn: 'N',
        insert: true,
    };

    const initialValue: RequestSaveForm = initData
        ? { fieldName: initData.fieldName, type: initData.type, usedYn: initData.usedYn, defaultFieldYn: initData.defaultFieldYn, insert: false }
        : init;

    const validations = {
        fieldName: [Validators.required()],
        type: [Validators.required()],
    };

    const { state, handleChange, reset, checkError } = useFormState<RequestSaveForm>(initialValue, { mode: 'manual', validations });
    const { alert } = useModal();

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
        await mutate(state);
    };

    return { state, handleChange, reset, handleSave };
}
