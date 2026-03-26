import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fingerprint, Shield, XCircle, RefreshCw, AlertOctagon } from 'lucide-react'
import RiskMeter from './RiskMeter'

/**
 * BiometricModal — Full-screen warning for HIGH risk payments
 * Simulates biometric authentication
 */
export default function BiometricModal({ result, formData, onConfirm, onCancel, onRecheck }) {
  const [biometricState, setBiometricState] = useState('idle') // idle | scanning | success | failed

  const handleBiometric = () => {
    setBiometricState('scanning')
    setTimeout(() => {
      setBiometricState('success')
      setTimeout(() => onConfirm(), 800)
    }, 2000)
  }

  if (!result) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          className="w-full max-w-lg"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          style={{
            background: 'rgba(10,10,18,0.99)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '24px',
            boxShadow: '0 0 80px rgba(239,68,68,0.2)'
          }}
        >
          {/* Red header */}
          <div className="p-6 rounded-t-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(220,38,38,0.06))' }}>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)' }}
              >
                <AlertOctagon size={24} style={{ color: '#ef4444' }} />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">⚠️ High Risk Detected!</h2>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>This payment looks very unusual</p>
              </div>
            </div>

            {/* AI Message */}
            <div className="mt-3 p-3 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                🤖 <strong>SafePay AI:</strong> {result.aiExplanation}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Risk meter */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <RiskMeter score={result.riskScore} level={result.riskLevel} />
            </div>

            {/* Risk Reasons */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                WHY THIS IS FLAGGED:
              </p>
              {result.riskReasons?.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 p-2.5 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
                >
                  <span className="text-sm">{r.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#ef4444' }}>{r.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment summary */}
            <div className="p-3 rounded-xl flex justify-between items-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>To: {formData.receiverName}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{formData.upiId}</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>
                ₹{parseFloat(formData.amount).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRecheck}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}
              >
                <RefreshCw size={15} />
                Recheck
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
              >
                <XCircle size={15} />
                Cancel
              </motion.button>
            </div>

            {/* Biometric confirm */}
            <div className="text-center pt-2">
              <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Override warning with biometric confirmation
              </p>
              <motion.button
                onClick={handleBiometric}
                disabled={biometricState === 'scanning' || biometricState === 'success'}
                whileHover={biometricState === 'idle' ? { scale: 1.05 } : {}}
                whileTap={biometricState === 'idle' ? { scale: 0.95 } : {}}
                className="relative inline-flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                style={{
                  background: biometricState === 'success'
                    ? 'rgba(0,255,136,0.1)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${biometricState === 'success' ? 'rgba(0,255,136,0.4)' : biometricState === 'scanning' ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.1)'}`
                }}
              >
                {/* Scanning ring */}
                {biometricState === 'scanning' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ boxShadow: ['0 0 0 0 rgba(168,85,247,0.4)', '0 0 0 8px rgba(168,85,247,0)'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <motion.div
                  animate={biometricState === 'scanning' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.8, repeat: biometricState === 'scanning' ? Infinity : 0 }}
                >
                  <Fingerprint
                    size={36}
                    style={{
                      color: biometricState === 'success' ? '#00ff88'
                        : biometricState === 'scanning' ? '#a855f7'
                        : 'rgba(255,255,255,0.5)'
                    }}
                  />
                </motion.div>
                <span className="text-xs font-medium" style={{
                  color: biometricState === 'success' ? '#00ff88'
                    : biometricState === 'scanning' ? '#a855f7'
                    : 'rgba(255,255,255,0.5)'
                }}>
                  {biometricState === 'idle' && 'Touch to authenticate'}
                  {biometricState === 'scanning' && 'Scanning...'}
                  {biometricState === 'success' && '✓ Verified!'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
