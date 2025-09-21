import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()
dotenv.config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}
connectDB()
