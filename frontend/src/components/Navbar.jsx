import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Try Demo' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: scrolled
          ? 'rgba(5,5,8,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)' }}>
              <Shield size={16} className="text-black" />
            </div>
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 20px rgba(0,255,136,0.6)' }} />
          </div>
          <span className="font-bold text-lg">
            Safe<span className="gradient-text">Pay</span>
            <span className="text-xs ml-1 tag tag-green">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${location.pathname === link.href ? 'text-neon-green' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/demo" className="btn-neon flex items-center gap-2">
            <Zap size={14} />
            Try Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,8,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link py-2 border-b text-base ${
                    location.pathname === link.href ? 'text-neon-green' : ''
                  }`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/demo" className="btn-neon text-center mt-2">
                Try Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
