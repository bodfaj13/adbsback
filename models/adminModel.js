var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');

var adminSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  privilege: {
    type: String,
    default: 'global'
  },
  stillActive: {
      type: Boolean,
      required: true,
      default: true
  },
  createdAt: {
    type: String
  }
});

var Admin = mongoose.model('admins', adminSchema);
module.exports = Admin

