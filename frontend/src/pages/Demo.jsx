import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Info } from 'lucide-react'
import PaymentForm from '../components/PaymentForm'
import RiskMeter from '../components/RiskMeter'
import WarningPopup from '../components/WarningPopup'
import BiometricModal from '../components/BiometricModal'
import SuccessScreen from '../components/SuccessScreen'
import { analyzePayment, saveTransaction } from '../utils/api'

// Demo states: form | analyzing | low | medium | high | success | cancelled
export default function Demo() {
  const [state, setState] = useState('form')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState(null)
  const [error, setError] = useState(null)

  // ── Step 1: Analyze payment when user submits ──────────────────────────────
  const handleAnalyze = async (data) => {
    setFormData(data)
    setLoading(true)
    setError(null)

    try {
      const riskResult = await analyzePayment(data)
      setResult(riskResult)

      // Route based on risk level
      if (riskResult.riskLevel === 'LOW') {
        setState('low')
        // Auto-save low risk as completed
        await saveTransaction({
          ...data,
          riskScore: riskResult.riskScore,
          riskLevel: riskResult.riskLevel,
          status: 'completed'
        })
      } else if (riskResult.riskLevel === 'MEDIUM') {
        setState('medium')
      } else {
        setState('high')
      }
    } catch (err) {
      // Fallback: use client-side mock if backend not running
      const mockResult = getMockResult(data)
      setResult(mockResult)
      if (mockResult.riskLevel === 'LOW') setState('low')
      else if (mockResult.riskLevel === 'MEDIUM') setState('medium')
      else setState('high')
    } finally {
      setLoading(false)
    }
  }

  // ── Confirm medium-risk payment ────────────────────────────────────────────
  const handleMediumConfirm = async () => {
    setState('form') // hide popup
    try {
      await saveTransaction({ ...formData, riskScore: result.riskScore, riskLevel: result.riskLevel, status: 'completed' })
    } catch (_) {}
    setResult(prev => ({ ...prev, status: 'confirmed' }))
    setState('success')
  }

  // ── Confirm high-risk payment (after biometric) ────────────────────────────
  const handleHighConfirm = async () => {
    try {
      await saveTransaction({ ...formData, riskScore: result.riskScore, riskLevel: result.riskLevel, status: 'completed' })
    } catch (_) {}
    setResult(prev => ({ ...prev, status: 'confirmed' }))
    setState('success')
  }

  // ── Cancel payment ─────────────────────────────────────────────────────────
  const handleCancel = async () => {
    try {
      await saveTransaction({ ...formData, riskScore: result?.riskScore || 0, riskLevel: result?.riskLevel || 'HIGH', status: 'cancelled' })
    } catch (_) {}
    setState('cancelled')
  }

  const handleReset = () => {
    setState('form')
    setResult(null)
    setFormData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-bg-green w-96 h-96 top-0 right-0 opacity-40" />
      <div className="glow-bg-purple w-96 h-96 bottom-0 left-0 opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 tag tag-green mb-4"
          >
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
            Live Demo — Risk Engine Active
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-3"
          >
            Payment <span className="gradient-text">Simulator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Enter payment details and see SafePay AI analyze risk in real-time
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Left: Payment Form or Result ─────────────────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              layout
              className="glass-card p-6"
            >
              <AnimatePresence mode="wait">
                {/* Form state */}
                {(state === 'form') && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-5">
                      <Shield size={18} style={{ color: '#00ff88' }} />
                      <h2 className="font-bold">New Payment</h2>
                    </div>
                    <PaymentForm onAnalyze={handleAnalyze} loading={loading} />
                  </motion.div>
                )}

                {/* LOW risk — success */}
                {state === 'low' && result && (
                  <motion.div key="low" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SuccessScreen result={result} formData={formData} onReset={handleReset} />
                  </motion.div>
                )}

                {/* SUCCESS after confirm */}
                {state === 'success' && result && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SuccessScreen result={result} formData={formData} onReset={handleReset} />
                  </motion.div>
                )}

                {/* CANCELLED */}
                {state === 'cancelled' && (
                  <motion.div
                    key="cancelled"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-4">🛡️</div>
                    <h2 className="text-2xl font-bold mb-2">Payment Cancelled</h2>
                    <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Good call! You just protected yourself from a potentially risky transaction.
                    </p>
                    {result && (
                      <p className="text-sm mb-6" style={{ color: '#ef4444' }}>
                        Risk Score was {result.riskScore}/100
                      </p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="btn-neon px-8 py-3"
                    >
                      Try Another Payment
                    </motion.button>
                  </motion.div>
                )}

                {/* Medium/High — show form again with popup/modal overlay */}
                {(state === 'medium' || state === 'high') && (
                  <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-5">
                      <Shield size={18} style={{ color: '#00ff88' }} />
                      <h2 className="font-bold">Payment Under Review</h2>
                    </div>
                    <PaymentForm onAnalyze={handleAnalyze} loading={loading} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Right: Info panel ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Real-time risk display (when result exists) */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="riskmeter"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className={`p-5 rounded-2xl ${
                    result.riskLevel === 'LOW' ? 'glass-card-green'
                    : result.riskLevel === 'MEDIUM' ? 'glass-card'
                    : 'glass-card-red'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={16} style={{ color: result.riskLevel === 'LOW' ? '#00ff88' : result.riskLevel === 'MEDIUM' ? '#fbbf24' : '#ef4444' }} />
                    <span className="text-sm font-semibold">Risk Analysis</span>
                  </div>
                  <RiskMeter score={result.riskScore} level={result.riskLevel} />

                  {/* AI explanation */}
                  <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}>
                    <span className="font-semibold text-white">🤖 AI: </span>
                    {result.aiExplanation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* How it works info box */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} style={{ color: '#a855f7' }} />
                <span className="text-sm font-semibold">Risk Factors Analyzed</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '💰', label: 'Amount vs your average', color: '#00ff88' },
                  { icon: '👤', label: 'New vs known receiver', color: '#a855f7' },
                  { icon: '🌙', label: 'Time of transaction', color: '#3b82f6' },
                  { icon: '🚨', label: 'Suspicious keywords', color: '#ef4444' },
                  { icon: '🔢', label: 'Large round amounts', color: '#fbbf24' },
                  { icon: '✅', label: 'UPI ID format validity', color: '#00ff88' },
                ].map(({ icon, label, color }, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: `${color}15` }}>{icon}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk scale legend */}
            <div className="glass-card p-5">
              <p className="text-sm font-semibold mb-3">Risk Scale</p>
              <div className="space-y-2">
                {[
                  { range: '0 – 35', label: 'LOW', desc: 'Safe to proceed', color: '#00ff88' },
                  { range: '35 – 70', label: 'MEDIUM', desc: 'Needs attention', color: '#fbbf24' },
                  { range: '70 – 100', label: 'HIGH', desc: 'Block & warn', color: '#ef4444' },
                ].map(({ range, label, desc, color }) => (
                  <div key={label} className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ background: `${color}08` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-xs font-bold" style={{ color, minWidth: 52 }}>{range}</span>
                    <span className="text-xs font-semibold" style={{ color }}>{label}</span>
                    <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MEDIUM risk popup ── */}
      {state === 'medium' && result && (
        <WarningPopup
          result={result}
          formData={formData}
          onConfirm={handleMediumConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* ── HIGH risk modal ── */}
      {state === 'high' && result && (
        <BiometricModal
          result={result}
          formData={formData}
          onConfirm={handleHighConfirm}
          onCancel={handleCancel}
          onRecheck={handleReset}
        />
      )}
    </div>
  )
}

// ── Client-side fallback mock (when backend not running) ─────────────────────
function getMockResult(data) {
  const amount = parseFloat(data.amount)
  const avgAmount = 2740
  let riskScore = 0
  const riskReasons = []
  const safeReasons = []

  if (amount > avgAmount * 3) {
    riskScore += 35
    riskReasons.push({ icon: '💸', title: 'Unusually High Amount', detail: `₹${amount.toLocaleString('en-IN')} is ${(amount / avgAmount).toFixed(1)}x your average` })
  } else if (amount > avgAmount * 2) {
    riskScore += 25
    riskReasons.push({ icon: '💰', title: 'Above Average Amount', detail: `Higher than your usual payments` })
  } else {
    safeReasons.push('Amount is within normal range')
  }

  const knownUPIs = ['priya@okaxis', 'meera.iyer@upi', 'mom@ybl', 'dad@hdfc']
  if (!knownUPIs.includes(data.upiId)) {
    riskScore += 30
    riskReasons.push({ icon: '👤', title: 'New Recipient', detail: `First time sending to ${data.upiId}` })
  } else {
    safeReasons.push(`${data.upiId} is a known contact`)
  }

  const suspicious = ['loan', 'lucky', 'win', 'prize', 'urgent', 'quick', 'fast']
  const text = `${data.upiId} ${data.receiverName} ${data.note || ''}`.toLowerCase()
  const found = suspicious.find(k => text.includes(k))
  if (found) {
    riskScore += 30
    riskReasons.push({ icon: '🚨', title: 'Suspicious Keyword', detail: `"${found}" detected — common in scams` })
  }

  riskScore = Math.min(100, riskScore)
  const riskLevel = riskScore < 35 ? 'LOW' : riskScore < 70 ? 'MEDIUM' : 'HIGH'
  const message = riskScore < 35 ? 'Payment looks safe' : riskScore < 70 ? 'This payment needs your attention' : 'High risk — this looks unusual!'

  return {
    riskScore,
    riskLevel,
    message,
    riskReasons,
    safeReasons,
    avgAmount,
    aiExplanation: riskScore < 35
      ? `This transaction looks consistent with your normal payment behavior. Safe to proceed.`
      : riskScore < 70
      ? `SafePay AI detected ${riskReasons.length} unusual signal(s). Please verify all details carefully.`
      : `HIGH RISK: ${riskReasons.length} anomalies detected. This matches fraud/scam patterns. Do not proceed without verification.`
  }
}
