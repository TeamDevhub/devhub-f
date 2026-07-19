import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import ActionMenu from '@/components/_common/menu/ActionMenu';
import { DDayChip, PositionChips, ProgressRegionChip, RecruitmentChip, RecruitStatusChip, SkillChips } from '@/components/web/projects/ProjectChips';
import useSelectProjectDetail from '@/hooks/web/projects/useSelectProjectDetail';
import useDeleteProject from '@/hooks/web/projects/useDeleteProject'
import { COMMON_CODE } from '@/constants/codes';
// 조회수 임시 숨김에 따라 Visibility 아이콘은 미사용 - 복원 시 @mui/icons-material에서 다시 import
import { AccessTime, ContentPaste, DeleteOutline, EditOutlined, LocationOn, OpenInNew, People, Person, Settings } from '@mui/icons-material';
import { Divider, Paper, Tooltip } from '@mui/material';
import { convertString, elapsedTime } from '@/utils/util.date';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import TopButton from "@/components/_common/button/TopButton.tsx";
import { useCodes } from "@/contexts/CommonCodeContext.ts";
import HeartButton from "@/components/_common/button/HeartButton.tsx";
import { useAuth } from '@/hooks/_common/useAuth';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';
import Loading from '@/components/_common/layout/Loading';
import NotFoundPage from '@/pages/error/NotFoundPage';

const menuIconStyle = { fontSize: 20, color: 'rgba(0, 0, 0, 0.56)' };

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectGuid } = useParams<{ projectGuid: string }>();

  const { getCodeName } = useCodes();
  const { res, error, toggleLike } = useSelectProjectDetail(projectGuid);
  const { onDeleteProject } = useDeleteProject(projectGuid || "");
  const { isLoggedIn, user } = useAuth();
  const { requireAuth } = useRequireAuth();

  // 지원하기 기능은 아직 준비 중 - Coming Soon 페이지로 안내한다
  const handleApplyClick = () => {
    requireAuth(() => navigate('/projects/apply'));
  }

  if (!projectGuid) {
    return <NotFoundPage />;
  }

  if (!res && !error) {
    return <Loading />;
  }

  if (error || !res?.data) {
    return <NotFoundPage />;
  }

  const project = res.data;

  return (
    <div className='main-page align-stretch flex-col' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <Paper className='project-box project-detail-box w-100 mt-10 flex-col flex-1' elevation={4}>
        <div className="project-header">
          <div className="top justify-between align-start">
            <div className='header-main flex-col'>
              <div className='chip-box align-center'>
                <RecruitStatusChip
                  recruitStatusCode={project.recruitStatus}
                />
                <ProgressRegionChip regionCd={project.progressRegionCd} />
                <RecruitmentChip recruitTypeCd={project.recruitmentTypeCd} />
                <DDayChip recruitmentEndDate={project.recruitmentEndDate} />
              </div>
              <strong className='main-text'>{project.title}</strong>
            </div>
            {user?.userGuid === project.userGuid &&
              <ActionMenu
                ariaLabel='프로젝트 관리'
                items={[
                  { label: '수정', icon: <EditOutlined sx={menuIconStyle} />, onClick: () => navigate(`/projects/update/${project.projectGuid}`) },
                  { label: '삭제', icon: <DeleteOutline sx={menuIconStyle} />, onClick: onDeleteProject, danger: true },
                ]}
              />
            }
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
                <p className='user-nickname'>{project.username}</p>
                <p className='user-email'>{project.email}</p>
              </div>
            </div>
            <div className="project-info align-center">
              <HeartButton
                className='project-like-button'
                onClick={() => toggleLike(project.projectGuid)}
                onBeforeToggle={() => isLoggedIn}
                likeCount={project.likeCount}
                defaultLiked={project.projectLiked}
              />
              {/* 조회수 임시 숨김 - 데이터/모델은 유지, 렌더링만 제외 (복원 시 아래 주석 해제)
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{project.viewCount}</p>
              </div>
              */}
              <p className="post-date">{elapsedTime(project.registeredDate)}</p>
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
                <div className="group-value align-center">{convertString(project.recruitmentStartDate, 'YYYY.MM.DD')} ~ {convertString(project.recruitmentEndDate, 'YYYY.MM.DD')}</div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <AccessTime sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>프로젝트 기간</strong>
                </div>
                <div className="group-value align-center">
                  {project.progressStartDate &&
                    project.progressEndDate && (
                      <>
                        {convertString(project.progressStartDate, 'YYYY.MM.DD')} ~{' '}
                        {convertString(project.progressEndDate, 'YYYY.MM.DD')} (
                        {dayjs(project.progressEndDate).diff(
                          dayjs(project.progressStartDate),
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
                  {project.progressTypeCd &&
                    getCodeName(
                      COMMON_CODE.PROJECT_PROGRESS_TYPE,
                      project.progressTypeCd
                    )}
                </div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <LocationOn sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>지역</strong>
                </div>
                <p className="group-value align-center">
                  {project.progressRegionCd &&
                    getCodeName(
                      COMMON_CODE.REGION_CODE,
                      project.progressRegionCd
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
                  {<SkillChips skillList={project.skillList} />}
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
                  {<PositionChips positionList={project.positionList} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="project-detail flex-col">
          <strong className='detail-title'>프로젝트 상세</strong>
          <div className="detail-content">
            {project.content}
            {project.imageFileGuid && (
              <div className="detail-image-box">
                <img className="detail-image" src={`${import.meta.env.VITE_API_URL}/files/${project.imageFileGuid}`} alt={project.title} />
              </div>
            )}
          </div>
        </div>
      </Paper>
      {/* 2. floating action buttons */}
      <div className='floating-button-box flex-col'>
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

