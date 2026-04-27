import { Button, Chip, Paper, Rating } from '@mui/material'
import { Person } from '@mui/icons-material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
// 1. EvaluateCard
type EvaluateCardProps = {
  userID?: string;
  userEmail?: string;
  mannerTemperature?: string;
  completeRating?: boolean;
}

export default function EvaluateCard ({
  userID,
  userEmail,
  mannerTemperature,
  completeRating = false
}: EvaluateCardProps){
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
          <p className='user-email'>{userEmail}</p>
        </div>
      </div>
      <div className="manner-box flex-col">
        <div className="top flex-col">
          <div className="manner-text justify-between">
            <p className='text'>매너온도</p>
            <p className='manner-temperature'>{mannerTemperature}°C</p>
          </div>
          <div className="manner-figure">
            <span className='current-figure h-100'></span>
          </div>
        </div>
        <div className="bottom align-center justify-between">
          <p className='text'>참여 포지션</p>
          <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
        </div>
      </div>
      <div className="rating-box flex-col">
        {!completeRating ? (
          <>
            <Rating name="team-rating" defaultValue={0} precision={0.5} />
            <Button size='small' variant='contained' color='primary'>평가</Button>
          </>
        ) : (
          <>
            <Rating name="team-rating" defaultValue={2.5} disabled precision={0.5} />
            <strong className='rating-text flex-center'>평가 완료</strong>
          </>
        )}
      </div>
    </Paper>
  )
}


