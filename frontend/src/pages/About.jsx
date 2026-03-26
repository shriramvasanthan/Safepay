import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Code, Brain, Palette, Server, Github, Linkedin } from 'lucide-react'

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

const team = [
  { name: 'Arjun Krishnan', role: 'Full Stack Lead', icon: Code, color: '#00ff88', desc: 'React + Node.js architecture, API design, and risk engine implementation.' },
  { name: 'Sneha Ramachandran', role: 'AI/ML Engineer', icon: Brain, color: '#a855f7', desc: 'Risk scoring algorithm design, behavioral pattern analysis, and rule engine logic.' },
  { name: 'Vikram Nair', role: 'UI/UX Designer', icon: Palette, color: '#3b82f6', desc: 'Fintech-grade UI design, Framer Motion animations, and user experience flows.' },
  { name: 'Preethi Selvam', role: 'Backend Engineer', icon: Server, color: '#fbbf24', desc: 'Express.js API, data modeling, transaction history, and backend optimization.' },
]

const techStack = [
  { name: 'React.js', category: 'Frontend', color: '#61dafb' },
  { name: 'Vite', category: 'Build Tool', color: '#646cff' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#38bdf8' },
  { name: 'Framer Motion', category: 'Animations', color: '#ff4d6d' },
  { name: 'Recharts', category: 'Charts', color: '#00ff88' },
  { name: 'Node.js', category: 'Backend', color: '#6cc24a' },
  { name: 'Express.js', category: 'API', color: '#ffffff' },
  { name: 'Lucide Icons', category: 'Icons', color: '#f59e0b' },
]

const milestones = [
  { date: 'Week 1', title: 'Problem Identification', desc: 'Research on UPI fraud and wrong payment statistics in India' },
  { date: 'Week 2', title: 'Architecture Design', desc: 'Designed risk engine logic and full-stack architecture' },
  { date: 'Week 3', title: 'Core Development', desc: 'Built payment form, risk engine API, and warning components' },
  { date: 'Week 4', title: 'UI Polish & Demo', desc: 'Fintech-grade dark theme, animations, and dashboard charts' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      <div className="glow-bg-green w-96 h-96 top-0 right-0 opacity-25" />
      <div className="glow-bg-purple w-96 h-96 bottom-0 left-0 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)', boxShadow: '0 0 60px rgba(0,255,136,0.4)' }}
          >
            <Shield size={36} className="text-black" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag tag-green mb-4 inline-flex"
          >
            IntentPay AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4"
          >
            About <span className="gradient-text">IntentPay AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            We built IntentPay AI to solve a real problem that affects millions of Indian UPI users daily.
          </motion.p>
        </div>

        {/* ── Project Description ── */}
        <FadeUp className="mb-14">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-black mb-4">The Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#00ff88' }}>Problem Statement</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  India processes over 10 billion UPI transactions monthly. A significant fraction — estimated at over ₹2,000 crore annually — involves wrong payments, fraudulent transfers, or accidental sends. Once sent, UPI payments are practically irreversible without the receiver's cooperation.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Current UPI apps provide zero pre-transaction intelligence. There's no system that says "wait — are you sure about this?"
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#a855f7' }}>Our Solution</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  IntentPay AI introduces a pre-transaction risk verification layer that analyzes every payment using behavioral data, contextual signals, and pattern matching — then provides graduated interventions based on risk level.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Low risk? Seamless. Medium risk? A smart nudge. High risk? Full biometric block. All in under 50ms.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Team ── */}
        <FadeUp className="mb-14">
          <h2 className="text-3xl font-black text-center mb-8">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, icon: Icon, color, desc }, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="glass-card p-5 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-white mb-0.5">{name}</h3>
                  <p className="text-xs font-medium mb-3" style={{ color }}>
                    {role}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {desc}
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    {[Github, Linkedin].map((SIcon, j) => (
                      <button key={j} className="p-1.5 rounded-lg transition-colors hover:text-neon-green"
                        style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>
                        <SIcon size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        {/* ── Tech Stack ── */}
        <FadeUp className="mb-14">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-black mb-6 text-center">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {techStack.map(({ name, category, color }) => (
                <div key={name} className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-semibold" style={{ color }}>{name}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{category}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Timeline ── */}
        <FadeUp className="mb-14">
          <h2 className="text-3xl font-black text-center mb-8">
            Development <span className="gradient-text-purple">Timeline</span>
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, #00ff88, #a855f7, transparent)' }} />
            <div className="space-y-8">
              {milestones.map(({ date, title, desc }, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className={`flex gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                    <div className={`hidden md:block flex-1 text-right ${i % 2 !== 0 ? 'text-left' : ''}`}>
                      {i % 2 === 0 && (
                        <div className="glass-card p-4 inline-block text-right">
                          <p className="text-xs font-bold mb-1" style={{ color: '#00ff88' }}>{date}</p>
                          <h3 className="font-bold text-white text-sm">{title}</h3>
                          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #00ff88, #a855f7)', color: '#050508' }}>
                        {i + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="md:hidden glass-card p-4 mb-2">
                        <p className="text-xs font-bold mb-1" style={{ color: '#00ff88' }}>{date}</p>
                        <h3 className="font-bold text-white text-sm">{title}</h3>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                      </div>
                      {i % 2 !== 0 && (
                        <div className="hidden md:block glass-card p-4">
                          <p className="text-xs font-bold mb-1" style={{ color: '#a855f7' }}>{date}</p>
                          <h3 className="font-bold text-white text-sm">{title}</h3>
                          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>


      </div>
    </div>
  )
}
