/**
 * Created by liuwenzhe on 2018/4/16.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  name: String,
  age: Number,
  appSecret: String
})

mongoose.model('User', User, 'Users')
