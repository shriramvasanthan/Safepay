// Mock in-memory data store (replaces MongoDB for MVP)
// In production, replace with real MongoDB models

const { v4: uuidv4 } = require('uuid');

// In-memory storage
let transactions = [
  {
    id: uuidv4(),
    receiverName: "Priya Sharma",
    upiId: "priya@okaxis",
    amount: 500,
    note: "Lunch split",
    riskScore: 12,
    riskLevel: "LOW",
    status: "completed",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    receiverName: "Rahul Electronics",
    upiId: "rahulshop@paytm",
    amount: 12000,
    note: "Laptop repair",
    riskScore: 65,
    riskLevel: "MEDIUM",
    status: "completed",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    receiverName: "Unknown Merchant",
    upiId: "fastpay99@ybl",
    amount: 45000,
    note: "",
    riskScore: 88,
    riskLevel: "HIGH",
    status: "cancelled",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    receiverName: "Meera Iyer",
    upiId: "meera.iyer@upi",
    amount: 200,
    note: "Coffee",
    riskScore: 8,
    riskLevel: "LOW",
    status: "completed",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    receiverName: "QuickLoan Services",
    upiId: "quickloan@icici",
    amount: 25000,
    note: "Urgent payment",
    riskScore: 91,
    riskLevel: "HIGH",
    status: "cancelled",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Known receivers (simulates contact history)
const knownReceivers = [
  "priya@okaxis",
  "meera.iyer@upi",
  "raj.kumar@sbi",
  "mom@ybl",
  "dad@hdfc"
];

const DataStore = {
  // Get all transactions
  getAll: () => [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),

  // Add a transaction
  add: (txn) => {
    const newTxn = { id: uuidv4(), timestamp: new Date().toISOString(), ...txn };
    transactions.unshift(newTxn);
    return newTxn;
  },

  // Get average transaction amount from history
  getAverageAmount: () => {
    if (transactions.length === 0) return 1000;
    const completed = transactions.filter(t => t.status === 'completed');
    if (completed.length === 0) return 1000;
    return completed.reduce((sum, t) => sum + t.amount, 0) / completed.length;
  },

  // Check if receiver is known
  isKnownReceiver: (upiId) => {
    const prevReceivers = transactions.map(t => t.upiId);
    return knownReceivers.includes(upiId) || prevReceivers.includes(upiId);
  },

  // Get stats for dashboard
  getStats: () => {
    const total = transactions.length;
    const completed = transactions.filter(t => t.status === 'completed').length;
    const cancelled = transactions.filter(t => t.status === 'cancelled').length;
    const avgAmount = transactions.filter(t => t.status === 'completed')
      .reduce((sum, t, _, arr) => sum + t.amount / arr.length, 0);
    const avgRisk = transactions.reduce((sum, t, _, arr) => sum + t.riskScore / arr.length, 0);
    const savedAmount = transactions.filter(t => t.status === 'cancelled')
      .reduce((sum, t) => sum + t.amount, 0);

    return { total, completed, cancelled, avgAmount, avgRisk, savedAmount };
  }
};

module.exports = DataStore;
