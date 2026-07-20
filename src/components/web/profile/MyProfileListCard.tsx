import { AccessTime } from '@mui/icons-material';
import type {MyProject} from '@/types/type.projects'
import { approvalColorMap } from '@/constants/profileProject';
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import { DDayChip, ProgressRegionChip, RecruitmentChip, RecruitStatusChip } from '@/components/web/projects/ProjectChips';

export default function MyProfileListCard({
  variant,
  title,
  recruitmentStartDate,
  recruitmentEndDate,
  progressStartDate,
  progressEndDate,
  progressRegionCd,
  recruitmentTypeCd,
  recruitStatus,
  currentRecriutNumber,
  totalRecriutNumber,
  applicantNumber,
  approvalNumber,
  approvalState,
}: MyProject) {

  const {getCodeName} = useCodes();

  return (
    <div className="project-box2 w-100 justify-between">
      <div className="left-area flex-col">
        <div className="chip-box align-center">
          <RecruitStatusChip recruitStatusCode={recruitStatus} />
          <ProgressRegionChip regionCd={progressRegionCd} />
          <RecruitmentChip recruitTypeCd={recruitmentTypeCd} />
          <DDayChip recruitmentEndDate={recruitmentEndDate} />
        </div>

        <strong className="main-text text-ellipsis">{title}</strong>

        <div className="sub-text align-center">
          <div className="align-center">
            <div className="title flex">
              <AccessTime />
              모집기간
            </div>
            <p>
              {recruitmentStartDate} ~ {recruitmentEndDate}
            </p>
          </div>

          <div className="align-center">
            <div className="title flex">
              <AccessTime />
              진행기간
            </div>
            <p>
              {progressStartDate} ~ {progressEndDate}
            </p>
          </div>
        </div>
      </div>

      {variant === 'register' && (
        <div className="right-area align-center">
          <div className="flex-col align-end">
            <div className="count" style={{ color: 'var(--info-main)' }}>
              {currentRecriutNumber} / {totalRecriutNumber}
            </div>
            <p className="count-text">모집인원</p>
          </div>

          <div className="flex-col align-end">
            <div className="count">{applicantNumber}</div>
            <p className="count-text">신청자</p>
          </div>

          <div className="flex-col align-end">
            <div className="count">{approvalNumber}</div>
            <p className="count-text">승인대기</p>
          </div>
        </div>
      )}

      {variant === 'apply' && approvalState && (
        <div className="right-area flex-center">
          <div className="flex-col align-center">
            <p className="count-text">승인상태</p>
            <div className="count" style={{ color: approvalColorMap[approvalState] }}>
              {getCodeName('PROJECT_APPROVAL_STATUS', approvalState)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
