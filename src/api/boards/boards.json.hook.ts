import { useSelect } from "@/hooks/api.hook";
import type { ApiResponse } from "@/types/api.type";
import type { BoardSummary, BoardSearchRequest } from "./boards.type";

import selectListResJSON from '@/assets/jsonData/boardsPage/boardListRes.json';

export const useSelectBoards = (req : BoardSearchRequest) => {
    const mockGetBoards = async (): Promise<ApiResponse<BoardSummary>> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return selectListResJSON as ApiResponse<BoardSummary>;
    };

    return useSelect<BoardSummary, BoardSearchRequest>({
        apiFn: mockGetBoards,
        req,
        cacheKey: `boards-mock-${JSON.stringify(req)}`
    });
};