const mongoose = require('../config/mongoose');

var userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  contact: {
    type: String
  },
  createdAt: {
    type: String
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;