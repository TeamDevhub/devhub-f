import { ArrowForwardIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import MyProfileListCard, { type MyProfileListCardProps, type MyProfileListCardVariant } from './MyProfileListCard';

export type MyProfileListBoxProps = {
  listTitle?: string;
  variant: MyProfileListCardVariant;
  items: MyProfileListCardProps[];
};

export default function MyProfileListBox({ listTitle, variant, items }: MyProfileListBoxProps) {
  return (
    <div className="list-box flex-col">
      <div className="list-top align-center justify-between">
        <strong className="title">{listTitle}</strong>
        <Button size="small" endIcon={<ArrowForwardIos />}>
          전체보기
        </Button>
      </div>

      <div className="list-bottom flex-col">
        {items.map((item, index) => (
          <MyProfileListCard key={index} {...item} variant={variant} />
        ))}
      </div>
    </div>
  );
}
