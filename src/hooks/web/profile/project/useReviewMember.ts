import { reviewMember } from "@/api/web/api.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import type { ApiResponse } from "@/types/type.api";

export default function useReviewMember(

) {

    const handleFailReviewMember = async (res: ApiResponse<void>) => {
        if (res.code !== 'SUC.DVH.0021') {
            alert(res.error?.message || '사용자 평가에 실패했습니다.');
        }
    }

    const { mutate: reviewMemberMutate } = useMutation<{
        projectGuid: string;
        userGuid: string;
        score: number;
    }, void>(reviewMember, handleFailReviewMember, handleFailReviewMember);

    return { reviewMemberMutate };

}