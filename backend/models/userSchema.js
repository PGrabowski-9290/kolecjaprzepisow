const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  hash_pass: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }

})

module.exports = User = mongoose.model('User', userSchema, 'users');