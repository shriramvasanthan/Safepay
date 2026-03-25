import { motion } from 'framer-motion'

/**
 * RiskMeter — Animated progress bar showing risk score
 * Green (0-35), Yellow (35-70), Red (70-100)
 */
export default function RiskMeter({ score, level, animated = true }) {
  const getColor = () => {
    if (score < 35) return { bar: '#00ff88', glow: 'rgba(0,255,136,0.4)', text: '#00ff88' }
    if (score < 70) return { bar: '#fbbf24', glow: 'rgba(251,191,36,0.4)', text: '#fbbf24' }
    return { bar: '#ef4444', glow: 'rgba(239,68,68,0.4)', text: '#ef4444' }
  }

  const colors = getColor()

  const getLevelLabel = () => {
    if (level === 'LOW') return { label: 'Low Risk', emoji: '✅' }
    if (level === 'MEDIUM') return { label: 'Medium Risk', emoji: '⚠️' }
    return { label: 'High Risk', emoji: '🚨' }
  }

  const { label, emoji } = getLevelLabel()

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Risk Score
          </span>
          <span className="text-xs">{emoji}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: `${colors.text}18`, color: colors.text, border: `1px solid ${colors.text}30` }}>
            {label}
          </span>
          <motion.span
            className="text-2xl font-bold"
            style={{ color: colors.text }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {score}
          </motion.span>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>/100</span>
        </div>
      </div>

      {/* Bar track */}
      <div className="relative h-3 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        
        {/* Segment markers */}
        <div className="absolute top-0 left-[35%] w-px h-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <div className="absolute top-0 left-[70%] w-px h-full" style={{ background: 'rgba(255,255,255,0.15)' }} />

        {/* Animated fill */}
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: score < 35
              ? 'linear-gradient(90deg, #00ff88, #00cc6a)'
              : score < 70
              ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
              : 'linear-gradient(90deg, #ef4444, #dc2626)',
            boxShadow: `0 0 12px ${colors.glow}`
          }}
          initial={animated ? { width: '0%' } : { width: `${score}%` }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }} />
        </motion.div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-xs" style={{ color: '#00ff88' }}>Safe</span>
        <span className="text-xs" style={{ color: '#fbbf24' }}>Caution</span>
        <span className="text-xs" style={{ color: '#ef4444' }}>Danger</span>
      </div>
    </div>
  )
}
