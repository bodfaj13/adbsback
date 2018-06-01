var mongoose = require("../config/mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var driverSchema = mongoose.Schema({
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
  isAvailable: {
    type: String,
    default: true
  },
  onCase: {
    type: String,
    default: false
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: String
  },
  address: {
    type: String
  },
  contact: {
    type: String
  },
  gender: {
    type: String
  },
  assignedAmbulance: {
    type: Schema.Types.ObjectId
  }
});

var Driver = mongoose.model("drivers", driverSchema);
module.exports = Driver;