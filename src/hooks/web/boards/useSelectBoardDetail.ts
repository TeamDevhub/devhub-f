import { getBoardDetail } from "@/api/web/api.boards";
import { useSelect } from "@/hooks/_common/api.hook";
import type {BoardDetail} from "@/types/type.boards";

export default function useSelectBoardDetail(
    boardGuid:string,
) {
    const options = {
        apiFn: getBoardDetail,
        req : boardGuid,
    }
    const {res, loading, error} = useSelect<BoardDetail, string>(options);

    return { res, loading, error };
} 