import { createProject } from "@/api/projects/projects.api"
import { useFormState } from '@/hooks/_common/common.hook';
import type { ProjectCreate } from "@/types/type.projects";
import { useMutation } from "../_common/api.hook";
import dayjs from "dayjs";

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
    attachment: undefined,
    image: undefined,
    };

    const { state, setState, handleChange, ...rest } = useFormState(initData);
    const { mutate:projectMutate, loading, error } =   useMutation<ProjectCreate, void>(createProject);
    // const { fileMutate, loading, error } =   useMutation<File, void>(uploadFile);

    const onHandleDeleteSkillChip = (skillCode: string) => {
        if(skillCode){
            const newSkillList = state.skillList?.filter(item => item !== skillCode);
            handleChange("skillList", newSkillList);
        }
    }

    const onSubmit = () => {
        // const formData = new FormData();
        const {attachment, image, ...jsonData} = state
        let attachmentGuid, imageGuid: string;
        // attachmentGuid = fileMutate(attachment);
        // imageGuid = fileMutate(image);
        attachmentGuid = "FILE_TEST_GUID_1";
        imageGuid = "FILE_TEST_GUID_2";
        jsonData["attachmentFileGuid"] = attachmentGuid;
        jsonData["imageFileGuid"] = imageGuid;
        projectMutate(jsonData);

    }

    return {
        values: state,
        setValues: setState,
        onHandleEvent: handleChange,
        onHandleDeleteSkillChip,
        onSubmit: onSubmit,
        loading,
        error,
        ...rest
    }
}