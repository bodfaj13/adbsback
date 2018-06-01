var mongoose = require('../config/mongoose');

var callerSchema = mongoose.Schema({
  callername: {
    type: String
  },
  phone: {
    type: String
  }
});

var caller = mongoose.model('callers', callerSchema);
module.exports = Caller
