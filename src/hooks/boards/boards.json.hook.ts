import selectListResJSON from '@/assets/jsonData/boardsPage/boardListRes.json';
import { useSelect } from "@/hooks/_common/api.hook";
import type { ApiResponse } from "@/types/type.api";
import type { BoardSearchRequest, BoardSummary } from "@/types/type.boards";

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