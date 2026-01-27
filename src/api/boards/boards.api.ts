import type { BoardListResponse, BoardSearchRequest } from "@/types/type.boards";
import fetcher from "@/utils/util.api";

export const getBoards = (req : BoardSearchRequest) => 
    fetcher<BoardListResponse, BoardSearchRequest>(
        "/boards",
        req,
        { method : "get"}
    );
