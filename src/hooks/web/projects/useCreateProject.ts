import { createProject } from "@/api/web/api.projects"
import { deleteFile } from "@/api/web/api.file"
import useFormState from '@/hooks/_common/useFormState.ts';
import type { ProjectCreate, Position } from "@/types/type.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal"
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";
import useFileUpload from "@/hooks/_common/useFileUpload.ts";
import { useNavigate } from 'react-router-dom';
import { Validators } from "@/utils/util._common"
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { CONTENT_MAX_LENGTH } from "@/constants/contentLimits";
import { PROJECT_PROGRESS_TYPE } from "@/constants/codes";
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
    // 진행방식이 온라인이면 진행지역은 선택사항이다.
    const progressRegionValidator = (v: string, allState: ProjectCreate) =>
        allState.progressTypeCd === PROJECT_PROGRESS_TYPE.ONLINE.CODE ? null : Validators.required()(v);

    const validations = {
        title: [Validators.required()],
        category: [Validators.required()],
        content: [Validators.required(), Validators.maxLength(CONTENT_MAX_LENGTH)],
        recruitmentTypeCd: [Validators.required()],
        recruitmentStartDate: [Validators.required()],
        recruitmentEndDate: [Validators.required()],
        positionList: [positionValidator],
        progressTypeCd: [Validators.required()],
        progressRegionCd: [progressRegionValidator],
        progressStartDate: [Validators.required()],
        progressEndDate: [Validators.required()],
        skillList: [Validators.minArrayLength(1)],
        applicationFormList: [Validators.minArrayLength(1)],
    }

    const IMAGE_NAME = 'image' as const;
    const ATTACHMENT_NAME = 'attachment' as const;
    const navigate = useNavigate();
    const { state, setState, handleChange, createToggle, errors: validateErrors, checkError } = useFormState(initData, { validations, mode: 'manual' });

    // 온라인으로 전환 시 이전에 선택했던 진행지역은 더 이상 의미가 없으므로 함께 비운다.
    const onProgressTypeChange = (value: string) => {
        if (value === PROJECT_PROGRESS_TYPE.ONLINE.CODE) {
            setState({ progressTypeCd: value, progressRegionCd: '' });
        } else {
            handleChange('progressTypeCd', value);
        }
    };
    const { fileStates, errors: fileErrors, upload, register } = useFileUpload();
    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();
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
    const { mutate: projectMutate, loading: mutateLoading, error } = useMutation<ProjectCreate, void>(createProject, handleSuccessCreateProject, handleFailCreateProject);
    // useMutation의 loading은 projectMutate 호출 구간만 반영해 파일 업로드 중에는 false다.
    // 버튼 연타로 인한 중복 등록을 막으려면 업로드~검증~등록 전 구간을 아우르는 별도 가드가 필요하다.
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async () => {
        if (submitting) return;
        // 파일 업로드 전에 먼저 검증해 불필요한 업로드 API 호출을 막는다.
        if (checkError()) return;
        setSubmitting(true);
        try {
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

            const jsonData = { ...state };
            jsonData.imageFileGuid = imageFileGuid;
            jsonData.attachmentFileGuid = attachmentFileGuid;
            await projectMutate(jsonData);
        } finally {
            setSubmitting(false);
        }
    }

    return {
        values: state,
        setValues: setState,
        onHandleEvent: handleChange,
        onProgressTypeChange,
        onSubmit: onSubmit,
        loading: submitting || mutateLoading,
        error,
        fileStates,
        imageRef: register(IMAGE_NAME),
        attachmentRef: register(ATTACHMENT_NAME),
        validateErrors,
        fileErrors,
        createToggle,
    }
}