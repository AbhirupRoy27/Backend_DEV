import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  // key : { validation rules }
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  job: { type: String, required: true },
})

const Users = mongoose.model('users', userSchema)

export default Users
