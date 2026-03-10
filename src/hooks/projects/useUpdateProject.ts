import { updateProject } from "@/api/projects/projects.api"
import { deleteFile } from "@/api/file/file.api"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectUpdate, Position } from "@/types/type.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal"
import dayjs from "dayjs";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import { useNavigate } from 'react-router-dom';
import { Validators } from "@/utils/util._common"
import { ERROR_MESSAGES } from "@/types/const.errorMessages.ts";
import { useState, useEffect, useMemo } from "react";
import type { ProjectFormDetailResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";
import { getProjectFormDetail } from "@/api/projects/projects.api";

export default function useUpdateProject(
    projectId?: string
) {
    const options = {
        apiFn: getProjectFormDetail,
        req: projectId!,
        cacheKey: projectId ? `project-detail-${projectId}` : undefined,
        enabled: !!projectId,
    }

    const { res, error } = useSelect<ProjectUpdate, string>(options);

    // const [initData, setInitData] = useState<ProjectUpdate>({
    //     category: '',
    //     title: '',
    //     content: '',
    //     recruitmentTypeCd: '3001',
    //     recruitmentStartDate: dayjs(),
    //     recruitmentEndDate: dayjs(),
    //     progressTypeCd: '3101',
    //     progressRegionCd: '',
    //     progressStartDate: dayjs(),
    //     progressEndDate: dayjs(),
    //     skillList: [],
    //     positionList: [{
    //         position: '',
    //         level: '',
    //         capacity: 0,
    //     }],
    //     applicationFormList: [],
    //     additionalFormList: [],
    // });
    // useEffect(() => {
    //     if (!res?.data) return;
    //     setInitData({
    //         category: res.data.category,
    //         title: res.data.title,
    //         content: res.data.content,
    //         recruitmentTypeCd: res.data.recruitmentTypeCd,
    //         recruitmentStartDate: res.data.recruitmentStartDate,
    //         recruitmentEndDate: res.data.recruitmentEndDate,
    //         progressTypeCd: res.data.progressTypeCd,
    //         progressRegionCd: res.data.progressRegionCd,
    //         progressStartDate: res.data.progressStartDate,
    //         progressEndDate: res.data.progressEndDate,
    //         skillList: res.data.skillList,
    //         positionList: res.data.positionList,
    //         applicationFormList: res.data.applicationFormList,
    //         additionalFormList: res.data.additionalFormList,
    //     })
    // }, [res]);

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
    const navigate = useNavigate();
    const { state, setState, handleChange, createToggle, errors: validateErrors, checkError } = useFormState(res.data, { validations, mode: 'manual' });
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { alert } = useModal();
    const [fileGuids, setFileGuids] = useState<string[]>([]);
    const { mutate: fileDeleteMutate } = useMutation<string, void>(deleteFile);
    const handleSuccessUpdateProject = () => {
        alert('프로젝트가 수정되었습니다.');
        navigate('/projects');
    }
    const handleFailUpdateProject = async () => {
        alert('프로젝트 수정에 실패했습니다.');
        try {
            await Promise.all(
                fileGuids.map(fileGuid =>
                    fileDeleteMutate(fileGuid)
                )
            )
        } catch {
            console.log("file delete error");
        }
    }
    const { mutate: projectMutate, loading } = useMutation<{
        projectId: string;
        data: ProjectUpdate;
    }, void>(updateProject, handleSuccessUpdateProject, handleFailUpdateProject);

    const onSubmit = async () => {
        let returnData;
        if (fileStates && Object.keys(fileStates).length > 0) {
            returnData = await upload();
            if (!returnData.success) {
                alert('파일 업로드에 실패했습니다.');
                return;
            }
        }
        const imageFileGuid = returnData?.data?.[IMAGE_NAME];
        const attachmentFileGuid = returnData?.data?.[ATTACHMENT_NAME];
        setFileGuids(
            [imageFileGuid, attachmentFileGuid].filter(
                (guid): guid is string => !!guid
            )
        );

        checkError();
        const error = Object.entries(validateErrors).find(([, value]) => !!value);
        if (error) {
            alert(`${error[0]}은/는 ${error[1]}`);
            return;
        }

        const jsonData = { ...state };
        jsonData.imageFileGuid = imageFileGuid;
        jsonData.attachmentFileGuid = attachmentFileGuid;
        await projectMutate({
            projectId: initData?.data?.projectGuid as string,
            data: jsonData
        });
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