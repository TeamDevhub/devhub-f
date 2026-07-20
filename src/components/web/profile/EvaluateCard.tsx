import { Button, Paper, Rating } from '@mui/material'
import { Person } from '@mui/icons-material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import { useState } from 'react'
// 1. EvaluateCard
type EvaluateCardProps = {
  applicantGuid: string;
  userID: string;
  userEmail?: string;
  mannerTemperature?: string;
  score?: number;
  completeRating?: boolean;
  onClickReview?: (userGuid: string, score: number) => void;
}

export default function EvaluateCard({
  applicantGuid,
  userID,
  // userEmail은 더 이상 화면에 노출하지 않는다 (이메일 비노출 정책)
  mannerTemperature,
  score,
  completeRating = false,
  onClickReview = () => { }
}: EvaluateCardProps) {

  const [_score, setScore] = useState<number>(score || 0);
  return (
    <Paper className='evaluate-card flex-col' elevation={2}>
      <div className="user-info align-center">
        <div className="left-area">
          <CustomAvatar
            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
            avatarIcon={<Person sx={{ fontSize: 24 }} />}
          />
        </div>
        <div className="right-area">
          <p className='user-nickname'>{userID}</p>
          {/* 이메일 주소는 어디에서도 노출하지 않는다 */}
          {/* <p className='user-email'>{userEmail}</p> */}
        </div>
      </div>
      <div className="manner-box flex-col">
        <div className="top flex-col">
          <div className="manner-text justify-between">
            <p className='text'>매너온도</p>
            <p className='manner-temperature'>{mannerTemperature}°C</p>
          </div>
          <div className="manner-figure">
            <span
              className='current-figure h-100'
              style={{ width: `${Math.min(Number(mannerTemperature) || 0, 100)}%` }}
            />
          </div>
        </div>
      </div>
      <div className="rating-box flex-col">
        {!completeRating ? (
          <>
            <Rating name="team-rating" value={_score} precision={0.5} onChange={(_event, newValue) => { setScore(newValue || 0); }} />
            {_score === 0 && <span className="help-text help-text--error">평가할 별점을 선택해주세요.</span>}
            <Button size='small' variant='contained' color='primary' disabled={_score === 0} onClick={() => onClickReview(applicantGuid, _score)}>평가</Button>
          </>
        ) : (
          <>
            <Rating name="team-rating" value={score ?? 0} disabled precision={0.5} />
            <strong className='rating-text flex-center'>평가 완료</strong>
          </>
        )}
      </div>
    </Paper>
  )
}


