import type { CommentCreate, CommentUpdate, CommentDelete} from "@/types/type.comments";
import fetcher from "@/utils/util.api";

export const createComment = (req : CommentCreate) =>
    fetcher<void, CommentCreate>(
        `/boards/${req.boardGuid}/comments`,
        req,
        { method : "post"}
    );

export const updateComment = (req : CommentUpdate) =>
    fetcher<void, CommentUpdate>(
        `/boards/${req.boardGuid}/comments/${req.commentGuid}`,
        req,
        { method : "put"}
    );

export const deleteComment = (req : CommentDelete) =>
    fetcher<void, CommentDelete>(
        `/boards/${req.boardGuid}/comments/${req.commentGuid}`,
        undefined,
        { method : "delete"}
    );

