import { getBoardDetail, likeBoard } from "@/api/web/api.boards";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";
import type {BoardDetail} from "@/types/type.boards";

export default function useSelectBoardDetail(
    boardGuid?:string,
) {
    const options = {
        apiFn: getBoardDetail,
        req : boardGuid!,
        enabled: !!boardGuid,
    }
    const {res, loading, error, refetch} = useSelect<BoardDetail, string>(options);

    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();
    const { mutate: likeBoardMu } = useMutation(likeBoard, undefined, () => alert('좋아요 처리에 실패했습니다.'));

    const toggleLike = (boardGuid: string) => requireAuth(() => likeBoardMu(boardGuid));

    return { res, loading, error, refetch, toggleLike };
}
