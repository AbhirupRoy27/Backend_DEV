import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Serch using ID' })
})

app.get('/users', async (req, res) => {
  res.status(200).send(await Users.find())
})

app.get('/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404).json({ message: 'not Found' })
  }
  const data = await Users.findById(id)
  res.status(200).json(data)
})

app.post('/users', async (req, res) => {
  try {
    await Users.create(req.body)
    res.status(201).json({ message: 'Recived' })
  } catch (err) {
    if (err.name === 'MongoServerError') {
      if (err.code === 11000) {
        res.status(409).send({ error: 'data Conflict' })
      }
    } else {
      res.status(500).json({ error: 'Server Error' })
    }
  }
})

app.put('/:id', async (req, res) => {
  // console.log(req.body.name)

  try {
    const result = await Users.replaceOne(
      { _id: req.params.id },
      { name: req.body.name }
    )
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(201).json({ message: 'Data updated Check API' /*, result */ })
  } catch (err) {
    res.status(500).json({ message: 'internal Server Error' })
  }
})

app.patch('/:id', async (req, res) => {
  // console.log(req.body.name)

  await Users.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name } }
  )

  res.status(201).json({ message: 'Data updated Check' })
})

app.delete('/:id', async (req, res) => {
  try {
    const result = await Users.deleteOne({ _id: req.params.id }) // Delete by MongoDB _id
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Document not found' })
    }
    res.status(200).json({ message: 'Document deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(3000)
