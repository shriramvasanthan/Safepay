import { Link } from 'react-router-dom'
import { Shield, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)' }}>
                <Shield size={16} className="text-black" />
              </div>
              <span className="font-bold text-lg">
                Intent<span className="gradient-text">Pay</span> AI
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A smart payment simulation platform that detects and prevents accidental UPI transactions using AI-based intent verification.
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Built for IntentPay AI
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Product</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/demo', label: 'Try Demo' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/about', label: 'About' }
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className="text-sm transition-colors duration-200 hover:text-neon-green"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Project</h4>
            <div className="flex flex-col gap-2">
              {['Risk Engine', 'Intent Analysis', 'Privacy Policy', 'Contact'].map(item => (
                <span key={item} className="text-sm cursor-default"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2024 IntentPay AI · For demo/educational purposes only
          </p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <button key={i} className="transition-colors duration-200 hover:text-neon-green"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
