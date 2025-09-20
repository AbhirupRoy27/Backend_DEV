import express from 'express'

const app = express()
app.use(express.json)

app.listen(2000, () => console.log(`server at PORT: ${2000}`))
