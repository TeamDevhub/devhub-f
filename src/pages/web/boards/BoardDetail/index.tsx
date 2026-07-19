import HeartButton from '@/components/_common/button/HeartButton'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import ActionMenu from '@/components/_common/menu/ActionMenu'
// 조회수 임시 숨김에 따라 Visibility 아이콘은 미사용 - 복원 시 @mui/icons-material에서 다시 import
import { Create, DeleteOutline, EditOutlined, Person } from '@mui/icons-material'
import { Button, Divider, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import useSelectBoardDetail from '@/hooks/web/boards/useSelectBoardDetail';
import useCreateComment from '@/hooks/web/comments/useCreateComment';
import { BoardCategoryChip } from '@/components/web/boards/BoardChips';
import CommentCard from '@/components/web/boards/CommentCard';
import useDeleteBoard from '@/hooks/web/boards/useDeleteBoard';
import { useAuth } from '@/hooks/_common/useAuth';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';
import useDisclosure from '@/hooks/_common/useDisclosure';
import ReportPopup from '@/components/_common/popup/ReportPopup';
import Loading from '@/components/_common/layout/Loading';
import NotFoundPage from '@/pages/error/NotFoundPage';
import { elapsedTime } from '@/utils/util.date';

const menuIconStyle = { fontSize: 20, color: 'rgba(0, 0, 0, 0.56)' };

export default function BoardDetail(){

  const { boardGuid } = useParams<{ boardGuid: string }>();
  const navigate = useNavigate();

  const reportPopup = useDisclosure();
  // 어떤 대상을 신고하는지 데이터 저장이 필요함
  const [reportTarget, setReportTarget] = useState<{ boardGuid: string; commentGuid: string | null } | null>(null);

  const { requireAuth } = useRequireAuth();

  const handleOpenReport = (targetBoardGuid: string, commentGuid: string | null = null) => {
    requireAuth(() => {
      setReportTarget({ boardGuid: targetBoardGuid, commentGuid });
      reportPopup.open();
    });
  };

  const handleCloseReport = () => {
    reportPopup.close();
    setReportTarget(null);
  };

  const {res, error, refetch, toggleLike} = useSelectBoardDetail(boardGuid);

  const {
    content, setContent,
    error: commentError,
    onSubmit
  } = useCreateComment(boardGuid ?? '', undefined, refetch)

  const { handleDelete } = useDeleteBoard(() => navigate('/boards'));
  const { isLoggedIn, user } = useAuth();
  const currentUserGuid  = user?.userGuid;
  const isBoardOwner = !!currentUserGuid && currentUserGuid === res?.data?.boardSummaryResponseDto.boardBasicResponseDto.userGuid

  if (!boardGuid) {
    return <NotFoundPage />;
  }

  if (!res && !error) {
    return <Loading />;
  }

  if (error || !res?.data) {
    return <NotFoundPage />;
  }

  const board = res.data.boardSummaryResponseDto.boardBasicResponseDto;

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <Paper className='board-detail-box w-100 flex-col' elevation={4}>
        {/* 1. board header */}
        <div className="board-header flex-col">
          <div className="top w-100 justify-between align-start">
            <div className="left-area flex-col align-start flex-1">
              <BoardCategoryChip categoryCd={board.categoryCd}></BoardCategoryChip>
              <strong className='main-text'>
                {board.title}
              </strong>
            </div>
            {isBoardOwner &&
              <ActionMenu
                ariaLabel='게시글 관리'
                items={[
                  { label: '수정', icon: <EditOutlined sx={menuIconStyle} />, onClick: () => navigate(`/boards/update/${board.boardGuid}`) },
                  { label: '삭제', icon: <DeleteOutline sx={menuIconStyle} />, onClick: () => handleDelete(board.boardGuid), danger: true },
                ]}
              />
            }
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
                <p className='user-nickname'>{board.userName}</p>
                <p className='user-email'>{res.data.userEmail}</p>
              </div>
            </div>
            <div className="board-info align-center">
              <HeartButton
                className='board-like-button'
                onClick={() => toggleLike(board.boardGuid)}
                onBeforeToggle={() => isLoggedIn}
                likeCount={res.data.boardSummaryResponseDto.likeCount}
                defaultLiked={res.data.isLiked}
              />
              {/* 조회수 임시 숨김 - 데이터/모델은 유지, 렌더링만 제외 (복원 시 아래 주석 해제)
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{board.viewCount}</p>
              </div>
              */}
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{res.data.boardSummaryResponseDto.commentCount}</p>
              </div>
              <p className="post-date">{elapsedTime(board.registeredDate)}</p>
            </div>
          </div>
          <Divider />
        </div>
        {/* 2. board content */}
        <div className="board-content-box flex-col">
          <div className="board-content">
            <p>{board.content}</p>
          </div>
          <Divider flexItem />
          {!isBoardOwner && (
            <Button
              size='small'
              color='warning'
              className='ml-a'
              onClick={() => handleOpenReport(board.boardGuid, null)}
            >
              신고하기
            </Button>
          )}
          <div className="write-reply flex-col">
            <strong>댓글</strong>
            <div className="align-stretch">
              <CustomTextfield size='small' placeholder='댓글을 입력하세요.' value={content}
              onChange={(e)=>setContent(e.target.value)} error={!!commentError} helperText={commentError}/>
              <Button size='small' variant='contained' color='primary' onClick={onSubmit}>글쓰기</Button>
            </div>
          </div>
        </div>
        {/* 3. board reply */}
        <div className="board-reply flex-col">
          {res.data.commentList?.map((item) => {
            return <CommentCard key={item.commentGuid} commentData={item} onClickReport={handleOpenReport} currentUserGuid={currentUserGuid} isLoggedIn={isLoggedIn} onChanged={refetch}></CommentCard>
          })}
        </div>
      </Paper>

      {reportTarget && <ReportPopup isOpen={reportPopup.isOpen} onClose={handleCloseReport} boardGuid={reportTarget.boardGuid} commentGuid={reportTarget.commentGuid}/> }
    </div>
  )
}
