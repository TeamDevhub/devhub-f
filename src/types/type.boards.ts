export interface BoardBasic {
    boardGuid: string;
    userGuid: string;
    username: string;
    categoryCd: string;
    title: string;
    viewCount?:string;
    registrantGuid?: string;
    registeredDate?: string;
    modifierGuid?: string;
    modifiedDate?: string;
}

export interface comment {
    commentGuid: string;
    content: string;
    userGuid: string;
    username: string;
    registrantGuid?: string;
    registeredDate?: string;
    modifierGuid?: string;
    modifiedDate?: string;
}

export interface BoardSummary extends BoardBasic {
    likeCount?:string;
    commentCount?:string;
}

export interface BoardDetail extends BoardSummary {
    commentList: comment[];
}

export interface BoardSearchRequest {
    page:number;
    categoryCd?: string;
    title?: string;
}
export type SearchData = Pick<BoardSearchRequest, 'page' | 'categoryCd' | 'title'>;

export interface BoardListResponse {
    
}