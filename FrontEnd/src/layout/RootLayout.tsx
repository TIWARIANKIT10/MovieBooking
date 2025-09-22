import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const RootLayout = () => {
    const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <div>
        <Toaster/>
      {!isAdminRoute &&  <Navbar/>} 
        <Outlet/>
     {!isAdminRoute &&  <Footer/>} 
    </div>
  )
}

export default RootLayout