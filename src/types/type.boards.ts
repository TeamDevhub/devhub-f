import type { DateType } from '@/types/type.api';

export interface BoardBasic {
    boardGuid?: string;
    userGuid?: string;
    userName?: string;
    categoryCd: string;
    title: string;
    content: string;
    viewCount?:string;
    registrantGuid?: string;
    registeredDate?: DateType;
    modifierGuid?: string;
    modifiedDate?: DateType;
}

export interface comment {
    commentGuid: string;
    content: string;
    userGuid: string;
    userName: string;
    registrantGuid?: string;
    registeredDate?: string;
    modifierGuid?: string;
    modifiedDate?: string;
}

export interface BoardSummary {
    boardBasicResponseDto:BoardBasic;
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