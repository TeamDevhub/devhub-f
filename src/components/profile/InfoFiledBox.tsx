import React from 'react';
import { Email, Favorite, InfoOutline, Person, Settings } from '@mui/icons-material';

export type FieldLabel = '닉네임' | '이메일' | '내 소개' | '관심 포지션' | '보유 기술';

export type InfoFieldBoxProps = {
  label: FieldLabel;
  children?: React.ReactNode;
};

export default function InfoFieldBox({ label, children }: InfoFieldBoxProps) {
  const renderIcon = (fieldLabel: FieldLabel) => {
    const iconProps = { sx: { fontSize: 24, color: 'primary.main' } };

    switch (fieldLabel) {
      case '닉네임':
        return <Person {...iconProps} />;
      case '이메일':
        return <Email {...iconProps} />;
      case '내 소개':
        return <InfoOutline {...iconProps} />;
      case '관심 포지션':
        return <Favorite {...iconProps} />;
      case '보유 기술':
        return <Settings {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex align-center">
      <div className="label-area align-center">
        {renderIcon(label)}
        <p>{label}</p>
      </div>
      <div className="field-area flex flex-wrap">{children}</div>
    </div>
  );
}
