import type { ReportCreate } from "@/types/type.reports";
import { useMutation } from '@/hooks/_common/api.hook';
import {createReport} from '@/api/web/api.reports';
import useFormState from '@/hooks/_common/useFormState';
import { useModal } from '@/hooks/_common/useModal';
import { Validators } from '@/utils/util._common';

export default function useCreateReport(
    boardGuid:string,
    commentGuid:string|null,
    initialContent?:string,
    onClose?: () => void
) {
    const initData: ReportCreate = {
        boardGuid,
        categoryCd: '',
        reason: initialContent ?? '',
    };

    const validations = {
        categoryCd: [Validators.required()],
        reason: [Validators.required()],
    };

    const { state, errors, handleChange, checkError, reset } = useFormState(initData, { validations, mode: 'manual' });
    const { alert } = useModal();
    
    const handleSuccessCreate = () => {
        alert('신고가 접수되었습니다.');
        reset();
        onClose?.();
    }

    const handleFailCreate = () => {
        alert('신고 접수에 실패했습니다.');
    }

    const {mutate:requestCreateReport} = useMutation<ReportCreate, void>(createReport, handleSuccessCreate, handleFailCreate);

    const handleSubmit = async () => {
        if (checkError()) return false;

        const reportData: ReportCreate = {
            boardGuid,
            categoryCd: state.categoryCd,
            reason: state.reason.trim(),
        };

        if (commentGuid) {
            reportData.commentGuid = commentGuid;
        }

        await requestCreateReport(reportData);
        return false;
    }

    const onHandleEvent = (value:string) => {
        handleChange('categoryCd', value);
    }

    return{
        content: state.reason,
        setContent: (value: string) => handleChange('reason', value),
        categoryCd: state.categoryCd,
        errors,
        onHandleEvent,
        handleSubmit,
    };
} 
