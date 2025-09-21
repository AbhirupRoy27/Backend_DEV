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
    await newUser.save()
    console.log('User saved!')
  } catch (err) {
    switch (err.name === 'MongoServerError') {
      case 11000:
        console.log('duplicate Data')
        break
      default:
        console.log('Other MongoServerError')
    }
  }
}
adduser()

app.listen(3000)
