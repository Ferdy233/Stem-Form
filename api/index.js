import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { initDB } from '../server/db.js'
import registrationRoutes from '../server/routes/registration.js'
import paymentRoutes from '../server/routes/payment.js'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Appipa STEM Registration API' })
})

app.use('/api/register', registrationRoutes)
app.use('/api/payment', paymentRoutes)

// Initialize DB on cold start
let _dbInitialized = false
async function ensureDB() {
  if (!_dbInitialized) {
    try {
      await initDB()
      _dbInitialized = true
    } catch (err) {
      console.error('DB init error:', err.message)
    }
  }
}

// Middleware to ensure DB is ready before handling API requests
app.use('/api', async (req, res, next) => {
  await ensureDB()
  next()
})

export default app
