import express from 'express'
import mongoose from 'mongoose'
import Users from './Connecting MongoDB/model.js'
const app = express()
app.use(express.json)
