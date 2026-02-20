import React from "react";

export interface FieldGroup2Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function FieldGroup2({children, style}: FieldGroup2Props) {
  return (
    <div className="field-content flex-col">
      <div className="content-box align-stretch" style={style}>{children}</div>
    </div>
  );
}
