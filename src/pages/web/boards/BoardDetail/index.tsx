import HeartButton from '@/components/_common/button/HeartButton'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import { Create, Person, Visibility } from '@mui/icons-material'
import { Button, Divider, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import useSelectBoardDetail from '@/hooks/web/boards/useSelectBoardDetail';
import useCreateComment from '@/hooks/web/comments/useCreateComment';
import { BoardCategoryChip } from '@/components/web/boards/BoardChips';
import CommentCard from '@/components/web/boards/CommentCard';
import useMutationBoards from '@/hooks/web/boards/useMutationBoards';
import { useAuth } from '@/contexts/AuthContext';

export default function BoardDetail(){

  const {state} = useLocation();
  const {res} = useSelectBoardDetail(state?.boardGuid);

  const {
    content, setContent,
    onSubmit
  } = useCreateComment(state?.boardGuid)

  const { handleLike } = useMutationBoards();
  const { isLoggedIn, user } = useAuth();
  const currentUserGuid  = user?.userGuid;
  const isBoardOwner = !!currentUserGuid && currentUserGuid === res?.data?.boardSummaryResponseDto.boardBasicResponseDto.userGuid

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <Paper className='board-detail-box w-100 flex-col' elevation={4}>
        {/* 1. board header */}
        <div className="board-header flex-col">
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <BoardCategoryChip categoryCd={res?.data?.boardSummaryResponseDto.boardBasicResponseDto.categoryCd || ""}></BoardCategoryChip>
              <strong className='main-text'>
                {res?.data?.boardSummaryResponseDto.boardBasicResponseDto.title}
              </strong>
            </div>
            {isLoggedIn ? <div className="right-area flex-col">
              <HeartButton onClick={(e) => handleLike(res?.data?.boardSummaryResponseDto.boardBasicResponseDto.boardGuid)} likeCount={res?.data?.boardSummaryResponseDto.likeCount} defaultLiked={res?.data?.isLiked}/> 
            </div> : null }
          </div>
          <div className="bottom w-100 align-end justify-between">
            <div className="user-info align-center">
              <div className="left-area">
                <CustomAvatar 
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>{res?.data?.boardSummaryResponseDto.boardBasicResponseDto.userName}</p>
                <p className='user-email'>{res?.data?.userEmail}</p>
              </div>
            </div>
            <div className="board-info align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{res?.data?.boardSummaryResponseDto.boardBasicResponseDto.viewCount}</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{res?.data?.boardSummaryResponseDto.commentCount}</p>
              </div>
            </div>
          </div>
          <Divider />
        </div>
        {/* 2. board content */}
        <div className="board-content-box flex-col">
          <div className="board-content">
            <p>{res?.data?.boardSummaryResponseDto.boardBasicResponseDto.content}</p>
          </div>
          <Divider flexItem />
          {isLoggedIn && !isBoardOwner && <Button size='small' color='warning' className='ml-a'>신고하기</Button>}
          {isLoggedIn && <div className="write-reply flex-col">
            <strong>댓글</strong>
            <div className="align-stretch">
              <CustomTextfield size='small' placeholder='댓글을 입력하세요.' value={content}
              onChange={(e)=>setContent(e.target.value)}/>
              <Button size='small' variant='contained' color='primary' onClick={onSubmit}>글쓰기</Button>
            </div>
          </div>}
        </div>
        {/* 3. board reply */}
        <div className="board-reply flex-col">
          {res?.data?.commentList?.map((item, index) => {
            return <CommentCard key={index} commentData={item} currentUserGuid={currentUserGuid} isLoggedIn={isLoggedIn}></CommentCard>
          })}
        </div>
      </Paper>
    </div>
  )
}

