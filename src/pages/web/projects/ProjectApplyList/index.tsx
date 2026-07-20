import MyInfoBox from '@/components/web/profile/MyInfoBox'
import { Button, Chip, Divider, Pagination, Paper } from '@mui/material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import { AccessTime, Person } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import WebPopup from '@/components/_common/popup/WebPopup'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSelectProjectApplicationList from '@/hooks/web/projects/useSelectProjectApplicationList'
import useSelectProjectApplication from '@/hooks/web/projects/useSelectProjectApplication'
import useApproveProjectApplication from '@/hooks/web/projects/useApproveProjectApplication'
import useSelectProjectFormDetail from '@/hooks/web/projects/useSelectProjectFormDetail'
import type { ProjectApplicant } from '@/types/type.projects'
import { DDayChip, ProgressRegionChip, RecruitmentChip, RecruitStatusChip } from '@/components/web/projects/ProjectChips'
import { useCodes } from '@/contexts/CommonCodeContext'
import { COMMON_CODE, PROJECT_APPROVAL_STATUS } from '@/constants/codes'
import { convertString } from '@/utils/util.date'

const APPROVAL_STATUS_COLOR: Record<string, 'default' | 'success' | 'error'> = {
  [PROJECT_APPROVAL_STATUS.WAITING.CODE]: 'default',
  [PROJECT_APPROVAL_STATUS.COMPLETE.CODE]: 'success',
  [PROJECT_APPROVAL_STATUS.REJECT.CODE]: 'error',
};

export default function ProjectApplyList() {
  const { projectGuid } = useParams<{ projectGuid: string }>();
  const { getCodeName } = useCodes();

  const { applicationList, projectDetail, pagination, request, setPage, loading, refetch } = useSelectProjectApplicationList(projectGuid);
  const { handleApprove, handleReject, loading: actionLoading } = useApproveProjectApplication(projectGuid ?? '', refetch);

  // 지원서 답변에는 값만 있고 항목명이 없어, 프로젝트 지원 양식(폼)에서 항목명을 가져와 매칭한다.
  const { res: formRes } = useSelectProjectFormDetail(projectGuid);
  const fieldTitleMap = useMemo(() => {
    const project = formRes?.data;
    const base = (project?.applicationFormList ?? []) as unknown as { projectApplicationFormGuid?: string; applicationFormGuid?: string; title?: string }[];
    const additional = (project?.additionalFormList ?? []) as unknown as { projectApplicationFormGuid?: string; applicationFormGuid?: string; title?: string }[];
    const map: Record<string, string> = {};
    [...base, ...additional].forEach((field) => {
      const key = field.projectApplicationFormGuid ?? field.applicationFormGuid;
      if (key && field.title) map[key] = field.title;
    });
    return map;
  }, [formRes]);

  // position 기준으로 그룹핑
  const grouped = applicationList.reduce<Record<string, ProjectApplicant[]>>((acc, item) => {
    const pos = item.position ?? '기타';
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(item);
    return acc;
  }, {});

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='projects' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. project info(header) */}
        <div className="project-box2 w-100 justify-between" style={{ padding: 0, border: 'none', cursor: 'default' }}>
          <div className="left-area flex-col">
            <div className="chip-box align-center">
              {projectDetail?.recruitStatus && <RecruitStatusChip recruitStatusCode={projectDetail.recruitStatus} />}
              <ProgressRegionChip regionCd={projectDetail?.progressRegionCd} />
              <RecruitmentChip recruitTypeCd={projectDetail?.recruitmentTypeCd} />
              <DDayChip recruitmentEndDate={projectDetail?.recruitmentEndDate} />
            </div>
            <strong className='main-text'>{projectDetail?.title}</strong>
            <div className='sub-text align-center'>
              <div className='align-center'>
                <div className='title flex'><AccessTime />모집기간</div>
                <p className='flex'>{convertString(projectDetail?.recruitmentStartDate ?? '')} ~ {convertString(projectDetail?.recruitmentEndDate ?? '')}</p>
              </div>
              <div className='align-center'>
                <div className='title flex'><AccessTime />진행기간</div>
                <p>{convertString(projectDetail?.progressStartDate ?? '')} ~ {convertString(projectDetail?.progressEndDate ?? '')}</p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {/* 2-2. project applicants */}
        {!loading && applicationList.length === 0 && (
          <p className="applicant-list-empty">아직 지원한 사람이 없습니다.</p>
        )}
        {Object.entries(grouped).map(([position, applicants], index) => {
          const positionEntries = (projectDetail?.positionList ?? []).filter(p => p.position === position);
          const totalRecruitNumber = positionEntries.reduce((sum, p) => sum + (p.capacity ?? 0), 0);
          const currentRecruitNumber = applicants.filter(a => a.statusCd === PROJECT_APPROVAL_STATUS.COMPLETE.CODE).length;

          return (
            <ApplicantList
              key={position}
              position={getCodeName(COMMON_CODE.POSITION_CODE, position)}
              currentRecruitNumber={String(currentRecruitNumber)}
              totalRecruitNumber={totalRecruitNumber ? String(totalRecruitNumber) : undefined}
              applicantNumber={String(applicants.length)}
            >
              <Swiper
                observer
                observeParents
                spaceBetween={12}
                centeredSlides={false}
                slidesPerView={4}
                navigation={{
                  nextEl: `.next-${index}`,
                  prevEl: `.prev-${index}`,
                }}
                className='applicant-swiper'
                scrollbar={{ draggable: true }}
                modules={[Navigation, Scrollbar]}
              >
                {applicants.map((applicant) => (
                  <SwiperSlide key={applicant.applicationGuid}>
                    <ApplicantCard
                      applicant={applicant}
                      actionLoading={actionLoading}
                      fieldTitleMap={fieldTitleMap}
                      onApprove={() => applicant.applicationGuid && handleApprove(applicant.applicationGuid)}
                      onReject={() => applicant.applicationGuid && handleReject(applicant.applicationGuid)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={`swiper-button-prev prev-${index}`}></div>
              <div className={`swiper-button-next next-${index}`}></div>
            </ApplicantList>
          );
        })}

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={request.page + 1}
            count={pagination.totalPages}
            onChange={(_, page) => setPage(page)}
            showFirstButton
            showLastButton
            color='primary'
            className='w-100 flex-center'
          />
        )}
      </Paper>
    </div>
  )
}

/* used components */
// 1. ApplicantList
type ApplicantListProps = {
  position?: string;
  currentRecruitNumber?: string;
  totalRecruitNumber?: string;
  applicantNumber?: string;
  children?: React.ReactNode;
}

function ApplicantList({
  position,
  currentRecruitNumber,
  totalRecruitNumber,
  applicantNumber,
  children
}: ApplicantListProps) {
  return (
    <div className="applicant-box flex-col">
      {/* top */}
      <div className="top align-center justify-between">
        <div className="left-area align-center">
          <strong>{position}</strong>
        </div>
        <div className="right-area align-center">
          {totalRecruitNumber && (
            <>
              <div className="count-text align-center">
                <strong className='title'>승인</strong>
                <p className='count'><em>{currentRecruitNumber}</em> / {totalRecruitNumber}명</p>
              </div>
              <Divider orientation='vertical' flexItem />
            </>
          )}
          <div className="count-text align-center">
            <strong className='title'>지원자</strong>
            <p className='count'><em>{applicantNumber}</em>명</p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="bottom">
        {children}
      </div>
    </div>
  )
}

// 2. ApplicantCard
type ApplicantCardProps = {
  applicant: ProjectApplicant;
  actionLoading: boolean;
  fieldTitleMap: Record<string, string>;
  onApprove: () => void;
  onReject: () => void;
}

function ApplicantCard({
  applicant,
  actionLoading,
  fieldTitleMap,
  onApprove,
  onReject,
}: ApplicantCardProps) {
  const { getCodeName } = useCodes();

  // 상세보기 팝업
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const clickOpenDetailPopup = () => { setOpenDetailPopup(true); }

  const { res: detailRes } = useSelectProjectApplication(applicant.applicationGuid, openDetailPopup);
  const detailData = detailRes?.data;
  const userInfo = detailData?.projectApplicationAnswerList?.[0];
  const answerList = detailData?.projectApplicationAnswerList ?? [];

  const isWaiting = applicant.statusCd === PROJECT_APPROVAL_STATUS.WAITING.CODE;

  return (
    <>
      <Paper className='applicant-swiper-slide flex-col' elevation={4}>
        <div className="top align-center justify-between">
          <p className="application-date">지원일자 <em>{applicant.applyDate ? convertString(applicant.applyDate) : ''}</em></p>
          <Chip
            size='small'
            label={getCodeName(COMMON_CODE.PROJECT_APPROVAL_STATUS, applicant.statusCd)}
            color={APPROVAL_STATUS_COLOR[applicant.statusCd] ?? 'default'}
          />
        </div>
        <div className="middle flex-col">
          <div className="user-info-box flex-col">
            <div className="top-area align-center">
              <div className="left-area">
                <CustomAvatar
                  size={32}
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />}
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>{applicant.userName}</p>
                {applicant.levelCd && <p className='user-level'>{getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, applicant.levelCd)}</p>}
                {/* 이메일 주소는 어디에서도 노출하지 않는다 */}
              </div>
            </div>
            <div className="bottom-area align-center flex-wrap">
              {(applicant.skillList ?? []).map((skill, i) => (
                <Chip key={i} size='small' variant='outlined' color='secondary' label={getCodeName(COMMON_CODE.SKILL_CODE, skill)} />
              ))}
            </div>
          </div>
          <div className="manner-box flex-col">
            <div className="manner-text justify-between">
              <p className='text'>매너온도</p>
              <p className='manner-temperature'>{applicant.mannerDegree}°C</p>
            </div>
            <div className="manner-figure">
              <span className='current-figure h-100' style={{ width: `${Math.min(Number(applicant.mannerDegree) || 0, 100)}%` }}></span>
            </div>
          </div>
          <Button fullWidth size='small' color='primary' onClick={clickOpenDetailPopup}>상세보기</Button>
        </div>
        {isWaiting && (
          <div className="bottom">
            <div className="button-box flex gap-4">
              <Button fullWidth size='small' variant='outlined' color='primary' disabled={actionLoading} onClick={onReject}>거절</Button>
              <Button fullWidth size='small' variant='contained' color='primary' disabled={actionLoading} onClick={onApprove}>승인</Button>
            </div>
          </div>
        )}
      </Paper>

      {/* 3. popup */}
      <WebPopup
        size='large'
        isOpen={openDetailPopup}
        onClose={() => setOpenDetailPopup(false)}
        onSubmit={() => setOpenDetailPopup(false)}
        title='지원자 상세'
        submitText='확인'
      >
        <div className="mypage-popup flex-col gap-16">
          {/* 1. 기본 정보 */}
          <div className="form-wrap flex-col">
            <div className="form-box w-100 flex-col">
              <div className="field-area user-info-box flex">
                <div className="left-area flex-col">
                  <div className="top align-center">
                    <CustomAvatar
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />}
                    />
                    <div className="flex-col">
                      <p className='user-nickname'>{userInfo?.userName}</p>
                      {/* 이메일 주소는 어디에서도 노출하지 않는다 */}
                    </div>
                  </div>
                  <div className="bottom manner-box flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>{userInfo?.mannerDegree}°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100' style={{ width: `${Math.min(Number(userInfo?.mannerDegree) || 0, 100)}%` }}></span>
                    </div>
                  </div>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className="right-area flex-col">
                  <div className="position-box align-start">
                    <p className="title">지원 포지션</p>
                    <div className="content align-center">
                      {userInfo?.positionCd && <Chip size='small' variant='outlined' color='primary' label={getCodeName(COMMON_CODE.POSITION_CODE, userInfo.positionCd)} />}
                    </div>
                  </div>
                  <div className="skill-box align-start">
                    <p className="title">보유 스킬</p>
                    <div className="content align-center">
                      {userInfo?.userSkillList?.map((skill, i) => (
                        <Chip key={i} size='small' variant='outlined' color='secondary' label={getCodeName(COMMON_CODE.SKILL_CODE, skill)} />
                      ))}
                    </div>
                  </div>
                  <div className="introduce-box align-start">
                    <p className="title">자기 소개</p>
                    <div className="content">{userInfo?.introduction}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2. 추가 정보 */}
          <div className="inform-wrap flex-col">
            {answerList.map((answer, i) => (
              <React.Fragment key={i}>
                <div className="inform-box align-start">
                  <div className="label-area">
                    <strong>{fieldTitleMap[answer.projectApplicationFormGuid ?? ''] ?? '답변'}</strong>
                  </div>
                  <div className="field-area">
                    <p>{answer.content}</p>
                  </div>
                </div>
                {i < answerList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {answerList.some(a => a.fileGuid) && (
              <>
                <Divider />
                <div className="inform-box align-start">
                  <div className="label-area">
                    <strong>첨부파일</strong>
                  </div>
                  <div className="field-area">
                    <CustomTextfield multiline placeholder='첨부파일' disabled />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </WebPopup>
    </>
  )
}
