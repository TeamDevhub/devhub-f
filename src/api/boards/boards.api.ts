import type {BoardSummary, BoardSearchRequest, BoardCreate, BoardDetail, CommentCreate} from "@/types/type.boards";
import fetcher from "@/utils/util.api";

export const getBoards = (req : BoardSearchRequest) => {
    const searchParams = new URLSearchParams();
    if(req.title) {searchParams.set('title', String(req.title));}
    if(req.categoryCd) {searchParams.set('categoryCd', String(req.categoryCd));}
    searchParams.set('page', String(req.page));

    return fetcher<BoardSummary>(
        `/boards?${searchParams.toString()}`,
        undefined,
        { method : "get"}
    );
}

export const getBoardDetail = (req:string) => 
    fetcher<BoardDetail>(
        `/boards/${req}`,
        undefined,
        { method : "get", withCredentials: true}
    );

export const likeBoard = (req : string) => 
    fetcher<void, string>(
        `/boards/${req}/likes`,
        req,
        { method : "post"}
    );

export const createBoard = (req : BoardCreate) =>
    fetcher<void, BoardCreate>(
        `/boards`,
        req,
        { method : "post"}
    );

export const createComment = (req : CommentCreate) =>
    fetcher<void, CommentCreate>(
        `/boards/${req.boardGuid}/comments`,
        req,
        { method : "post"}
    );

