import React from 'react';
import { Favorite, Settings } from '@mui/icons-material';

type FormFieldExtraLabel = '관심 포지션' | '보유 기술';

interface FormFieldExtraProps {
  label: FormFieldExtraLabel;
  children: React.ReactNode;
}

export default function FormFieldExtra({ label, children }: FormFieldExtraProps) {
  // const renderIcon = (label: FormFieldExtraLabel) => {
  //   const iconProps = { sx: { fontSize: 20, color: 'primary.main' } };

  //   switch (label) {
  //     case '관심 포지션':
  //       return <Favorite {...iconProps} />;
  //     case '보유 기술':
  //       return <Settings {...iconProps} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="field-box2 flex-col">
      <div className="field-title align-center">
        {/* {renderIcon(label)} */}
        <p>{label}</p>
      </div>
      <div className="field-content">{children}</div>
    </div>
  );
}
