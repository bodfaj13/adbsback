const mongoose = require('../config/mongoose');

var userMsgModelSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: String
  },
  markAsRead: {
    type: Boolean,
    default: false,
    require: true
  }
});

const UserMsg = mongoose.model('usermessages', userMsgModelSchema);
module.exports = UserMsg;
