import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div id='devHub' className='wh-100'>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
