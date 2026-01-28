import { createProject } from "@/api/projects/projects.api"
import { useFormState } from '@/hooks/_common/common.hook';
import type { ProjectCreate } from "@/types/type.projects";
import { useMutation } from "../_common/api.hook";
import dayjs from "dayjs";
import { useState } from "react"

export default function useCreateProject() {
    const initData: ProjectCreate = {
    category: '',
    title: '',
    content: '',
    recruitmentTypeCd: '3001',
    recruitmentStartDate: dayjs(),
    recruitmentEndDate: dayjs(),
    progressTypeCd: '3101',
    prgressRegionCd: '',
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
    attachments: [],
    images: []
    };

    const { state, setState, handleChange, ...rest } = useFormState(initData);
    const { mutate, loading, error } =   useMutation<FormData, void>(createProject);

    const onHandleDeleteSkillChip = (skillCode: string) => {
        if(skillCode){
            const newSkillList = state.skillList?.filter(item => item !== skillCode);
            handleChange("skillList", newSkillList);
        }
    }

    const onSubmit = () => {
        const formData = new FormData();
        const {attachments, images, ...jsonData} = state

        formData.append(
            "request",
            new Blob([JSON.stringify(jsonData)], {type: "application/json"})
        );
        if(attachments && attachments.length > 0) {
            attachments.forEach((attachment) => {
                formData.append("attachments", attachment);
            });
        }
        if(images && images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image);
            });
        }

        mutate(formData);
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