import LeftMenuBar from '@/components/design/LeftMenuBar'
import React from 'react'

export default function UserListPage(){
  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='user-list' />
      {/* 2. right area */}
    </div>
  )
}
