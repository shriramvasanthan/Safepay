import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, AtSign, IndianRupee, FileText, Shield, Loader } from 'lucide-react'

/**
 * PaymentForm — Main UPI payment input form
 * Collects receiver details and triggers risk analysis
 */
export default function PaymentForm({ onAnalyze, loading }) {
  const [form, setForm] = useState({
    receiverName: '',
    upiId: '',
    amount: '',
    note: ''
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.receiverName.trim()) errs.receiverName = 'Receiver name is required'
    if (!form.upiId.trim()) errs.upiId = 'UPI ID is required'
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    onAnalyze(form)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  // Quick fill presets for demo
  const presets = [
    { label: '✅ Safe Payment', data: { receiverName: 'Priya Sharma', upiId: 'priya@okaxis', amount: '500', note: 'Lunch split' } },
    { label: '⚠️ Medium Risk', data: { receiverName: 'Raj Store', upiId: 'rajstore@paytm', amount: '8000', note: 'Electronics' } },
    { label: '🚨 High Risk', data: { receiverName: 'QuickLoan Services', upiId: 'quickloan@ybl', amount: '50000', note: 'Urgent loan payment' } },
  ]

  return (
    <div>
      {/* Demo Presets */}
      <div className="mb-6">
        <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Quick demo scenarios:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setForm(p.data)}
              className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Receiver Name */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Receiver Name
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text"
              className="input-field pl-9"
              placeholder="e.g. Priya Sharma"
              value={form.receiverName}
              onChange={e => handleChange('receiverName', e.target.value)}
            />
          </div>
          {errors.receiverName && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.receiverName}</p>}
        </div>

        {/* UPI ID */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            UPI ID
          </label>
          <div className="relative">
            <AtSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text"
              className="input-field pl-9"
              placeholder="e.g. name@okaxis"
              value={form.upiId}
              onChange={e => handleChange('upiId', e.target.value)}
            />
          </div>
          {errors.upiId && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.upiId}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Amount (₹)
          </label>
          <div className="relative">
            <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="number"
              className="input-field pl-9"
              placeholder="0.00"
              value={form.amount}
              onChange={e => handleChange('amount', e.target.value)}
              min="1"
            />
          </div>
          {errors.amount && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.amount}</p>}
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Note <span style={{ color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
          </label>
          <div className="relative">
            <FileText size={15} className="absolute left-3 top-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <textarea
              className="input-field pl-9 resize-none"
              placeholder="What's this payment for?"
              rows={2}
              value={form.note}
              onChange={e => handleChange('note', e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 mt-2"
          style={{
            background: loading ? 'rgba(0,255,136,0.3)' : 'linear-gradient(135deg, #00ff88, #00cc6a)',
            color: '#050508',
            boxShadow: loading ? 'none' : '0 0 30px rgba(0,255,136,0.3)',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <>
              <Loader size={18} className="animate-spin" />
              Analyzing Payment...
            </>
          ) : (
            <>
              <Shield size={18} />
              Analyze & Pay
            </>
          )}
        </motion.button>

        <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          🔒 This is a simulation. No real money is transferred.
        </p>
      </form>
    </div>
  )
}
