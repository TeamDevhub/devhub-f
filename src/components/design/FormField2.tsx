import { LockOutline, MailOutline, PersonOutlined } from '@mui/icons-material';
import React from 'react';

type fieldLabel = '이메일 인증' | '이메일' | '비밀번호' | '비밀번호 설정' | '내 정보' | '관심 포지션' | '보유 스킬';

type FormField2Props = {
  type?: 1 | 2;
  label: fieldLabel;
  children?: React.ReactNode;
};

export default function FormField2({ type = 1, label, children }: FormField2Props) {
  const renderIcon = (fieldLabel: fieldLabel) => {
    const iconProps = { sx: { fontSize: 20, color: 'primary.main' } };

    switch (fieldLabel) {
      case '이메일 인증':
      case '이메일':
        return <MailOutline {...iconProps} />;
      case '비밀번호 설정':
      case '비밀번호':
        return <LockOutline {...iconProps} />;
      case '내 정보':
        return <PersonOutlined {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${type === 1 ? 'field-box' : 'field-box2'} flex-col`}>
      <div className="field-title align-center">
        {renderIcon(label)}
        <p>{label}</p>
      </div>
      <div className="field-content flex-col">{children}</div>
    </div>
  );
}
