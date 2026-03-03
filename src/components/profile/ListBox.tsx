import { ArrowForwardIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import ListCard, { type ListCardProps, type ListCardVariant } from './ListCard';

export type ListBoxProps = {
  listTitle?: string;
  variant: ListCardVariant;
  items: ListCardProps[];
};

export default function ListBox({ listTitle, variant, items }: ListBoxProps) {
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
          <ListCard key={index} {...item} variant={variant} />
        ))}
      </div>
    </div>
  );
}
