import React from "react";

export interface FormFieldProps {
  label?: string;
  helpText?: string;
  required?: boolean;
  children?: React.ReactNode;
}

export default function FormField({
  label,
  helpText,
  required = false,
  children
}: FormFieldProps) {
  return (
    <div className="form-box w-100 align-start">
      <div className="label-area flex">
        {required && <span className="required">*</span>}
        <div className="flex-col gap-4">
          <p className='label-text'>{label}</p>
          <div className="help-text">
            <span></span>
            { helpText && <span dangerouslySetInnerHTML={{ __html: helpText }} /> }
          </div>
        </div>
      </div>
      <div className="field-area flex-col flex-1">
        {children}
      </div>
    </div>
  )
}