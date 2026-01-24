import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Anchor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const NavLink = ({ to, children, mobile = false, onClick }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className={clsx(
        "relative font-medium transition-colors duration-300",
        mobile ? "text-2xl py-4 block border-b border-white/10" : "text-sm uppercase tracking-wider hover:text-ocean-blue",
        isActive && !mobile ? "text-ocean-blue" : "text-slate-800",
        mobile && isActive ? "text-ocean-blue" : ""
      )}
    >
      {children}
      {!mobile && isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ocean-blue"
        />
      )}
    </Link>
  )
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4",
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-ocean-blue p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
              <Anchor size={24} />
            </div>
            <span className={clsx(
              "font-serif font-bold text-xl tracking-tight",
              isScrolled ? "text-slate-900" : "text-slate-900" // Always dark for readability, or adjust based on hero bg
            )}>
              2026年澎湖花火節<span className="text-ocean-blue">最新消息</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">首頁</NavLink>
            <NavLink to="/fireworks-2026">2026 花火節</NavLink>
            <NavLink to="/booking">預約詢價</NavLink>
            <NavLink to="/activities">熱門活動</NavLink>
            <NavLink to="/seasons">四季玩法</NavLink>
            <NavLink to="/moses-sea">摩西分海</NavLink>
            <NavLink to="/food-map">美食地圖</NavLink>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-800 hover:bg-slate-200"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 justify-center items-center text-center">
              <NavLink to="/" mobile onClick={() => setIsMobileMenuOpen(false)}>首頁</NavLink>
              <NavLink to="/fireworks-2026" mobile onClick={() => setIsMobileMenuOpen(false)}>2026 花火節</NavLink>
              <NavLink to="/booking" mobile onClick={() => setIsMobileMenuOpen(false)}>預約詢價</NavLink>
              <NavLink to="/seasons" mobile onClick={() => setIsMobileMenuOpen(false)}>四季玩法</NavLink>
              <NavLink to="/moses-sea" mobile onClick={() => setIsMobileMenuOpen(false)}>摩西分海</NavLink>
              <NavLink to="/food-map" mobile onClick={() => setIsMobileMenuOpen(false)}>美食地圖</NavLink>
              {/* <NavLink to="/blog" mobile onClick={() => setIsMobileMenuOpen(false)}>澎湖美學</NavLink> */}
              {/* <NavLink to="/itinerary" mobile onClick={() => setIsMobileMenuOpen(false)}>智能行程</NavLink> */}
            </div>

            <div className="mt-auto pb-8">
              <a 
                href="https://line.me/ti/p/2R6s8FaJ6Q"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-ocean-blue text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/30 text-center"
              >
                前往預約詢價
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
