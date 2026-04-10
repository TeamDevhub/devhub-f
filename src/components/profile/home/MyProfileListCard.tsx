import { AccessTime, LocationOn } from '@mui/icons-material';
import { Chip } from '@mui/material';
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import type {MyProject} from '@/types/type.projects'

export default function MyProfileListCard({
  variant,
  title,
  recruitmentStartDate,
  recruitmentEndDate,
  progressStartDate,
  progressEndDate,
  currentRecriutNumber,
  totalRecriutNumber,
  applicantNumber,
  approvalNumber,
  approvalState,
}: MyProject) {
  const approvalColorMap = {
    '승인 대기중': 'var(--text-primary)',
    '참가 승인': 'var(--primary-main)',
    '참가 거절': 'var(--error-main)',
  } as const;

  return (
    <div className="project-box2 w-100 justify-between">
      <div className="left-area flex-col">
        <div className="chip-box align-center">
          <Chip size="small" variant="filled" color="primary" label="모집중" />
          <Chip
            size="small"
            variant="filled"
            color="default"
            label="서울"
            icon={<CustomAvatar size={18} sx={{ backgroundColor: '#AEAEAE' }} avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />} />}
          />
          <Chip size="small" variant="filled" color="error" label="추가모집" />
          <Chip
            size="small"
            variant="filled"
            color="warning"
            label="D-13"
            icon={<CustomAvatar size={18} sx={{ backgroundColor: '#E65100' }} avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />} />}
          />
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
              {approvalState}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
