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
    console.log('connected')
  } catch (err) {}
}
Server()

// app.put('/:id', async (req, res) => {
//   try {
//     const updatedUser = await Users.findByIdAndUpdate(
//       req.params.id,
//       { age: 40 },
//       { new: true } // return the updated document
//     )
//     res.status(200).json(updatedUser)
//   } catch (error) {
//     res.status(404).json({ message: 'No User' })
//   }
// })

app.put('/:id', async (req, res) => {
  try {
    await Users.updateOne({ _id: req.params.id }, { $set: { age: 29 } })
    res.status(200).json({ message: 'update Complete' })
  } catch (error) {
    res.status(404).json({ message: 'No User' })
  }
})

app.put('/fullName/:name', async (req, res) => {
  await Users.updateOne(
    { name: req.params.name },
    { $set: { name: `${req.body.name}` } }
  )
  res.status(200).json({
    message: 'Changed the Data',
  })
})

app.put('/update/:name', async (req, res) => {
  await Users.updateOne(
    { name: req.params.name },
    { $set: { name: `${req.params.name} Roy` } }
  )
  res.status(200).json({
    message: 'Changed the Data',
  })
})

app.listen(3002, () => {
  console.log('server at:', 3002)
})
