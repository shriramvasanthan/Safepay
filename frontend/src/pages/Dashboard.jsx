import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Shield, AlertTriangle, DollarSign, RefreshCw, Activity } from 'lucide-react'
import { getTransactions, formatINR, getRiskColor, formatDate } from '../utils/api'

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-lg text-xs"
      style={{ background: 'rgba(10,10,18,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {label && <p className="text-white mb-1 font-semibold">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' && p.name?.includes('₹') ? formatINR(p.value) : p.value}</p>
      ))}
    </div>
  )
}

// Mock spending trend data
const spendingData = [
  { day: 'Mon', amount: 850, risk: 12 },
  { day: 'Tue', amount: 2200, risk: 45 },
  { day: 'Wed', amount: 500, risk: 8 },
  { day: 'Thu', amount: 12000, risk: 65 },
  { day: 'Fri', amount: 1500, risk: 22 },
  { day: 'Sat', amount: 45000, risk: 88 },
  { day: 'Sun', amount: 200, risk: 5 },
]

export default function Dashboard() {
  const [data, setData] = useState({ transactions: [], stats: {} })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getTransactions()
      setData(res)
    } catch (_) {
      // Use mock data if backend not running
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const { transactions, stats } = data

  // Risk distribution for pie chart
  const riskDist = [
    { name: 'Low Risk', value: transactions.filter(t => t.riskLevel === 'LOW').length, color: '#00ff88' },
    { name: 'Medium Risk', value: transactions.filter(t => t.riskLevel === 'MEDIUM').length, color: '#fbbf24' },
    { name: 'High Risk', value: transactions.filter(t => t.riskLevel === 'HIGH').length, color: '#ef4444' },
  ].filter(d => d.value > 0)

  const statCards = [
    {
      icon: Activity,
      label: 'Total Transactions',
      value: stats.total || 0,
      color: '#3b82f6',
      sub: `${stats.completed || 0} completed`
    },
    {
      icon: DollarSign,
      label: 'Avg Payment',
      value: stats.avgAmount ? formatINR(Math.round(stats.avgAmount)) : '₹0',
      color: '#00ff88',
      sub: 'per transaction'
    },
    {
      icon: Shield,
      label: 'Payments Saved',
      value: stats.savedAmount ? formatINR(stats.savedAmount) : '₹0',
      color: '#a855f7',
      sub: `${stats.cancelled || 0} blocked`
    },
    {
      icon: AlertTriangle,
      label: 'Avg Risk Score',
      value: stats.avgRisk ? Math.round(stats.avgRisk) : 0,
      color: '#fbbf24',
      sub: 'out of 100'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="glow-bg-purple w-96 h-96 top-0 right-0 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="tag tag-purple mb-2 inline-flex"
            >
              Analytics Dashboard
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black"
            >
              Payment <span className="gradient-text-purple">Insights</span>
            </motion.h1>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 btn-ghost text-sm"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map(({ icon: Icon, label, value, color, sub }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ color }}>{value}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Spending Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Spending Trend</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Last 7 days</p>
              </div>
              <TrendingUp size={18} style={{ color: '#00ff88' }} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="amtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="amount" name="₹ Amount" stroke="#00ff88" strokeWidth={2} fill="url(#amtGrad)" dot={{ fill: '#00ff88', r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Distribution Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-white">Risk Distribution</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>All transactions</p>
              </div>
              <Shield size={18} style={{ color: '#a855f7' }} />
            </div>
            {riskDist.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={riskDist} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" strokeWidth={0}>
                      {riskDist.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {riskDist.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</span>
                      </div>
                      <span className="font-semibold" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-40 flex items-center justify-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No data yet
              </div>
            )}
          </motion.div>
        </div>

        {/* Risk Score Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Daily Risk Scores</h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Risk level per day</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={spendingData}>
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="risk" name="Risk Score" radius={[4, 4, 0, 0]}>
                {spendingData.map((entry, i) => (
                  <Cell key={i} fill={entry.risk < 35 ? '#00ff88' : entry.risk < 70 ? '#fbbf24' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Transaction History Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div>
              <h3 className="font-semibold text-white">Transaction History</h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{transactions.length} transactions</p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
              Loading...
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>No transactions yet. Try the demo!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {['Receiver', 'UPI ID', 'Amount', 'Risk Score', 'Risk Level', 'Status', 'Time'].map(col => (
                      <th key={col} className="text-left px-5 py-3 text-xs font-semibold"
                        style={{ color: 'rgba(255,255,255,0.4)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, i) => (
                    <motion.tr
                      key={txn.id || i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-t transition-colors hover:bg-white/[0.02]"
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-white">{txn.receiverName}</p>
                        {txn.note && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{txn.note}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{txn.upiId}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-white">
                        {formatINR(txn.amount)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${txn.riskScore}%`,
                              background: getRiskColor(txn.riskLevel)
                            }} />
                          </div>
                          <span className="text-xs font-semibold" style={{ color: getRiskColor(txn.riskLevel) }}>
                            {txn.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`tag ${txn.riskLevel === 'LOW' ? 'tag-green' : txn.riskLevel === 'MEDIUM' ? 'tag-yellow' : 'tag-red'}`}>
                          {txn.riskLevel}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`tag ${txn.status === 'completed' ? 'tag-green' : 'tag-red'}`}>
                          {txn.status === 'completed' ? '✓ Paid' : '✗ Cancelled'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {formatDate(txn.timestamp)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function getMockData() {
  const transactions = [
    { id: '1', receiverName: 'Priya Sharma', upiId: 'priya@okaxis', amount: 500, note: 'Lunch', riskScore: 12, riskLevel: 'LOW', status: 'completed', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', receiverName: 'Rahul Electronics', upiId: 'rahul@paytm', amount: 12000, note: 'Repair', riskScore: 65, riskLevel: 'MEDIUM', status: 'completed', timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: '3', receiverName: 'Unknown Merchant', upiId: 'fastpay99@ybl', amount: 45000, note: '', riskScore: 88, riskLevel: 'HIGH', status: 'cancelled', timestamp: new Date(Date.now() - 7 * 86400000).toISOString() },
    { id: '4', receiverName: 'Meera Iyer', upiId: 'meera.iyer@upi', amount: 200, note: 'Coffee', riskScore: 8, riskLevel: 'LOW', status: 'completed', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '5', receiverName: 'QuickLoan Services', upiId: 'quickloan@icici', amount: 25000, note: 'Urgent', riskScore: 91, riskLevel: 'HIGH', status: 'cancelled', timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  ]
  return {
    transactions,
    stats: { total: 5, completed: 3, cancelled: 2, avgAmount: 2740, avgRisk: 52.8, savedAmount: 70000 }
  }
}
