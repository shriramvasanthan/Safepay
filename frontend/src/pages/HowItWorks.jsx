import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Shield, Zap, AlertTriangle, CheckCircle, Activity, Eye, Lock } from 'lucide-react'

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const riskFactors = [
  { icon: '💰', name: 'Amount Analysis', weight: '+25–35 pts', color: '#00ff88', desc: 'Compares the current amount to your historical average. If you normally send ₹500 and try to send ₹50,000, that\'s a red flag.' },
  { icon: '👤', name: 'New Receiver Check', weight: '+30 pts', color: '#a855f7', desc: 'First-time payments to unknown UPI IDs carry higher risk. Known contacts from your history are flagged as safe.' },
  { icon: '🌙', name: 'Time of Transaction', weight: '+20 pts', color: '#3b82f6', desc: 'Transactions between 12AM–5AM are statistically more likely to be fraudulent or made under duress.' },
  { icon: '🚨', name: 'Keyword Detection', weight: '+30 pts', color: '#ef4444', desc: 'Words like "loan", "urgent", "prize", "lucky" in UPI IDs or notes match known scam and phishing patterns.' },
  { icon: '🔢', name: 'Round Number Check', weight: '+10 pts', color: '#fbbf24', desc: 'Large round numbers (₹10,000, ₹50,000) are more common in forced/scam transactions than organic payments.' },
  { icon: '✅', name: 'UPI Format Validation', weight: '+15 pts', color: '#06b6d4', desc: 'Invalid or unusual UPI ID formats are checked against standard patterns (name@bank format).' },
]

const interventions = [
  {
    level: 'LOW', score: '0–35', color: '#00ff88', icon: CheckCircle,
    title: 'Seamless Approval',
    desc: 'Payment proceeds normally with a green confirmation screen. No friction for safe transactions.',
    steps: ['Risk score calculated', 'Score < 35 → Safe', 'Show success screen', 'Save to history']
  },
  {
    level: 'MEDIUM', score: '35–70', color: '#fbbf24', icon: AlertTriangle,
    title: 'Smart Warning Popup',
    desc: 'A modal shows your usual amount vs current amount, lists risk reasons, and asks you to confirm.',
    steps: ['Risk score calculated', 'Score 35–70 → Caution', 'Show comparison popup', 'User confirms or cancels']
  },
  {
    level: 'HIGH', score: '70–100', color: '#ef4444', icon: Shield,
    title: 'Full Block + Biometric',
    desc: 'A full-screen warning highlights all risk reasons. Biometric confirmation required to override.',
    steps: ['Risk score calculated', 'Score > 70 → Danger', 'Full-screen block', 'Biometric to override']
  }
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      <div className="glow-bg-purple w-96 h-96 top-0 right-0 opacity-30" />
      <div className="glow-bg-green w-96 h-96 bottom-0 left-0 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag tag-purple mb-4 inline-flex"
          >
            Technical Deep Dive
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4"
          >
            How <span className="gradient-text-purple">IntentPay AI</span> Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            A rule-based AI risk engine that analyzes six behavioral and contextual signals in under 50ms.
          </motion.p>
        </div>

        {/* ── System Architecture Flow ── */}
        <FadeUp className="mb-16">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {[
                { icon: Activity, label: 'User Input', sub: 'Payment form', color: '#3b82f6' },
                { icon: Brain, label: 'Risk Engine', sub: 'Node.js API', color: '#a855f7' },
                { icon: Eye, label: 'Analysis', sub: '6 risk factors', color: '#00ff88' },
                { icon: AlertTriangle, label: 'Score', sub: '0–100 rating', color: '#fbbf24' },
                { icon: Lock, label: 'Action', sub: 'Approve/Warn/Block', color: '#ef4444' },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  {i > 0 && (
                    <div className="hidden md:block absolute" style={{ marginLeft: '-2rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</p>
                  </div>
                  {i < 4 && <div className="md:hidden text-xl" style={{ color: 'rgba(255,255,255,0.2)' }}>↓</div>}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Risk Factors ── */}
        <FadeUp className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Risk Scoring Factors</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Each factor contributes points to the risk score. Max score is capped at 100.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskFactors.map(({ icon, name, weight, color, desc }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="glass-card p-5 flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                    {icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-white">{name}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                        {weight}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        {/* ── Intervention Levels ── */}
        <FadeUp className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Smart Interventions</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              IntentPay responds differently based on the risk level — graduated friction, not blanket blocks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {interventions.map(({ level, score, color, icon: Icon, title, desc, steps }, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="glass-card h-full overflow-hidden">
                  <div className="p-4" style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}>
                    <div className="flex items-center gap-3 mb-1">
                      <Icon size={20} style={{ color }} />
                      <span className="font-bold text-sm px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color }}>
                        {level} RISK
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Score: {score}</p>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-2 text-white">{title}</h3>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                    <div className="space-y-2">
                      {steps.map((step, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{ background: `${color}20`, color }}>{j + 1}</div>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        {/* ── API Endpoints ── */}
        <FadeUp>
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Zap size={18} style={{ color: '#00ff88' }} />
              API Endpoints
            </h2>
            <div className="space-y-3">
              {[
                { method: 'POST', path: '/api/analyze-payment', desc: 'Analyze payment risk and return score + reasons', color: '#a855f7' },
                { method: 'POST', path: '/api/save-transaction', desc: 'Save a completed/cancelled transaction to history', color: '#3b82f6' },
                { method: 'GET', path: '/api/transactions', desc: 'Retrieve all transactions + dashboard statistics', color: '#00ff88' },
                { method: 'GET', path: '/api/health', desc: 'Health check endpoint for service status', color: '#fbbf24' },
              ].map(({ method, path, desc, color }) => (
                <div key={path} className="flex flex-wrap items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-bold px-2 py-1 rounded"
                    style={{ background: `${color}20`, color, fontFamily: 'monospace' }}>{method}</span>
                  <code className="text-sm font-mono" style={{ color: '#00ff88' }}>{path}</code>
                  <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
