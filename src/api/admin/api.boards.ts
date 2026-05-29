import type { AdminBoard, AdminBoardSearchRequest } from "@/types/type.boards";
import fetcher from "@/utils/util.api";

export const getAdminBoards = (req : AdminBoardSearchRequest) =>
    fetcher<AdminBoard, AdminBoardSearchRequest>(
        `/admin/boards`,
        req,
        { method : "get"}
    );

export const deleteAdminBoard = (req : string[]) => {
    const body = { boardGuids: req };
    return fetcher<void, typeof body>(
        `/admin/boards/delete`,
        body,
        { method : "post"}
    );
}
