import { createProject } from "@/api/projects/projects.api"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectCreate, Position } from "@/types/type.projects";
import { useMutation } from "../_common/api.hook";
import dayjs from "dayjs";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import { Validators } from "@/utils/util._common"
import { ERROR_MESSAGES } from "@/types/errorMessages.const.ts";

export default function useCreateProject() {
    const initData: ProjectCreate = {
        category: '',
        title: '',
        content: '',
        recruitmentTypeCd: '3001',
        recruitmentStartDate: dayjs(),
        recruitmentEndDate: dayjs(),
        progressTypeCd: '3101',
        progressRegionCd: '',
        progressStartDate: dayjs(),
        progressEndDate: dayjs(),
        skillList: [],
        positionList: [{
            position: '',
            level: '',
            capacity: 0,
        }],
        applicationFormList: [],
        additionalFormList: [],
    };

    const validations = {
        title: [Validators.required()],
        category: [Validators.required()],
        content: [Validators.required()],
        recruitmentTypeCd: [Validators.required()],
        recruitmentStartDate: [Validators.required()],
        recruitmentEndDate: [Validators.required()],
        progressTypeCd: [Validators.required()],
        progressRegionCd: [Validators.required()],
        progressStartDate: [Validators.required()],
        progressEndDate: [Validators.required()],
        skillList: [Validators.minArrayLength(1)],
        positionList: [(v: Position[]) => v.length >= 1 ? null : ERROR_MESSAGES.VALIDATE_MIN_ARRAY_LENGTH(1)]
    }

    const IMAGE_NAME = 'image' as const;
    const ATTACHMENT_NAME = 'attachment' as const;
    const { state, setState, handleChange, createToggle, errors: validateErrors, checkError } = useFormState(initData, { validations });
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { mutate: projectMutate, loading, error } = useMutation<ProjectCreate, void>(createProject,
        () => { //onSuccess
            //페이지 이동처리
        },
        () => { //onFail
            //실패 처리 새로고침 등
            //기존데이터 삭제 필요할 경우 아래
            //혹은 업로드는 되어서 fileGUID가 있으면 업로드를 스킵한다거나 이런코드가 추가될 수 있겠네요.. 근데그러면 파일 변화를 감지해야합니다
            //setState(initData)
            //clearAll() //useFileUpload 제공
        }
    );

    const onSubmit = async () => {
        const returnData = await upload();

        if (!returnData.success) return; //실패처리 코드 필요
        if (!returnData.data) return; //실패처리 코드 필요

        checkError();
        const error = Object.entries(validateErrors).find(([_, value]) => !!value);
        if (error) {
            alert(`${error[0]}은/는 ${error[1]}`);
            return;
        }

        const jsonData = { ...state };
        jsonData.imageFileGuid = returnData.data?.[IMAGE_NAME];
        jsonData.attachmentFileGuid = returnData.data?.[ATTACHMENT_NAME];
        await projectMutate(jsonData);
    }

    return {
        values: state,
        setValues: setState,
        onHandleEvent: handleChange,
        onSubmit: onSubmit,
        loading,
        error,
        fileStates,
        imageRef: register(IMAGE_NAME),
        attachmentRef: register(ATTACHMENT_NAME),
        validateErrors,
        fileErrors,
        createToggle,
    }
}