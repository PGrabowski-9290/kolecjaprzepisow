import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='main'>
      <Nav/>
      <section className='page'>
        <Outlet />
      </section>
    </div>
  )
}

export default Layout