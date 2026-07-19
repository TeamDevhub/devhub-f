import React from 'react';
import { Favorite, Settings } from '@mui/icons-material';

type MyProfileUpdateExtraLabel = '관심 포지션' | '보유 스킬';

interface MyProfileUpdateExtraFormProps {
  label: MyProfileUpdateExtraLabel;
  children: React.ReactNode;
  error?: string;
}

export default function MyProfileUpdateExtraForm({ label, children, error }: MyProfileUpdateExtraFormProps) {
  const renderIcon = (formFieldExtraLabel: MyProfileUpdateExtraLabel) => {
    const iconProps = { sx: { fontSize: 20, color: 'primary.main' } };

    switch (formFieldExtraLabel) {
      case '관심 포지션':
        return <Favorite {...iconProps} />;
      case '보유 스킬':
        return <Settings {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="field-box2 flex-col">
      <div className="field-title align-center">
        {renderIcon(label)}
        <p>{label}</p>
      </div>
      <div className="field-content flex-col">
        {children}
        {error && <span className="help-text help-text--error">{error}</span>}
      </div>
    </div>
  );
}
