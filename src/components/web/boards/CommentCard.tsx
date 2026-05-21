import type { comment } from "@/types/type.boards";
import { Button, Divider } from '@mui/material'
import { useState } from "react";
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { elapsedTime } from '@/utils/util.date';
import useUpdateComment from '@/hooks/web/comments/useUpdateComment';
import useDeleteComment from '@/hooks/web/comments/useDeleteComment';

interface CommentCardProps {
  commentData :  comment;
  currentUserGuid? : string;
  isLoggedIn : boolean;
  onClickReport:(boardGuid:string, commentGuid:string) => void;
}
export default function CommentCard({
  commentData, currentUserGuid, isLoggedIn, onClickReport
} : CommentCardProps){

  const isCommentOwner = !!currentUserGuid && currentUserGuid === commentData.userGuid
  const {
    updateContent, setUpdateContent, 
    handleUpdate
  } = useUpdateComment(commentData.boardGuid, commentData.commentGuid, commentData.content);

  const {handleDelete} = useDeleteComment();

  const [page, setPage] = useState("info");

  return (
    <>
      {page === "info" && <InfoPage setPage={setPage} data={commentData} onClickReport={onClickReport} handleDelete={handleDelete} isCommentOwner={isCommentOwner} isLoggedIn={isLoggedIn}  />}
      {page === "modify" && (
        <ModifyPage
          setPage={setPage}
          data={commentData}
          updateContent={updateContent}
          setUpdateContent={setUpdateContent}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
}

interface InfoPageProps {
  setPage: (page: string) => void;
  data: comment; 
  handleDelete:(boardGuid:string, commentGuid:string) => void;
  isCommentOwner : boolean;
  isLoggedIn : boolean;
  onClickReport:(boardGuid:string, commentGuid:string) => void;
}
function InfoPage( {setPage, data, handleDelete, isCommentOwner, isLoggedIn, onClickReport} : InfoPageProps) {

  return (
    <div className="reply-box flex-col">
      <div className="commenter-info align-center">
        <p className='commenter-id'>{data.userName}</p>
        <p className='comment-time'>{elapsedTime(data.auditInfo.registeredDate)}</p>
      </div>
      <div className="reply-content mt-4">
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.content}</p>
      </div>
      <div className="action-button-box align-center justify-end">
      {isLoggedIn && isCommentOwner && (
        <>
          <Button size='small' color='warning' onClick={() => handleDelete(data.boardGuid, data.commentGuid)}>삭제</Button>
          <Button size='small' onClick={()=>{setPage("modify");}}>수정하기</Button> 
        </>
      )}
        {isLoggedIn && !isCommentOwner && <Button size='small' color='warning' onClick={() => onClickReport(data.boardGuid, data.commentGuid)}>신고하기</Button>}
      </div>

      <Divider />
    </div>
  )
}

interface ModiPageProps {
  setPage: (page: string) => void;
  data: comment; 
  updateContent:string;
  setUpdateContent: (value:string) => void;
  handleUpdate: () => void;
}
function ModifyPage({setPage, data, updateContent, setUpdateContent, handleUpdate } : ModiPageProps) {
    return (
    <div className="reply-box flex-col">
      <div className="commenter-info align-center">
        <p className='commenter-id'>{data.userName}</p>
        <p className='comment-time'>{elapsedTime(data.auditInfo.registeredDate)}</p>
      </div>
      <div className="align-stretch">        
        <CustomTextfield size='small' type='text' placeholder='댓글을 입력해 주세요.' value={updateContent}
          onChange={(e)=>setUpdateContent(e.target.value)}/>
        <Button size='small' onClick={handleUpdate}>수정</Button>
        <Button size='small' onClick={()=>{setUpdateContent(data.content); setPage("info");}}>취소</Button>
      </div>
      <Divider />
    </div>
  )
}




