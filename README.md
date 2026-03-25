# IntentPay AI 🛡️
### Smart UPI Payment Risk Verification Platform

> *"Verify intent, not just the tap."*

A full-stack fintech demo application that uses AI-based risk scoring to prevent accidental and fraudulent UPI transactions.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone & Setup Backend

```bash
cd intentpay/backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

### 2. Setup Frontend

```bash
cd intentpay/frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Open Browser
Visit **http://localhost:5173**

---

## 📁 Project Structure

```
intentpay/
├── backend/
│   ├── server.js                  # Express server entry
│   ├── routes/
│   │   └── api.js                 # API route definitions
│   ├── controllers/
│   │   └── riskController.js      # Risk engine + transaction logic
│   ├── models/
│   │   └── DataStore.js           # In-memory data store (mock DB)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Navigation bar
    │   │   ├── Footer.jsx          # Footer
    │   │   ├── PaymentForm.jsx     # UPI payment input form
    │   │   ├── RiskMeter.jsx       # Animated risk progress bar
    │   │   ├── WarningPopup.jsx    # MEDIUM risk modal
    │   │   ├── BiometricModal.jsx  # HIGH risk full-screen block
    │   │   └── SuccessScreen.jsx   # LOW risk success view
    │   ├── pages/
    │   │   ├── Home.jsx            # Landing page
    │   │   ├── Demo.jsx            # Payment simulator (main page)
    │   │   ├── Dashboard.jsx       # Analytics + transaction history
    │   │   ├── HowItWorks.jsx      # Technical explanation
    │   │   └── About.jsx           # Team Ideaforge page
    │   ├── utils/
    │   │   └── api.js              # API helper functions
    │   ├── App.jsx                 # Router setup
    │   ├── main.jsx                # React entry point
    │   └── index.css               # Global styles + Tailwind
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🌐 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, features, comparison |
| `/demo` | Demo | **Main payment simulator with live risk analysis** |
| `/dashboard` | Dashboard | Transaction history, charts, stats |
| `/how-it-works` | How It Works | Technical deep dive |
| `/about` | About | Team Ideaforge + PSG College |

---

## ⚡ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze-payment` | Analyze payment risk |
| `POST` | `/api/save-transaction` | Save transaction to history |
| `GET` | `/api/transactions` | Get all transactions + stats |
| `GET` | `/api/health` | Service health check |

### Sample Request: Analyze Payment
```json
POST /api/analyze-payment
{
  "receiverName": "QuickLoan Services",
  "upiId": "quickloan@ybl",
  "amount": "50000",
  "note": "Urgent loan payment"
}
```

### Sample Response
```json
{
  "riskScore": 88,
  "riskLevel": "HIGH",
  "message": "High risk — this looks unusual!",
  "riskReasons": [
    { "icon": "💸", "title": "Unusually High Amount", "detail": "..." },
    { "icon": "👤", "title": "New Recipient", "detail": "..." },
    { "icon": "🚨", "title": "Suspicious Keywords", "detail": "..." }
  ],
  "safeReasons": [],
  "aiExplanation": "HIGH RISK: 3 anomalies detected...",
  "avgAmount": 2740
}
```

---

## 🎯 Risk Engine Logic

| Rule | Trigger | Points |
|------|---------|--------|
| High amount | amount > avg × 3 | +35 |
| Above average | amount > avg × 2 | +25 |
| New receiver | UPI ID not in history | +30 |
| Late night | 12AM–5AM | +20 |
| Suspicious keywords | loan/urgent/prize etc | +30 |
| Large round number | ≥₹10,000 & round | +10 |
| Invalid UPI format | Doesn't match pattern | +15 |

**Risk Levels:**
- `0–35` → LOW → ✅ Safe, proceed
- `35–70` → MEDIUM → ⚠️ Warning popup
- `70–100` → HIGH → 🚨 Full block + biometric

---

## 🎨 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons  
**Backend:** Node.js, Express.js  
**Storage:** In-memory (mock MongoDB)  
**Theme:** Dark fintech UI with neon green/purple highlights, glassmorphism cards

---

## 👥 Team Ideaforge

- **Arjun Krishnan** — Full Stack Lead
- **Sneha Ramachandran** — AI/ML Engineer  
- **Vikram Nair** — UI/UX Designer
- **Preethi Selvam** — Backend Engineer

**PSG College of Technology, Coimbatore, Tamil Nadu**  
Department of Computer Science & Engineering · 2024

---

> ⚠️ This is a **simulation/demo** project. No real money is transferred.
