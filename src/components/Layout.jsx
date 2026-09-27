import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SecretSignature from './SecretSignature'

function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <SecretSignature/>
    </div>
  )
}

export default Layout