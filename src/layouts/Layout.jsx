import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 flex-1"> {/* Add padding-top to prevent content from being hidden behind fixed navbar */}
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout
