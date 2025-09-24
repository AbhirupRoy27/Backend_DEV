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

app.post('/users', async (req, res) => {
  const { name, email, job } = req.body

  const newUser = new Users({
    name: name, // String
    email: email, // String
    job: job, // String
  })

  // instance object of the model.
  try {
    await newUser.save()
    console.log('User saved!')
    res.json({ message: 'API Updated' })
  } catch (err) {
    if (err.name === 'MongoServerError')
      switch (err.code) {
        case 11000:
          res.send('duplicate Data')
          break
        default:
          console.log('Other MongoServerError')
      }
  }
})

app.get('/', async (req, res) => {
  try {
    const users = await Users.find({})
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

app.listen(3000, () => console.log(`server at PORT: ${3000}`))
