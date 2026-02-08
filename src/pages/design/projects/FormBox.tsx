import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type FormBoxProps = {
  labelText?: string;
  helpText?: string;
  required?: boolean;
  items?: {
    fieldTitle?: string;
    fieldValue?: React.ReactNode;
    addButton?: boolean;
  }[]
}

export default function FormBox({
  labelText = '',
  helpText = '',
  required = false,
  items = []
}: FormBoxProps) {
  return (
    <div className="form-box w-100 align-start">
      {/* label area */}
      <div className="label-area flex">
        {required && <span className="required">*</span>}
        <div className="flex-col" style={{ gap: '0.4rem' }}>
          <p className='label-text'>{labelText}</p>
          <div className="help-text">
            <span></span>
            <span dangerouslySetInnerHTML={{ __html: helpText }} />
          </div>
        </div>
      </div>
      {/* field area */}
      <div className="field-area flex-col flex-1">
        {items.map((item, index) => (
          <div className="field-box flex-col" key={index}>
            {item.fieldTitle && <p className="field-title">{item.fieldTitle}</p>}
            {item.fieldValue}
            {item.addButton && (
              <IconButton size="small" className='w-fit' sx={{ alignItems: 'start', justifyContent: 'start' }}>
                <AddCircle sx={{ fontSize: 35, color: 'primary.main' }} />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}