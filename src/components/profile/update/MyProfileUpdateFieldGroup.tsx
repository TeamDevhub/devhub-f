import React from 'react';

export interface MyProfileUpdateFieldGroupProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function MyProfileUpdateFieldGroup({ children, style }: MyProfileUpdateFieldGroupProps) {
  return (
    <div className="field-content flex-col">
      <div className="content-box align-stretch" style={style}>
        {children}
      </div>
    </div>
  );
}
