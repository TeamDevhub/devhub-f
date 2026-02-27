import type {BoardSummary, BoardSearchRequest, BoardCreate, BoardDetail} from "@/types/type.boards";
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
        req,
        { method : "get"}
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

