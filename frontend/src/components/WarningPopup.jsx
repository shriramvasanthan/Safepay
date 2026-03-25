import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, CheckCircle, XCircle } from 'lucide-react'
import RiskMeter from './RiskMeter'

/**
 * WarningPopup — Modal for MEDIUM risk payments
 * Shows comparison of usual vs current amount
 */
export default function WarningPopup({ result, formData, onConfirm, onCancel }) {
  if (!result) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            background: 'rgba(15,15,26,0.98)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: '20px',
            boxShadow: '0 0 60px rgba(251,191,36,0.15)'
          }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
                  <AlertTriangle size={20} style={{ color: '#fbbf24' }} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Payment Alert</h3>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Please review before confirming</p>
                </div>
              </div>
              <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
              </button>
            </div>

            {/* Amount comparison */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl text-center"
                style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Your usual amount</p>
                <p className="text-xl font-bold" style={{ color: '#00ff88' }}>
                  ₹{result.avgAmount?.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="p-3 rounded-xl text-center"
                style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This payment</p>
                <p className="text-xl font-bold" style={{ color: '#fbbf24' }}>
                  ₹{parseFloat(formData.amount).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Risk meter */}
            <div className="mb-5 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <RiskMeter score={result.riskScore} level={result.riskLevel} />
            </div>

            {/* Reasons */}
            {result.riskReasons?.length > 0 && (
              <div className="mb-5 space-y-2">
                {result.riskReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg"
                    style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}>
                    <span className="text-base mt-0.5">{r.icon}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#fbbf24' }}>{r.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Receiver */}
            <div className="mb-5 p-3 rounded-xl flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Sending to</p>
                <p className="font-semibold text-white text-sm">{formData.receiverName}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{formData.upiId}</p>
              </div>
              <p className="text-lg font-bold" style={{ color: '#fbbf24' }}>
                ₹{parseFloat(formData.amount).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#ef4444'
                }}
              >
                <XCircle size={16} />
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#0a0a00'
                }}
              >
                <CheckCircle size={16} />
                Yes, Confirm
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
