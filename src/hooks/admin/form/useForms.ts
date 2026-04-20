import useFormState from "@/hooks/_common/useFormState.ts";
import useSelect from "@/hooks/_common/api.hook.ts";

export default function useForms() {

    const initData = {}

    const {
        state, handleChange
    } = useFormState(initData);

    const options = {
        apiFn: selectForms,
        req : state,
    }
    const {res} = useSelect(options);

    return {
        state,
        handleChange,
        res,
    }
}