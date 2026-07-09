import useFormState from "@/hooks/_common/useFormState.ts";
import useSelect from "@/hooks/_common/api.hook.ts";
import { selectForms } from "@/api/admin/api.forms.ts";
import type { FormItem, RequestSelectForms } from "@/types/type.forms.ts";

export default function useForms() {

    const initData: RequestSelectForms = {
        codeName: '',
    };

    const { state, handleChange } = useFormState(initData);

    const options = {
        apiFn: selectForms,
        req: state,
    };
    const { res, refetch } = useSelect(options);

    return {
        state,
        handleChange,
        res: (res?.dataList ?? []) as FormItem[],
        refetch,
    };
}
