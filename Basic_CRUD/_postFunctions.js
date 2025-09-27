import express from 'express'
import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
import Users from './model.js'

const app = express()
app.use(express.json())

dotenv.config()

async function Server() {
  try {
    await connect(process.env.DB_URI)
    console.log('connected')
  } catch (err) {}
}
Server()

app.post('/', (req, res) => {
  const { name, email, job } = req.body
  console.log(name, email, job)
  res.status(201).json({ name, email, job })
})

app.post('/addUser', async (req, res) => {
  const userData = new Users(req.body)
  try {
    await userData.save()
    res.status(200).json({ message: 'Added' })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

app.post('/sure', async (req, res) => {
  try {
    await Users.create(req.body)
    res.status(200).json({ message: 'created' })
  } catch (err) {
    res.status(404).json({
      message: 'Not Found',
      err: err.message,
    })
  }
})

app.listen(2001, () => {
  console.log('Server at PORT: ', 2001)
})
