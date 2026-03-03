import LeftMenuBar from '@/components/design/LeftMenuBar'
import React from 'react'

export default function TermsManagementPage(){
  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='terms' />
      {/* 2. right area */}
    </div>
  )
}
