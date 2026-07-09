export interface CommentCreate {
    boardGuid: string;
    content: string;
}

export interface CommentUpdate {
    boardGuid: string;
    commentGuid: string;
    content: string;
}

export interface CommentDelete {
    boardGuid: string;
    commentGuid: string;
}
