import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Shield, Zap, Brain, Lock, AlertTriangle, CheckCircle,
  ArrowRight, TrendingUp, Users, Eye
} from 'lucide-react'

// Reusable fade-up animation
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: Brain,
    color: '#a855f7',
    title: 'AI Intent Detection',
    desc: 'Behavioral pattern analysis compares current payment against your history to detect anomalies instantly.'
  },
  {
    icon: Shield,
    color: '#00ff88',
    title: 'Smart Risk Scoring',
    desc: 'Multi-factor risk engine evaluates amount, receiver, timing, and keywords to generate a 0–100 risk score.'
  },
  {
    icon: Zap,
    color: '#3b82f6',
    title: 'Real-time Alerts',
    desc: 'Graduated warnings — from gentle nudges to full biometric blocks — based on how suspicious the payment is.'
  },
  {
    icon: Lock,
    color: '#f59e0b',
    title: 'Privacy First',
    desc: 'All analysis happens locally. No payment data is stored on external servers or shared with third parties.'
  },
  {
    icon: TrendingUp,
    color: '#ef4444',
    title: 'Spending Insights',
    desc: 'Dashboard shows your payment patterns, risk distribution, and helps you understand your spending behavior.'
  },
  {
    icon: Eye,
    color: '#06b6d4',
    title: 'Fraud Pattern Matching',
    desc: 'Known scam keywords and UPI patterns are flagged in real-time before you tap that confirm button.'
  }
]

const steps = [
  { n: '01', icon: Users, color: '#a855f7', title: 'Behavior Analysis', desc: 'IntentPay learns your typical payment patterns — average amounts, known contacts, and usual transaction times.' },
  { n: '02', icon: Brain, color: '#3b82f6', title: 'Risk Scoring', desc: 'Every payment is evaluated against 6+ risk factors and assigned a score from 0 to 100 in milliseconds.' },
  { n: '03', icon: Shield, color: '#00ff88', title: 'Smart Intervention', desc: 'Based on your score, the app either approves seamlessly, shows a warning, or requires biometric confirmation.' }
]

const comparison = [
  { feature: 'Wrong payment detection', upi: false, intentpay: true },
  { feature: 'Risk scoring before payment', upi: false, intentpay: true },
  { feature: 'Behavioral analysis', upi: false, intentpay: true },
  { feature: 'Smart warning alerts', upi: false, intentpay: true },
  { feature: 'Biometric override', upi: false, intentpay: true },
  { feature: 'Transaction reversal', upi: false, intentpay: false },
  { feature: 'Basic UPI transfer', upi: true, intentpay: true },
  { feature: 'QR code support', upi: true, intentpay: true },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4">
        {/* Ambient glows */}
        <div className="glow-bg-green w-[600px] h-[600px] -top-32 -right-32 opacity-60" />
        <div className="glow-bg-purple w-[500px] h-[500px] top-1/2 -left-48 opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 tag tag-green mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                AI-Powered Payment Safety · MVP Demo
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
              >
                Verify intent,<br />
                <span className="gradient-text">not just the tap.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                IntentPay AI analyzes every UPI payment for risk before you confirm.
                Stop wrong transfers, scam payments, and accidental sends — before they happen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/demo" className="btn-neon flex items-center gap-2 text-base px-8 py-4">
                  <Zap size={18} /> Try Demo
                </Link>
                <Link to="/dashboard" className="btn-ghost flex items-center gap-2 text-base px-8 py-4">
                  View Dashboard <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8 mt-10"
              >
                {[['₹2.4L+', 'Prevented'], ['6+', 'Risk Factors'], ['<50ms', 'Analysis Time']].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold gradient-text">{val}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="float-anim relative">
                {/* Phone frame */}
                <div className="w-72 rounded-[40px] overflow-hidden"
                  style={{
                    background: '#0a0a12',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,136,0.1)'
                  }}>
                  {/* Status bar */}
                  <div className="px-6 py-3 flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span>9:41</span>
                    <span>IntentPay AI</span>
                    <span>●●●</span>
                  </div>

                  <div className="px-6 pb-8 space-y-4">
                    {/* Header */}
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)' }}>
                        <Shield size={24} className="text-black" />
                      </div>
                      <p className="text-xs font-bold" style={{ color: '#00ff88' }}>IntentPay AI</p>
                    </div>

                    {/* Payment card */}
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Sending to</p>
                      <p className="font-semibold text-sm">QuickLoan Services</p>
                      <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>quickloan@ybl</p>
                      <p className="text-3xl font-black" style={{ color: '#ef4444' }}>₹50,000</p>
                    </div>

                    {/* Risk meter mini */}
                    <div className="p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <div className="flex justify-between text-xs mb-2">
                        <span style={{ color: '#ef4444' }}>⚠️ High Risk Detected</span>
                        <span className="font-bold" style={{ color: '#ef4444' }}>91/100</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-full w-[91%] rounded-full" style={{ background: 'linear-gradient(90deg, #ef4444, #dc2626)', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="text-xs p-2 rounded-lg text-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                      🚨 3 risk factors detected
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2.5 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                        Cancel
                      </button>
                      <button className="py-2.5 rounded-xl text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                        ☝️ Biometric
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-10 top-20 tag tag-red text-xs"
                >
                  🚨 High Risk
                </motion.div>
                <motion.div
                  animate={{ x: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -left-12 bottom-24 tag tag-green text-xs"
                >
                  ✅ AI Protected
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="tag tag-red mb-4 inline-block">The Problem</span>
            <h2 className="text-4xl font-black mb-4">
              Wrong payments are <span className="gradient-text-purple">irreversible.</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Every year, millions of Indians lose money to wrong UPI transfers. Once sent, you cannot get it back without the receiver's cooperation.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '💸', stat: '₹2,000 Cr+', label: 'Lost to wrong UPI transfers annually in India' },
              { icon: '😱', stat: '68%', label: 'Of users have made at least one accidental payment' },
              { icon: '🚫', stat: '0%', label: 'Chance of recovery without receiver consent' }
            ].map(({ icon, stat, label }, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="glass-card p-6 text-center h-full">
                  <div className="text-4xl mb-3">{icon}</div>
                  <p className="text-3xl font-black mb-2" style={{ color: '#ef4444' }}>{stat}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="py-24 px-4" style={{ background: 'rgba(0,255,136,0.02)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="tag tag-green mb-4 inline-block">The Solution</span>
            <h2 className="text-4xl font-black mb-4">
              Three steps to <span className="gradient-text">payment safety</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }} />
            
            {steps.map(({ n, icon: Icon, color, title, desc }, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="glass-card p-6 relative">
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: color, color: '#050508' }}>{n}</div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <span className="tag tag-purple mb-4 inline-block">Features</span>
            <h2 className="text-4xl font-black mb-4">
              Built for <span className="gradient-text-purple">real protection</span>
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Every feature is designed to prevent the moment you go "wait, did I just send that?"
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, color, title, desc }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="glass-card p-5 h-full hover:border-opacity-30 transition-all duration-300 group"
                  style={{ borderColor: `${color}15` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="font-semibold mb-1.5">{title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24 px-4" style={{ background: 'rgba(168,85,247,0.02)' }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-12">
            <span className="tag tag-purple mb-4 inline-block">Comparison</span>
            <h2 className="text-4xl font-black">
              UPI vs <span className="gradient-text">IntentPay AI</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="glass-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Feature</div>
                <div className="text-sm font-bold text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>Regular UPI</div>
                <div className="text-sm font-bold text-center gradient-text">IntentPay AI</div>
              </div>
              {comparison.map(({ feature, upi, intentpay }, i) => (
                <div key={i} className={`grid grid-cols-3 p-4 ${i < comparison.length - 1 ? 'border-b' : ''}`}
                  style={{ borderColor: 'rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{feature}</span>
                  <div className="text-center">
                    {upi
                      ? <CheckCircle size={18} className="inline" style={{ color: '#00ff88' }} />
                      : <AlertTriangle size={18} className="inline" style={{ color: '#ef4444' }} />}
                  </div>
                  <div className="text-center">
                    {intentpay
                      ? <CheckCircle size={18} className="inline" style={{ color: '#00ff88' }} />
                      : <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>UPI Limitation</span>}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="text-4xl font-black mb-4">
              Ready to pay <span className="gradient-text">smarter?</span>
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Try the live demo and see how IntentPay AI protects you from wrong payments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/demo" className="btn-neon flex items-center gap-2 text-base px-10 py-4">
                <Zap size={18} /> Try Demo Now
              </Link>
              <Link to="/how-it-works" className="btn-ghost flex items-center gap-2 text-base px-10 py-4">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
