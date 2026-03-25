import { motion } from 'framer-motion'
import { CheckCircle, Shield, ArrowRight, RotateCcw } from 'lucide-react'
import RiskMeter from './RiskMeter'

/**
 * SuccessScreen — Shown when payment is LOW risk / confirmed
 */
export default function SuccessScreen({ result, formData, onReset }) {
  const isConfirmed = result?.status === 'confirmed'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="text-center py-4"
    >
      {/* Success icon with rings */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <motion.div
          className="absolute w-28 h-28 rounded-full"
          style={{ background: 'rgba(0,255,136,0.08)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ background: 'rgba(0,255,136,0.12)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
          style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)', boxShadow: '0 0 40px rgba(0,255,136,0.5)' }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <CheckCircle size={32} className="text-black" />
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold mb-2"
      >
        {isConfirmed ? 'Payment Confirmed!' : '✅ Payment Looks Safe!'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm mb-6"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {result?.message || 'This transaction appears normal and safe to proceed.'}
      </motion.p>

      {/* Transaction details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card-green p-4 mb-5 text-left"
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="font-semibold text-white">{formData.receiverName}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{formData.upiId}</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#00ff88' }}>
            ₹{parseFloat(formData.amount).toLocaleString('en-IN')}
          </p>
        </div>
        {formData.note && (
          <p className="text-xs py-2 border-t" style={{ color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
            Note: {formData.note}
          </p>
        )}
      </motion.div>

      {/* Risk meter */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-4 rounded-xl mb-5"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <RiskMeter score={result.riskScore} level={result.riskLevel} />
        </motion.div>
      )}

      {/* Safe reasons */}
      {result?.safeReasons?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-2 mb-5"
        >
          {result.safeReasons.map((r, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-left"
              style={{ background: 'rgba(0,255,136,0.05)' }}>
              <Shield size={13} style={{ color: '#00ff88', flexShrink: 0 }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{r}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm btn-ghost"
        >
          <RotateCcw size={15} />
          New Payment
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{
            background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
            color: '#050508',
            boxShadow: '0 0 20px rgba(0,255,136,0.3)'
          }}
        >
          Done
          <ArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  )
}
