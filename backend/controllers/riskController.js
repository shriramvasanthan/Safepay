// Risk Engine Controller
// Implements rule-based risk scoring for payment intent verification

const DataStore = require('../models/DataStore');

/**
 * Analyze a payment for risk factors
 * Returns a risk score (0-100), risk level, and explanations
 */
const analyzePayment = (req, res) => {
  try {
    const { receiverName, upiId, amount, note } = req.body;

    // Validate inputs
    if (!receiverName || !upiId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    let riskScore = 0;
    const riskReasons = [];
    const safeReasons = [];

    // ─── RULE 1: Amount vs Average ───────────────────────────────────────────
    const avgAmount = DataStore.getAverageAmount();
    const amountRatio = parsedAmount / avgAmount;

    if (parsedAmount > avgAmount * 3) {
      riskScore += 35;
      riskReasons.push({
        icon: '💸',
        title: 'Unusually High Amount',
        detail: `You're sending ₹${parsedAmount.toLocaleString('en-IN')}, which is ${amountRatio.toFixed(1)}x your average of ₹${Math.round(avgAmount).toLocaleString('en-IN')}`
      });
    } else if (parsedAmount > avgAmount * 2) {
      riskScore += 25;
      riskReasons.push({
        icon: '💰',
        title: 'Above Average Amount',
        detail: `This is ${amountRatio.toFixed(1)}x your typical payment of ₹${Math.round(avgAmount).toLocaleString('en-IN')}`
      });
    } else if (parsedAmount <= avgAmount * 0.5) {
      safeReasons.push('Amount is within your typical range');
    } else {
      safeReasons.push('Amount looks normal based on your history');
    }

    // ─── RULE 2: New Receiver ─────────────────────────────────────────────────
    const isKnown = DataStore.isKnownReceiver(upiId);
    if (!isKnown) {
      riskScore += 30;
      riskReasons.push({
        icon: '👤',
        title: 'New Recipient',
        detail: `You've never sent money to ${upiId} before. Always verify UPI IDs carefully.`
      });
    } else {
      safeReasons.push(`${upiId} is a known contact`);
    }

    // ─── RULE 3: Late Night Transaction ──────────────────────────────────────
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      riskScore += 20;
      riskReasons.push({
        icon: '🌙',
        title: 'Late Night Transaction',
        detail: `Sending money between 12AM–5AM is unusual. Most frauds happen during odd hours.`
      });
    } else {
      safeReasons.push('Transaction is during normal hours');
    }

    // ─── RULE 4: Suspicious UPI Pattern ──────────────────────────────────────
    const suspiciousKeywords = ['loan', 'lucky', 'win', 'prize', 'reward', 'urgent', 'quick', 'fast'];
    const combinedText = `${upiId} ${receiverName} ${note || ''}`.toLowerCase();
    const foundKeyword = suspiciousKeywords.find(kw => combinedText.includes(kw));

    if (foundKeyword) {
      riskScore += 30;
      riskReasons.push({
        icon: '🚨',
        title: 'Suspicious Keywords Detected',
        detail: `The word "${foundKeyword}" in payment details matches common scam patterns.`
      });
    }

    // ─── RULE 5: Round Number Large Payment ──────────────────────────────────
    if (parsedAmount >= 10000 && parsedAmount % 1000 === 0) {
      riskScore += 10;
      riskReasons.push({
        icon: '🔢',
        title: 'Large Round Amount',
        detail: `Large round-number payments (₹${parsedAmount.toLocaleString('en-IN')}) are more common in forced/scam transactions.`
      });
    }

    // ─── RULE 6: UPI ID Format Check ─────────────────────────────────────────
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiPattern.test(upiId)) {
      riskScore += 15;
      riskReasons.push({
        icon: '⚠️',
        title: 'Unusual UPI Format',
        detail: `The UPI ID format looks irregular. Double-check before proceeding.`
      });
    } else {
      safeReasons.push('UPI ID format is valid');
    }

    // ─── Cap risk score at 100 ────────────────────────────────────────────────
    riskScore = Math.min(100, Math.max(0, riskScore));

    // ─── Determine risk level ─────────────────────────────────────────────────
    let riskLevel, message, recommendation;
    if (riskScore < 35) {
      riskLevel = 'LOW';
      message = 'Payment looks safe to proceed';
      recommendation = 'This transaction appears normal based on your payment history and patterns.';
    } else if (riskScore < 70) {
      riskLevel = 'MEDIUM';
      message = 'This payment needs your attention';
      recommendation = 'Please review the details carefully before confirming. Some factors seem unusual.';
    } else {
      riskLevel = 'HIGH';
      message = 'High risk — this looks unusual!';
      recommendation = 'We strongly recommend cancelling this payment. Multiple risk factors detected.';
    }

    // ─── Build AI explanation ─────────────────────────────────────────────────
    const aiExplanation = generateAIExplanation(riskScore, riskReasons, parsedAmount, avgAmount, receiverName);

    return res.json({
      riskScore,
      riskLevel,
      message,
      recommendation,
      riskReasons,
      safeReasons,
      aiExplanation,
      avgAmount: Math.round(avgAmount),
      analysis: {
        amountRatio: amountRatio.toFixed(2),
        isKnownReceiver: isKnown,
        isLateNight: hour >= 0 && hour < 5,
        hasSuspiciousKeywords: !!foundKeyword
      }
    });

  } catch (error) {
    console.error('Risk analysis error:', error);
    return res.status(500).json({ error: 'Risk analysis failed' });
  }
};

/**
 * Generate a human-readable AI explanation for the risk
 */
const generateAIExplanation = (score, reasons, amount, avg, receiverName) => {
  if (score < 35) {
    return `IntentPay AI analyzed this transaction and found it consistent with your usual payment behavior. The amount of ₹${amount.toLocaleString('en-IN')} is within your normal range, and all other signals look good. You're safe to proceed.`;
  } else if (score < 70) {
    return `IntentPay AI detected ${reasons.length} unusual signal${reasons.length > 1 ? 's' : ''} in this transaction. While this may be legitimate, we recommend pausing to verify all details — especially the UPI ID and amount — before confirming.`;
  } else {
    return `IntentPay AI flagged this as HIGH RISK based on ${reasons.length} anomalies detected. This transaction pattern closely resembles ${score > 85 ? 'known fraud/scam scenarios' : 'potentially erroneous payments'}. Please do not proceed without thorough verification.`;
  }
};

/**
 * Save a transaction to history
 */
const saveTransaction = (req, res) => {
  try {
    const { receiverName, upiId, amount, note, riskScore, riskLevel, status } = req.body;

    const transaction = DataStore.add({
      receiverName,
      upiId,
      amount: parseFloat(amount),
      note: note || '',
      riskScore,
      riskLevel,
      status: status || 'completed'
    });

    return res.json({ success: true, transaction });
  } catch (error) {
    console.error('Save transaction error:', error);
    return res.status(500).json({ error: 'Failed to save transaction' });
  }
};

/**
 * Get transaction history
 */
const getTransactions = (req, res) => {
  try {
    const transactions = DataStore.getAll();
    const stats = DataStore.getStats();
    return res.json({ transactions, stats });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = { analyzePayment, saveTransaction, getTransactions };
