import React from 'react'

export default function Loading(){
  return (
    <div className="loading-wrap w-100 h-100 flex-center">
      <div className="loading-container flex gap-8">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  )
}
