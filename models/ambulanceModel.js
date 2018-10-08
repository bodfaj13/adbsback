var mongoose = require("../config/mongoose");
var Schema = mongoose.Schema;

var ambulanceSchema = mongoose.Schema({
  isAvailable: {
    type: String,
    required: true,
    default: true
  },
  assignedCases: [{
    type: String
  }],
  assignedDriver: {
    type: Schema.Types.ObjectId,
    required: true
  },
  assignedDriverName: {
    type: String,
    required: true
  },
  plateNumber: {
    type: String,
    unique: true,
    required: true
  },
  vechileName: {
    type: String
  },
  vechileModel: {
    type: String
  },
  vechilePapers: [{
    name: String,
    file: String
  }],
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  paramedic: [{
    type: Schema.Types.ObjectId
  }],
  currentLocation: {
    address: String,
    cords: {
      lat: String,
      long: String
    }
  }
});

var Ambulance = mongoose.model("ambulances", ambulanceSchema);
module.exports = Ambulance;