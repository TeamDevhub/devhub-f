import MyInfoBox from '@/components/_design/MyInfoBox'
import { Button, Chip, Divider, Paper } from '@mui/material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import { AccessTime, LocationOn, Person } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/swiper.css';
import WebPopup from '@/components/_common/popup/WebPopup'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useSelectProjectApplicationList from '@/hooks/web/projects/useSelectProjectApplicationList'
import useSelectProjectApplication from '@/hooks/web/projects/useSelectProjectApplication'
import useApproveProjectApplication from '@/hooks/web/projects/useApproveProjectApplication'
import type { ProjectApplicationListItem } from '@/types/type.projects'
import type { DateType } from '@/types/type.api'
import dayjs from 'dayjs'

const formatDate = (date: DateType) => date ? dayjs(date).format('YYYY.MM.DD') : ''

export default function ProjectApplyList(){
  const { projectGuid } = useParams<{ projectGuid: string }>();
  const { applicationList, projectDetail } = useSelectProjectApplicationList(projectGuid);

  // position 기준으로 그룹핑
  const grouped = applicationList.reduce<Record<string, ProjectApplicationListItem[]>>((acc, item) => {
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
              <Chip size='small' variant='filled' color='primary' label='모집중' />
              <Chip
                size='small'
                variant='filled'
                color='default'
                label='서울'
                icon={
                  <CustomAvatar
                    size={18}
                    sx={{ backgroundColor: '#AEAEAE' }}
                    avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                  />
                }
              />
              <Chip size='small' variant='filled' color='error' label='추가모집' />
              <Chip
                size='small'
                variant='filled'
                color='warning'
                label='D-13'
                icon={
                  <CustomAvatar
                  size={18}
                  sx={{ backgroundColor: '#E65100' }}
                  avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                  />
                }
              />
            </div>
            <strong className='main-text'>{projectDetail?.title}</strong>
            <div className='sub-text align-center'>
              <div className='align-center'>
                <div className='title flex'><AccessTime />모집기간</div>
                <p className='flex'>{formatDate(projectDetail?.recruitmentStartDate)} ~ {formatDate(projectDetail?.recruitmentEndDate)}</p>
              </div>
              <div className='align-center'>
                <div className='title flex'><AccessTime />진행기간</div>
                <p>{formatDate(projectDetail?.progressStartDate)} ~ {formatDate(projectDetail?.progressEndDate)}</p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {/* 2-2. project applicants */}
        {Object.entries(grouped).map(([position, applicants], index) => (
          <ApplicantList
            key={position}
            position={position}
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
              {applicants.map((applicant, i) => (
                <SwiperSlide key={i}>
                  <ApplicantCard
                    projectGuid={projectGuid}
                    applicationGuid={applicant.applicationGuid}
                    applicationDate={applicant.applyDate}
                    userName={applicant.userName}
                    userEmail={applicant.email}
                    mannerTemperature={applicant.mannerDegree}
                    skillList={applicant.skillList}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={`swiper-button-prev prev-${index}`}></div>
            <div className={`swiper-button-next next-${index}`}></div>
          </ApplicantList>
        ))}
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

function ApplicantList ({
  position,
  currentRecruitNumber,
  totalRecruitNumber,
  applicantNumber,
  children
}: ApplicantListProps){
  return (
    <div className="applicant-box flex-col">
      {/* top */}
      <div className="top align-center justify-between">
        <div className="left-area align-center">
          <strong>{position}</strong>
          <Chip size='small' variant='filled' color='default' label='주니어' />
        </div>
        <div className="right-area align-center">
          <div className="count-text align-center">
            <strong className='title'>모집</strong>
            <p className='count'><em>{currentRecruitNumber}</em> / {totalRecruitNumber}명</p>
          </div>
          <Divider orientation='vertical' flexItem />
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
  projectGuid?: string;
  applicationGuid?: string;
  applicationDate?: string;
  userName?: string;
  userEmail?: string;
  mannerTemperature?: string;
  skillList?: string[];
}

function ApplicantCard ({
  projectGuid,
  applicationGuid,
  applicationDate,
  userName,
  userEmail,
  mannerTemperature,
  skillList,
}: ApplicantCardProps){
  // 상세보기 팝업
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const clickOpenDetailPopup = () => {setOpenDetailPopup(true);}

  const { res: detailRes } = useSelectProjectApplication(applicationGuid, openDetailPopup);
  const detailData = detailRes?.data;
  const userInfo = detailData?.projectApplicationAnswerList?.[0];
  const answerList = detailData?.projectApplicationAnswerList ?? [];

  const { mutate: approve, loading: approveLoading } = useApproveProjectApplication(
    () => alert('처리되었습니다.'),
    () => alert('처리에 실패했습니다.')
  );

  const handleApprove = (approved: boolean) => {
    if (!projectGuid || !applicationGuid) return;
    approve({ projectGuid, applicationGuid, approved });
  };

  return (
    <>
      <Paper className='applicant-swiper-slide flex-col' elevation={4}>
        <div className="top">
          <p className="application-date">지원일자 <em>{applicationDate}</em></p>
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
                <p className='user-nickname'>{userName}</p>
                <p className='user-email'>{userEmail}</p>
              </div>
            </div>
            <div className="bottom-area align-center flex-wrap">
              {skillList?.map((skill, i) => (
                <Chip key={i} size='small' variant='outlined' color='secondary' label={skill} />
              ))}
            </div>
          </div>
          <div className="manner-box flex-col">
            <div className="manner-text justify-between">
              <p className='text'>매너온도</p>
              <p className='manner-temperature'>{mannerTemperature}°C</p>
            </div>
            <div className="manner-figure">
              <span className='current-figure h-100'></span>
            </div>
          </div>
          <Button fullWidth size='small' color='primary' onClick={clickOpenDetailPopup}>상세보기</Button>
        </div>
        <div className="bottom">
          <div className="button-box flex gap-4">
            <Button fullWidth size='small' variant='outlined' color='primary' disabled={approveLoading} onClick={() => handleApprove(false)}>거절</Button>
            <Button fullWidth size='small' variant='contained' color='primary' disabled={approveLoading} onClick={() => handleApprove(true)}>승인</Button>
          </div>
        </div>
      </Paper>

      {/* 3. popup */}
      <WebPopup
        size='large'
        isOpen={openDetailPopup}
        onClose={()=>setOpenDetailPopup(false)}
        onSubmit={()=>{}}
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
                      <p className='user-email'>{userInfo?.email}</p>
                    </div>
                  </div>
                  <div className="bottom manner-box flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>{userInfo?.mannerDegree}°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className="right-area flex-col">
                  <div className="position-box align-start">
                    <p className="title">지원 포지션</p>
                    <div className="content align-center">
                      {userInfo?.positionCd && <Chip size='small' variant='outlined' color='primary' label={userInfo.positionCd} />}
                    </div>
                  </div>
                  <div className="skill-box align-start">
                    <p className="title">보유 스킬</p>
                    <div className="content align-center">
                      {userInfo?.userSkillList?.map((skill, i) => (
                        <Chip key={i} size='small' variant='outlined' color='secondary' label={skill} />
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
                  <div className="field-area">
                    <p>{answer.content}</p>
                  </div>
                </div>
                {i < answerList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            <Divider />
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>첨부파일</strong>
              </div>
              <div className="field-area">
                {/* 추후에 첨부파일 영역으로 수정 필요 */}
                <CustomTextfield multiline placeholder='첨부파일 A' disabled />
              </div>
            </div>
          </div>
        </div>
      </WebPopup>
    </>
  )
}
