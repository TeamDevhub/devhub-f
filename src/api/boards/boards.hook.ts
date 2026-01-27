import { useSelect } from "@/hooks/api.hook";
import type { BoardListResponse, BoardSearchRequest } from "./boards.type";
import { getBoards } from "./boards.api";

export const useSelectBoards = (req : BoardSearchRequest) =>
    useSelect<BoardListResponse, BoardSearchRequest>({
        apiFn: getBoards,
        req,
        cacheKey: `boards-${JSON.stringify(req)}`
    });