import { reviewMember } from "@/api/web/api.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import type { ApiResponse } from "@/types/type.api";

export default function useReviewMember(

) {
    const { alert } = useModal();

    const handleSuccessReviewMember = () => {
        alert('평가가 등록되었습니다.');
    }

    const handleFailReviewMember = (res: ApiResponse<void>) => {
        alert(res.error?.message || '사용자 평가에 실패했습니다.');
    }

    const { mutate: reviewMemberMutate } = useMutation<{
        projectGuid: string;
        userGuid: string;
        score: number;
    }, void>(reviewMember, handleSuccessReviewMember, handleFailReviewMember);

    return { reviewMemberMutate };

}