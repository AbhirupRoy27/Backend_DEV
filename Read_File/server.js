const express = require('express')
const fs = require('fs')
const dotenv = require('dotenv')
const app = express()

app.use(express.json())
dotenv.config() // only if using .env

// const data = fs.readFileSync('db.json')
// console.log(data)

// Async Function
async function readLines() {
  try {
    const data = await fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err)
        return
      }
      console.log(data)
    })
  } catch (err) {
    //
  }
}
// readLines()      // un-comment to use

// OR Sync Function

// const data = fs.readFileSync('db.json', 'utf8')
// const userOne = JSON.parse(data)
// console.log(userOne)

app.get('/', (req, res) => {
  res.status(200).send(userOne)
})

app.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id) // string to int.
  if (userId > userOne.length) {
    res.status(404).send('not Found!')
  }
  res.status(200).send(userOne.find((p) => p.id === userId))
})

// with .env
/*
const data = fs.readFileSync(process.env.DB, 'utf8')
const userOne = JSON.parse(data)
console.log(userOne)
*/

app.listen(3000)
