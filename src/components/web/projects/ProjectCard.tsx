import type { ProjectExtra } from "@/types/type.projects";
import HeartButton from "@/components/_common/button/HeartButton";
import { DDayChip, ProgressRegionChip, RecruitmentChip, RecruitStatusChip } from "@/components/web/projects/ProjectChips";
import { AccessTime } from "@mui/icons-material";
import { Chip, Divider, Paper } from "@mui/material";
import { COMMON_CODE } from "@/constants/codes";
import { convertString } from "@/utils/util.date";
import { useCodes } from "@/contexts/CommonCodeContext.ts";
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  projectData: ProjectExtra;
  toggleLike: (projectGuid: string) => void;
  isLoggedIn: boolean;
}
export default function ProjectCard({ projectData, toggleLike, isLoggedIn }: ProjectCardProps) {
  const {
    projectGuid,
    title,
    category,
    username,
    recruitmentTypeCd, // 모집유형
    progressRegionCd, // 진행 지역
    recruitmentStartDate, // 모집기간 시작일
    recruitmentEndDate, // 모집기간 마감일
    progressStartDate, // 진행기간 시작일
    progressEndDate, // 진행기간 마감일
    viewCount,
    likeCount,
    projectLiked,
    recruitStatus,
    registeredDate, // 작성일
    skillList,
    positionList,
  } = projectData;

  const { getCodeName } = useCodes();
  const navigate = useNavigate();

  const onClickHeartBtn = () => {
    toggleLike(projectGuid);
  }
  return (
    <Paper className='project-box w-100 h-fit flex' elevation={4} onClick={() => { navigate(`/projects/detail/${projectGuid}`) }}>
      <div className='left-area flex-col flex-1'>
        <div className='chip-box align-center'>
          <RecruitStatusChip
            recruitStatusCode={recruitStatus}
          />
          <ProgressRegionChip regionCd={progressRegionCd} />
          <RecruitmentChip recruitTypeCd={recruitmentTypeCd} />
          <DDayChip recruitmentEndDate={recruitmentEndDate} />
        </div>
        <strong className='main-text text-ellipsis'>{"[" + category + "]"} {title}</strong>
        <div className='sub-text flex-col'>
          <div className='top align-center'>
            <div className='align-center'>
              <div className='title flex'><AccessTime />모집기간</div>
              <p className='flex'>{convertString(recruitmentStartDate)} ~ {convertString(recruitmentEndDate)}</p>
            </div>
            <div className='align-center'>
              <div className='title flex'><AccessTime />진행기간</div>
              <p>{convertString(progressStartDate)} ~ {convertString(progressEndDate)}</p>
            </div>
          </div>
          <div className='bottom align-center justify-between'>
            <p className='write-info'>{username} . {registeredDate}</p>
            <p className='view-count'>view {viewCount}</p>
          </div>
        </div>
      </div>
      <Divider orientation='vertical' />
      <div className='right-area flex-col justify-between'>
        <div className='heart-box flex-col align-end'>
          {isLoggedIn ? <HeartButton key={projectGuid} likeCount={likeCount} onClick={onClickHeartBtn} defaultLiked={projectLiked} /> : null}
        </div>
        <div className='chip-box flex-col'>
          <div className='recruit-chip-box align-center'>
            {positionList?.map((position, index) =>
              (<Chip key={index} variant='outlined' color='primary' size='small' label={getCodeName(COMMON_CODE.POSITION_CODE, position.position)} />)
            )}
          </div>
          <div className='tech-chip-box align-center flex-wrap'>
            {skillList?.map((skill, index) =>
              (<Chip key={index} variant='outlined' color='secondary' size='small' label={getCodeName(COMMON_CODE.SKILL_CODE, skill)} />)
            )}
          </div>
        </div>
      </div>
    </Paper>
  )
}