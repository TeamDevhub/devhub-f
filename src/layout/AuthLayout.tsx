import React from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='auth-layout'>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
