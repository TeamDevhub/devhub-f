import React from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div id='devHub' className='wh-100'>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
