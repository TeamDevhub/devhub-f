import { LockOutline, MailOutline, PersonOutlined } from "@mui/icons-material";
import React from "react";

type fieldLabel = '이메일 인증' | '비밀번호 설정' | '프로필' | '관심 포지션' | '보유 스킬';

type AuthFieldProps = {
  type?: 1 | 2;
  label: fieldLabel;
  children?: React.ReactNode;
};

export default function AuthField({ 
  type = 1, 
  label,
  children
}: AuthFieldProps) {
  // renderIcon
  const renderIcon = (fieldLabel: fieldLabel) => {
    const iconProps = { sx: { fontSize: 20, color: 'var(--primary-main)' } };

    switch (fieldLabel) {
      case '이메일 인증':
        return <MailOutline {...iconProps} />;
      case '비밀번호 설정':
        return <LockOutline {...iconProps} />;
      case '프로필':
        return <PersonOutlined {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${ type === 1 ? 'field-box' : 'field-box2' } flex-col`}>
      <div className="field-title align-center">
        {renderIcon(label)}
        <p>{label}</p>
      </div>
      <div className="field-content flex-col">
        {children}
      </div>
    </div>
  );
}
