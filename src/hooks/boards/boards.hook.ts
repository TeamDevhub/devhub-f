import { getBoards } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";
import type { BoardListResponse, BoardSearchRequest } from "@/types/type.boards";

export const useSelectBoards = (req : BoardSearchRequest) =>
    useSelect<BoardListResponse, BoardSearchRequest>({
        apiFn: getBoards,
        req,
        cacheKey: `boards-${JSON.stringify(req)}`
    });