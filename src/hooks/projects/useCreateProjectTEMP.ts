import { createProject } from "@/api/projects/projects.api"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectCreate } from "@/types/type.projects";
import { useMutation } from "../_common/api.hook";
import dayjs from "dayjs";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";

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
    progressPeriod: '',
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

    const IMAGE_NAME = 'image' as const;
    const ATTACHMENT_NAME = 'attachment' as const;
    const { state, setState, handleChange, createToggle, errors: validateErrors } = useFormState(initData);
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { mutate:projectMutate, loading, error } =   useMutation<ProjectCreate, void>(createProject,
        ()=>{ //onSuccess
            //페이지 이동처리
        },
        ()=>{ //onFail
            //실패 처리 새로고침 등
            //기존데이터 삭제 필요할 경우 아래
            //혹은 업로드는 되어서 fileGUID가 있으면 업로드를 스킵한다거나 이런코드가 추가될 수 있겠네요.. 근데그러면 파일 변화를 감지해야합니다
            //setState(initData)
            //clearAll() //useFileUpload 제공
        }
    );

    // const onHandleDeleteSkillChip = (skillCode: string) => {
    //     if(skillCode){
    //         const newSkillList = state.skillList?.filter(item => item !== skillCode);
    //         handleChange("skillList", newSkillList);
    //     }
    // }

    // 해당코드 대신 그냥 toggle써도 동작하지 않을까 합니다

    const onSubmit = async () => {
        // const formData = new FormData();
        const returnData = await upload();

        if(!returnData.success) return; //실패처리 코드 필요
        if(!returnData.data) return; //실패처리 코드 필요

        const jsonData = {...state};
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
        //이하 수정됨
        fileStates,
        imageRef:register(IMAGE_NAME),
        attachmentRef:register(ATTACHMENT_NAME),
        validateErrors,
        fileErrors,
        createToggle,
    }
}