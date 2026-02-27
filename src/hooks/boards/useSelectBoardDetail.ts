import { getBoardDetail } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";

export default function useSelectBoards(boardGuid:string) {

    const options = {
        apiFn: getBoardDetail,
        req : boardGuid,
        cacheKey: `boards-${JSON.stringify(boardGuid)}`
    }
    const {res} = useSelect(options);

    return{
        res
    };
} 