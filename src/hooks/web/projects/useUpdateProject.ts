import { updateProject } from "@/api/web/api.projects"
import { deleteFile } from "@/api/web/api.file"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectUpdate, Position } from "@/types/type.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal"
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import { useNavigate } from 'react-router-dom';
import { Validators } from "@/utils/util._common"
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { CONTENT_MAX_LENGTH } from "@/constants/contentLimits";
import { useState } from "react";

export default function useUpdateProject(
    data: ProjectUpdate
) {

    const validations = {
        title: [Validators.required()],
        category: [Validators.required()],
        content: [Validators.required(), Validators.maxLength(CONTENT_MAX_LENGTH)],
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
    const { state, setState, handleChange, createToggle, errors: validateErrors, checkError } = useFormState(data, { validations, mode: 'manual' });
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();
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
        const allowed = await requireAuth();
        if (!allowed) return;

        let returnData;
        if (fileStates && Object.keys(fileStates).length > 0) {
            returnData = await upload();
            if (!returnData.success) {
                alert('파일 업로드에 실패했습니다.');
                return;
            }
        }
        const imageFileGuid = returnData?.data?.fileGuids?.[IMAGE_NAME];
        const attachmentFileGuid = returnData?.data?.fileGuids?.[ATTACHMENT_NAME];
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
            projectId: data.projectGuid as string,
            data: jsonData
        });
    }

    return {
        values: state,
        setValues: setState,
        onHandleEvent: handleChange,
        onSubmit: onSubmit,
        loading,
        error: checkError,
        fileStates,
        imageRef: register(IMAGE_NAME),
        attachmentRef: register(ATTACHMENT_NAME),
        validateErrors,
        fileErrors,
        createToggle,
    }
}