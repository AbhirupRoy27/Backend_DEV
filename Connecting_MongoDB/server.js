import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Users from './model.js'
const app = express()
dotenv.config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI) //URI in the .env
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}
connectDB()

//instance object of the model.
const newUser = new Users({
  name: 'Alice',
  email: 'alice@example.com',
  job: 'Business Man',
})

async function adduser() {
  try {
    newUser.save()
    console.log('User saved!')
  } catch (err) {
    console.error('Error:', err.message)
  }
}
adduser()
