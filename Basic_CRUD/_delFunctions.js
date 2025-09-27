import express from 'express'
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import Users from './model.js'

const app = express()
app.use(express.json())

dotenv.config()

async function Server() {
  try {
    await connect(process.env.DB_URI)
    console.log('Connected')
  } catch (error) {
    console.error('Failed to connect')
  }
}
Server()

// DELETE ONE
app.delete('/users/:id', async (req, res) => {
  const result = await Users.deleteOne({ _id: req.params.id })
  if (result.deletedCount) res.send('User deleted')
  else res.status(404).send('User not found')
})

// DELETE MANY
app.delete('/users', async (req, res) => {
  const { status } = req.body
  const result = await Users.deleteMany({ status })
  res.send(`${result.deletedCount} users deleted`)
})

// SOFT DELETE
app.patch('/users/soft-delete/:id', async (req, res) => {
  const result = await Users.updateOne(
    { _id: req.params.id },
    { $set: { deleted: true, deletedAt: new Date() } }
  )
  console.log(result)
  if (result.modifiedCount) res.send('User soft-deleted')
  else res.status(404).send('User not found')
})

// RESTORE SOFT DELETED
app.patch('/users/restore/:id', async (req, res) => {
  const result = await Users.updateOne(
    { _id: req.params.id },
    { $set: { deleted: false, deletedAt: null } }
  )
  if (result.modifiedCount) res.send('User restored')
  else res.status(404).send('User not found')
})

app.listen(3003, () => console.log('Server running on port 3003'))
