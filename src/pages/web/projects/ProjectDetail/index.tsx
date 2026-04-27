import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import { DDayChip, PositionChips, ProgressRegionChip, RecruitmentChip, RecruitStatusChip, SkillChips } from '@/components/web/projects/ProjectChips';
import useSelectProjectDetail from '@/hooks/web/projects/useSelectProjectDetail';
import useDeleteProject from '@/hooks/web/projects/useDeleteProject'
import { COMMON_CODE } from '@/constants/codes';
import { AccessTime, ContentPaste, LocationOn, OpenInNew, People, Person, Settings, Visibility } from '@mui/icons-material';
import { Divider, Paper, Tooltip, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import TopButton from "@/components/_common/button/TopButton.tsx";
import { useCodes } from "@/contexts/CommonCodeContext.ts";
import HeartButton from "@/components/_common/button/HeartButton.tsx";
import { useParams } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectGuid } = useParams<{ projectGuid: string }>();

  if (!projectGuid) {
    navigate('/projects');
    return;
  }

  const { getCodeName } = useCodes();
  const { res, toggleLike } = useSelectProjectDetail(projectGuid);
  const { onDeleteProject } = useDeleteProject(projectGuid);
  const { isLoggedIn, user } = useAuth();

  //[수정필요]
  const handleApplyClick = () => {
    navigate('/projects/apply', {
      state: { projectGuid }
    });
  }

  if (!res?.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-page align-stretch flex-col' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. project detail */}
      {user?.userGuid === res.data.userGuid &&
        <div className="action-button-box align-center justify-end">
          <Button size='medium' variant='contained' onClick={() => { navigate(`/projects/update/${res?.data?.projectGuid}`) }}>수정</Button>
          <Button size='medium' variant='outlined' onClick={onDeleteProject}>삭제</Button>
        </div>
      }
      <Paper className='project-box project-detail-box w-100 mt-10 flex-col flex-1' elevation={4}>
        <div className="project-header">
          <div className="top flex-col">
            <div className='chip-box align-center'>
              <RecruitStatusChip
                recruitStatusCode={res.data.recruitStatus}
              />
              <ProgressRegionChip regionCd={res?.data?.progressRegionCd} />
              <RecruitmentChip recruitTypeCd={res?.data?.recruitmentTypeCd} />
              <DDayChip recruitmentEndDate={res?.data?.recruitmentEndDate} />
            </div>
            <strong className='main-text'>{res?.data?.title}</strong>
          </div>
          <div className="bottom align-end justify-between">
            <div className="align-center">
              <div className="left-area">
                <CustomAvatar
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />}
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>{res?.data?.username}</p>
                <p className='user-email'>{res?.data?.email}</p>
              </div>
            </div>
            <div className="project-info align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{res?.data?.viewCount}</p>
              </div>
              <p className="post-date"> {dayjs(res?.data?.registeredDate).format('YYYY.MM.DD')}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="project-summary flex-col">
          <strong className="summary-title">프로젝트 개요</strong>
          <div className='summary-content flex-col'>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <AccessTime sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>모집기간</strong>
                </div>
                <div className="group-value align-center">{dayjs(res?.data?.recruitmentStartDate).format('YYYY.MM.DD')} ~ {dayjs(res?.data?.recruitmentEndDate).format('YYYY.MM.DD')}</div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <AccessTime sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>프로젝트 기간</strong>
                </div>
                <div className="group-value align-center">
                  {res?.data?.progressStartDate &&
                    res?.data?.progressEndDate && (
                      <>
                        {dayjs(res.data.progressStartDate).format('YYYY.MM.DD')} ~{' '}
                        {dayjs(res.data.progressEndDate).format('YYYY.MM.DD')} (
                        {dayjs(res.data.progressEndDate).diff(
                          dayjs(res.data.progressStartDate),
                          'month'
                        )}
                        개월)
                      </>
                    )}
                </div>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <LocationOn sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>진행방식</strong>
                </div>
                <div className="group-value align-center">
                  {res?.data?.progressTypeCd &&
                    getCodeName(
                      COMMON_CODE.PROJECT_PROGRESS_TYPE,
                      res.data.progressTypeCd
                    )}
                </div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <LocationOn sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>지역</strong>
                </div>
                <p className="group-value align-center">
                  {res?.data?.progressRegionCd &&
                    getCodeName(
                      COMMON_CODE.REGION_CODE,
                      res.data.progressRegionCd
                    )}
                </p>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <Settings sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>사용기술</strong>
                </div>
                <div className="group-value align-center">
                  {SkillChips(res?.data?.skillList)}
                </div>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-start">
                <div className='group-label align-center'>
                  <People sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>모집 포지션</strong>
                </div>
                <div className="group-value flex-col">
                  {PositionChips(res?.data?.positionList)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="project-detail flex-col">
          <strong className='detail-title'>프로젝트 상세</strong>
          <div className="detail-content">
            {res?.data?.content}
            <div>
              {res?.data?.imageFileGuid && <img src={`${import.meta.env.VITE_API_URL}/files/${res.data.imageFileGuid}`} />}
            </div>
          </div>
        </div>
      </Paper>
      {/* 2. floating action buttons */}
      <div className='floating-button-box flex-col'>
        {isLoggedIn
          ? <Tooltip arrow placement='right' title='좋아요'>
            <Paper
              className='float-button favorite-button flex-center'
              elevation={5}
              sx={{ cursor: 'pointer' }}
            >
              <HeartButton likeCount={res?.data?.likeCount} onClick={() => { toggleLike(res.data.projectGuid) }} defaultLiked={res?.data.projectLiked} />
            </Paper>
          </Tooltip> : null}
        <Tooltip arrow placement='right' title='지원하기'>
          <Paper className='float-button apply-button flex-center active' elevation={5} onClick={handleApplyClick}>
            <ContentPaste sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
          </Paper>
        </Tooltip>
        <Tooltip arrow placement='right' title='공유하기'>
          <Paper className='float-button share-button flex-center' elevation={5}>
            <OpenInNew sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
          </Paper>
        </Tooltip>
        <TopButton />
      </div>
    </div>
  )
}

