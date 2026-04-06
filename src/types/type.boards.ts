import type { DateType } from '@/types/type.api';

export interface BoardBasic {
    boardGuid: string;
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

export type BoardCreate = Omit<BoardBasic, 'boardGuid'>;

export interface comment {
    commentGuid: string;
    boardGuid: string, 
    content: string;
    userGuid: string;
    userName: string;
    auditInfo:{
        registrantGuid?: string;
        registeredDate: DateType;
        modifierGuid?: string;
        modifiedDate?: DateType;
    }
}

export interface BoardSummary {
    boardBasicResponseDto:BoardBasic;
    likeCount?:string;
    commentCount?:string;
}

export interface BoardDetail {
    boardSummaryResponseDto:BoardSummary;
    commentList: comment[];
    userEmail:string;
}

export interface BoardSearchRequest {
    page:number;
    categoryCd?: string;
    title?: string;
}


export type SearchData = Pick<BoardSearchRequest, 'page' | 'categoryCd' | 'title'>;