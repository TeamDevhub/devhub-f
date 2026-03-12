import { getBoardDetail } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";
import type {BoardDetail} from "@/types/type.boards";

export default function useSelectBoardDetail(
    boardGuid:string,
) {
    const options = {
        apiFn: getBoardDetail,
        req : boardGuid,
    }
    const {res} = useSelect<BoardDetail, string>(options);

    return { res };
} 