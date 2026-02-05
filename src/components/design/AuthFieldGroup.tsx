import React from "react";

export interface AuthFieldGroupProps {
  children?: React.ReactNode;
};

export default function AuthFieldGroup({children}: AuthFieldGroupProps) {
  return (
    <div className="field-content flex-col">
      <div className="content-box align-stretch">{children}</div>
    </div>
  );
}
