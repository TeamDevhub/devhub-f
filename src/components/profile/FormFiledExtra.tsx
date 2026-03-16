import React from 'react';
import { Favorite, Settings } from '@mui/icons-material';

type formFieldExtraLabel = '관심 포지션' | '보유 스킬';

interface FormFieldExtraProps {
  label: formFieldExtraLabel;
  children: React.ReactNode;
}

export default function FormFieldExtra({ label, children }: FormFieldExtraProps) {
  const renderIcon = (formFieldExtraLabel: formFieldExtraLabel) => {
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
      <div className="field-content flex-col">{children}</div>
    </div>
  );
}
