import useFormState from "@/hooks/_common/useFormState.ts";
import type {Banner} from "@/types/type.banner.ts";
import useSelect, {useMutation} from "@/hooks/_common/api.hook.ts";
import {deleteBanner, saveBanner} from "@/api/admin/api.banner.ts";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import {useModal} from "@/hooks/_common/useModal.ts";
import { Validators } from "@/utils/util._common";
import {selectFile} from "@/api/web/api.file.ts";

export default function useBannerPopup( initData: Banner | null, onClose: (isUpdate?:boolean) => void) {
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

    if(initData != null) _init = {..._init, ...initData};

    const validations = {
        alwaysPublication: [Validators.required()],
        used: [Validators.required()],
        bannerType: [Validators.required()],
        title: [Validators.required()],
    };

    const options = {
        apiFn: selectFile,
        req : _init.imageGuid ?? '',
        cacheKey: `boards-${_init.imageGuid}`,
        enabled: !!_init.imageGuid,
    }
    const {res: fileData} = useSelect(options);

    const { state, handleChange, errors, checkError } = useFormState<Banner>(_init, { mode:'manual', validations });
    const { inputRefs, fileStates, register, upload } = useFileUpload();
    const { alert } = useModal();

    const handleSuccess= async () => {
        alert("저장이 완료되었습니다.");
        onClose?.(true);
    }

    const handleFail = () => {
        alert("저장이 실패하였습니다.");
        onClose?.(false);
    }

    const { mutate } = useMutation<Banner, void>(saveBanner, handleSuccess, handleFail);
    const { mutate : deleteMutate } = useMutation<string, void>(deleteBanner, handleSuccess, handleFail);

    const handelSave = async () => {
        if(checkError()) return false;
        let returnData;
        if (fileStates && Object.keys(fileStates).length > 0) {
            returnData = await upload();
            if (!returnData.success) {
                alert('파일 업로드에 실패했습니다.');
                return;
            }
        }

        const imageGuid = returnData?.data?.fileGuids['banner'] ?? state.imageGuid ?? '';
        await mutate({...state, imageGuid});
    }

    const handleDelete = async () => {
        if(state.bannerGuid) await deleteMutate(state.bannerGuid);
        alert("삭제가 완료되었습니다.");
        onClose?.(true);
    }

    return {
        state, handleChange, errors
        , fileName : fileData?.data?.filename
        , handelSave
        , handleDelete
        , inputRefs
        , fileStates
        , fileRef : register('banner')
    }
}