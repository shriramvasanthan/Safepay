// API Routes for SafePay AI
const express = require('express');
const router = express.Router();
const { analyzePayment, saveTransaction, getTransactions } = require('../controllers/riskController');

// POST /api/analyze-payment — Core risk analysis endpoint
router.post('/analyze-payment', analyzePayment);

// POST /api/save-transaction — Save transaction to history
router.post('/save-transaction', saveTransaction);

// GET /api/transactions — Fetch all transactions + stats
router.get('/transactions', getTransactions);

// GET /api/health — Health check
router.get('/health', (req, res) => res.json({ status: 'ok', service: 'SafePay AI Risk Engine' }));

module.exports = router;
