import dotenv from 'dotenv'
dotenv.config()

const express = (await import('express')).default
const cors = (await import('cors')).default
const { initDB } = await import('./db.js')
const registrationRoutes = (await import('./routes/registration.js')).default
const paymentRoutes = (await import('./routes/payment.js')).default
const adminRoutes = (await import('./routes/admin.js')).default

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Appipa STEM Registration API' })
})

app.use('/api/register', registrationRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 5000

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
