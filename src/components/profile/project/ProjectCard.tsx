import React, { useState } from 'react'
import { AccessTime, LocationOn } from '@mui/icons-material'
import { Button, Chip } from '@mui/material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import HeartButton from '@/components/_common/button/HeartButton'
import WebPopup from '@/components/_common/popup/WebPopup'
import type { MyProject } from '@/types/type.projects'
import useCloseMyProjects from '@/hooks/profile/project/useCloseMyProjects'
import useUpdateProjectLike from '@/hooks/projects/useUpdateProjectLike'
import { DDayChip, ProgressRegionChip, RecruitmentChip, RecruitStatusChip } from "@/components/projects/ProjectChips";

export default function ProjectCard({
  variant,
  projectGuid,
  title,
  recruitmentStartDate,
  recruitmentEndDate,
  progressStartDate,
  progressEndDate,
  progressRegionCd,
  recruitmentTypeCd,
  currentRecriutNumber,
  totalRecriutNumber,
  applicantNumber,
  approvalNumber,
  approvalState,
  progressState,
  recruitStatus,
  children
}: MyProject) {
  // 승인 상태에 따른 텍스트 색상 변경
  const approvalColorMap = {
    '승인 대기중': 'var(--text-primary)',
    '참가 승인': 'var(--primary-main)',
    '참가 거절': 'var(--error-main)'
  } as const;

  // 내가 신청한 프로젝트 中 지원 취소 팝업
  const [openCancelPopup, setOpenCancelPopup] = useState(false);
  const clickOpenCancelPopup = () => { setOpenCancelPopup(true); }

  // 참여한 프로젝트 中 팀원 평가 팝업
  const [openEvaluatePopup, setOpenEvaluatePopup] = useState(false);
  const clickOpenEvaluatePopup = () => { setOpenEvaluatePopup(true); }

  const { projectCloseMutate } = useCloseMyProjects();
  const { toggleLike, loading } = useUpdateProjectLike();

  const onClickUpdateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    location.href = '/projects/update/' + projectGuid;
  }
  const onClickCloseProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    projectCloseMutate(projectGuid);
  }

  const onClickHeartButton = (e: React.MouseEvent<HTMLButtonElement>, liked: boolean) => {
    toggleLike(projectGuid, liked);
  }


  return <>
    <div className="project-box2 w-100 justify-between" onClick={() => { location.href = '/projects/detail/' + projectGuid }}>
      <div className="left-area flex-col">
        <div className="chip-box align-center">
          {variant !== 'participate' && <RecruitStatusChip
            recruitStatusCode={recruitStatus}
          />}
          {variant === 'participate' && progressState && (
            <RecruitStatusChip recruitStatusCode={recruitStatus} />
          )}
          <ProgressRegionChip regionCd={progressRegionCd} />
          <RecruitmentChip recruitTypeCd={recruitmentTypeCd} />
          <DDayChip recruitmentEndDate={recruitmentEndDate} />
        </div>
        <strong className='main-text text-ellipsis'>{title}</strong>
        <div className='sub-text align-center'>
          <div className='align-center'>
            <div className='title flex'><AccessTime />모집기간</div>
            <p className='flex'>{recruitmentStartDate} ~ {recruitmentEndDate}</p>
          </div>
          <div className='align-center'>
            <div className='title flex'><AccessTime />진행기간</div>
            <p>{progressStartDate} ~ {progressEndDate}</p>
          </div>
        </div>
      </div>
      {variant == 'register' &&
        <div className="right-area flex-col" style={{ padding: 0 }}>
          <div className="top justify-between">
            <div className='flex-col align-end'>
              <div className="count" style={{ color: 'var(--info-main)' }}>{currentRecriutNumber} / {totalRecriutNumber}</div>
              <p className='count-text'>모집인원</p>
            </div>
            <div className='flex-col align-end'>
              <div className="count">{applicantNumber}</div>
              <p className='count-text'>신청자</p>
            </div>
            <div className='flex-col align-end'>
              <div className="count">{approvalNumber}</div>
              <p className='count-text'>승인대기</p>
            </div>
          </div>
          <div className="bottom align-center">
            <Button fullWidth size='small' variant='outlined' color='primary'>신청자</Button>
            <Button fullWidth size='small' variant='outlined' color='primary' onClick={onClickUpdateProject}>수정</Button>
            <Button fullWidth size='small' variant='contained' color='primary' onClick={onClickCloseProject}>마감</Button>
          </div>
        </div>
      }
      {variant == 'apply' && approvalState &&
        <>
          <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className='w-100 flex-col align-center'>
              <div className="count" style={{ color: approvalColorMap[approvalState], padding: '1.05rem 3.5rem' }}>{approvalState}</div>
              <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenCancelPopup}>신청 취소</Button>
            </div>
          </div>

          {/* 지원 취소 팝업 */}
          <WebPopup
            isOpen={openCancelPopup}
            onClose={() => setOpenCancelPopup(false)}
            onSubmit={() => { }}
            title='프로젝트 지원 취소'
            submitText='확인'
          >
            <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
              <p>정말로 지원을 취소하시겠습니까?</p>
            </div>
          </WebPopup>
        </>
      }
      {variant == 'favorite' &&
        <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className='w-100 flex-col align-center'>
            {/* likeCount는 추후에 데이터와 연결해야함(현재는 임시로 숫자 넣음) */}
            <HeartButton className='ml-a' onClick={onClickHeartButton} noCount defaultLiked />
            <Button size='small' variant='outlined' color='primary' className='w-100'>프로젝트 지원</Button>
          </div>
        </div>
      }
      {variant == 'participate' &&
        <>
          <div className="right-area align-end" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className='w-100 flex-col align-center'>
              {progressState == '진행완료' && <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenEvaluatePopup}>팀원 평가</Button>}
            </div>
          </div>

          {/* 팀원 평가 팝업 */}
          <WebPopup
            size='auto'
            isOpen={openEvaluatePopup}
            onClose={() => setOpenEvaluatePopup(false)}
            onSubmit={() => { }}
            title='프로젝트 팀원 평가'
            submitText='저장'
          >
            <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
              <div className="evaluate-box">
                {children}
              </div>
            </div>
          </WebPopup>
        </>
      }
    </div>
  </>
}