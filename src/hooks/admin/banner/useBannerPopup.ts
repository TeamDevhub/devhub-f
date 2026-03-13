import useFormState from "@/hooks/_common/useFormState.ts";
import type {Banner} from "@/types/type.banner.ts";
import {useMutation} from "@/hooks/_common/api.hook.ts";
import {deleteBanner, saveBanner} from "@/api/admin/banner/banner.api.ts";

export default function useBannerPopup( initData: Banner | null) {
    let _init = {
        imageGuid: '',
        publicationStartDate: null,
        publicationEndDate: null,
        alwaysPublication: '',
        used: '',
        bannerType: 'MAIN',
        description: '',
        title: '',
        link: '',
    } as Banner;
    if(initData != null) _init = initData;

    const { state, handleChange } = useFormState<Banner>(_init);

    const handleSuccess= () => {

    }

    const handleFail = () => {

    }

    const { mutate } = useMutation<Banner, void>(saveBanner, handleSuccess, handleFail);
    const { mutate : deleteMutate } = useMutation<string, void>(deleteBanner, handleSuccess, handleFail);

    const handelSave = async () => {
        await mutate(state);
    }
    const handleDelete = async () => {
        if(state.bannerGuid) await deleteMutate(state.bannerGuid);
    }

    return {
        state, handleChange
        , handelSave
        , handleDelete
    }
}