import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SEO from './SEO'

function Layout() {
  return (
    <div>
        <SEO />
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout