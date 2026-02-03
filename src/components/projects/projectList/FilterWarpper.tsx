import React from "react";

export default function FilterWarpper({ title, subText, children }: { title: string; subText?: string; children: React.ReactNode }){
  return (
  <div className='filter-box flex-col'>
    <div className='filter-title align-start justify-between'>
      <div className='text-box flex-col'>
        <strong>{title}</strong>
        {subText && <p>{subText}</p>}
      </div>
    </div>
    <div className='filter-options align-center flex-wrap'>{children}</div>
  </div>
)};