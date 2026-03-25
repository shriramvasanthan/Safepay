// IntentPay AI — Backend Server
// Node.js + Express risk analysis engine

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'IntentPay AI Risk Engine',
    version: '1.0.0',
    endpoints: [
      'POST /api/analyze-payment',
      'POST /api/save-transaction',
      'GET  /api/transactions',
      'GET  /api/health'
    ]
  });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 IntentPay AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Risk Engine: Ready`);
  console.log(`💾 Data Store: In-memory (mock)\n`);
});

module.exports = app;
