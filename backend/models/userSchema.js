const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash_pass: {
    type: String,
    required: true
  },
  roles: {
    User: {
        type: Number,
        default: 1001
      },
      Editor: Number,
      Admin: Number
  },
  refreshToken: {
    type: String
  }

})

module.exports = User = mongoose.model('User', userSchema, 'users');