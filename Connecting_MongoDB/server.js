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
    if (err.name === 'MongoServerError')
      switch (err.code) {
        case 11000:
          console.log('duplicate Data')
          break
        default:
          console.log('Other MongoServerError')
      }
  }
}
adduser()

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Serch using ID' })
})

app.get('/users', async (req, res) => {
  res.status(200).send(await Users.find())
})

app.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (!id) {
    res.status(404).json({ message: 'not Found' })
  }
  const data = await Users.findById('68cfaf08c6206450474d27db')
  res.status(200).json(data)
})

app.listen(3000)
