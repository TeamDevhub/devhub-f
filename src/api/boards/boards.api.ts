import type {BoardListResponse, BoardSearchRequest} from "@/api/boards/boards.type";
import fetcher from "@/utils/api.util";

export const getBoards = (req : BoardSearchRequest) => 
    fetcher<BoardListResponse, BoardSearchRequest>(
        "/boards",
        req,
        { method : "get"}
    );
