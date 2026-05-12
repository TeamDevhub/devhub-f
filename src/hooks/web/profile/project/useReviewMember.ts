import { reviewMember } from "@/api/web/api.projects";
import useFormState from '@/hooks/_common/useFormState.ts';
import type { FilterData, ProjectExtra, ProjectSearchRequest, SearchData } from "@/types/type.projects";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";

export default function useReviewMember(

) {

    const handleFailReviewMember = async (res: any) => {
        if (res.code !== 'SUC.DVH.0021') {
            alert(res.error.message || '사용자 평가에 실패했습니다.');
        }
    }

    const { mutate: reviewMemberMutate } = useMutation<{
        projectGuid: string;
        userGuid: string;
        score: number;
    }, void>(reviewMember, handleFailReviewMember, handleFailReviewMember);

    return { reviewMemberMutate };

}