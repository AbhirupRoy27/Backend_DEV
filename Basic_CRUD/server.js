import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Users from './model.js'
const app = express()
dotenv.config()

app.use(express.json())

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI) //URI in the .env
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}
connectDB()

app.listen(3000, () => console.log(`server at PORT: ${3000}`))
