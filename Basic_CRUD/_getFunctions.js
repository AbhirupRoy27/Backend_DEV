import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import Users from './model.js'
const app = express()
app.use(express.json())
dotenv.config()

async function ServerConnect() {
  await connect(process.env.DB_URI)
  console.log('Connected')
}

ServerConnect()

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API LIVE' })
})

app.get('/users', async (req, res) => {
  const data = await Users.find({})
  res.status(201).json(data)
})

app.get('/:name', async (req, res) => {
  const nameIs = await Users.findOne({ name: req.params.name })
  res.status(201).json({ nameIs })
})

app.get('/user/:id', async (req, res) => {
  const byId = await Users.findById(req.params.id)
  res.status(201).json(byId)
})

app.listen(3001)
