import { LockOutline, MailOutline, PersonOutlined } from "@mui/icons-material";
import React from "react";

type ItemfieldLabel = '이메일 인증' | '비밀번호 설정' | '프로필' | '관심 포지션' | '보유 스킬';

type FieldBoxProps = {
  type?: 1 | 2;
  fieldLabel: ItemfieldLabel;
  items: {
    fieldValue: React.ReactNode;
  }[];
};

const renderIcon = (fieldLabel: ItemfieldLabel) => {
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

export default function FieldBox({ type = 1, fieldLabel, items }: FieldBoxProps) {
  return (
    <div className={`${ type === 1 ? 'field-box' : 'field-box2' } flex-col`}>
      <div className="field-title align-center">
        {renderIcon(fieldLabel)}
        <p>{fieldLabel}</p>
      </div>

      <div className="field-content flex-col">
        {items.map((item, index) => (
          <div className="content-box align-stretch" key={index}>{item.fieldValue}</div>
        ))}
      </div>
    </div>
  );
}
