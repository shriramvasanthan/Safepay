// API utility functions for IntentPay AI
// All backend calls go through these helpers

const API_BASE = '/api'

/**
 * Analyze a payment for risk
 */
export async function analyzePayment(formData) {
  const res = await fetch(`${API_BASE}/analyze-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  if (!res.ok) throw new Error('Risk analysis failed')
  return res.json()
}

/**
 * Save a transaction to history
 */
export async function saveTransaction(data) {
  const res = await fetch(`${API_BASE}/save-transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to save transaction')
  return res.json()
}

/**
 * Get all transactions and stats
 */
export async function getTransactions() {
  const res = await fetch(`${API_BASE}/transactions`)
  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}

/**
 * Format currency in Indian format
 */
export function formatINR(amount) {
  return `₹${parseFloat(amount).toLocaleString('en-IN')}`
}

/**
 * Get risk level color
 */
export function getRiskColor(level) {
  if (level === 'LOW') return '#00ff88'
  if (level === 'MEDIUM') return '#fbbf24'
  return '#ef4444'
}

/**
 * Get risk badge class
 */
export function getRiskBadgeClass(level) {
  if (level === 'LOW') return 'tag tag-green'
  if (level === 'MEDIUM') return 'tag tag-yellow'
  return 'tag tag-red'
}

/**
 * Format date nicely
 */
export function formatDate(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now - d
  const hours = diff / (1000 * 60 * 60)
  if (hours < 24) return `${Math.round(hours)}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
