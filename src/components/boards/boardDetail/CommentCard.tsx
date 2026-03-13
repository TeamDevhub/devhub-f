import type { comment } from "@/types/type.boards";
import { Button, Divider } from '@mui/material'
import type { DateType } from '@/types/type.api';
import dayjs from 'dayjs';

interface CommentCardProps {
  commentData :  comment;
}
export default function CommentCard({
  commentData
} : CommentCardProps){
  return (
    <div className="reply-box flex-col">
      <div className="commenter-info align-center">
        <p className='commenter-id'>{commentData.userName}</p>
        <p className='comment-time'>{elapsedTime(commentData.auditInfo.registeredDate)}</p>
      </div>
      <div className="reply-content mt-4">
        <p dangerouslySetInnerHTML={{ __html: commentData.content}} />
      </div>
      <Button size='small' color='warning' className='ml-a'>신고하기</Button>
      <Divider />
    </div>
  )
}

const elapsedTime = (date: DateType): string => {
  const start = dayjs(date);
	const end = dayjs();
  
  const seconds = end.diff(start, 'second')
	if (seconds < 60) return '방금 전';

  const minutes = end.diff(start, 'minutes')
	if (minutes < 60) return `${minutes}분 전`;

  const hours = end.diff(start, 'hours')
	if (hours < 24) return `${hours}시간 전`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)}일 전`;

	return `${start.format('YYYY.MM.DD')}`;
};

