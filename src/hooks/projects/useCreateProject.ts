import { createProject, createProjectLike } from "@/api/projects/projects.api"
import { deleteFile } from "@/api/file/file.api"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectCreate, Position } from "@/types/type.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal"
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import { useNavigate } from 'react-router-dom';
import { Validators } from "@/utils/util._common"
import { ERROR_MESSAGES } from "@/types/const.errorMessages.ts";
import { useState } from "react";

export default function useCreateProject() {
    const initData: ProjectCreate = {
        category: '',
        title: '',
        content: '',
        recruitmentTypeCd: '3001',
        recruitmentStartDate: null,
        recruitmentEndDate: null,
        progressTypeCd: '3101',
        progressRegionCd: '',
        progressStartDate: null,
        progressEndDate: null,
        skillList: [],
        positionList: [{
            position: '',
            level: '',
            capacity: 0,
        }],
        applicationFormList: [],
        additionalFormList: [],
    };

    const positionValidator = (v: Position[]) => {
        if (v.length == 0) {
            return ERROR_MESSAGES.VALIDATE_MIN_ARRAY_LENGTH(1);
        }
        const filterdPosition = v.filter(position => position.position == '' || position.level == '' || position.capacity == 0);
        if (filterdPosition.length > 0) {
            return '모집인원을 선택해주세요.';
        }
        return null;
    }
    const validations = {
        title: [Validators.required()],
        category: [Validators.required()],
        content: [Validators.required()],
        recruitmentTypeCd: [Validators.required()],
        recruitmentStartDate: [Validators.required()],
        recruitmentEndDate: [Validators.required()],
        positionList: [positionValidator],
        progressTypeCd: [Validators.required()],
        progressRegionCd: [Validators.required()],
        progressStartDate: [Validators.required()],
        progressEndDate: [Validators.required()],
        skillList: [Validators.minArrayLength(1)],
    }

    const IMAGE_NAME = 'image' as const;
    const ATTACHMENT_NAME = 'attachment' as const;
    const navigate = useNavigate();
    const { state, setState, handleChange, createToggle, errors: validateErrors, checkError } = useFormState(initData, { validations, mode: 'manual' });
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { alert } = useModal();
    const [fileGuids, setFileGuids] = useState<string[]>([]);
    const { mutate: fileDeleteMutate } = useMutation<string, void>(deleteFile);
    const handleSuccessCreateProject = () => {
        alert('프로젝트가 생성되었습니다.');
        navigate('/projects');
    }
    const handleFailCreateProject = async () => {
        alert('프로젝트 생성에 실패했습니다.');
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
    const { mutate: projectMutate, loading, error } = useMutation<ProjectCreate, void>(createProject, handleSuccessCreateProject, handleFailCreateProject);

    const onSubmit = async () => {
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
        console.log(Object.entries(validateErrors));
        const error = Object.entries(validateErrors).find(([, value]) => !!value);
        if (error) {
            alert(`${error[0]}은/는 ${error[1]}`);
            return;
        }

        const jsonData = { ...state };
        jsonData.imageFileGuid = imageFileGuid;
        jsonData.attachmentFileGuid = attachmentFileGuid;
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