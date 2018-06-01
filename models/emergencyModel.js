var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var emergencySchema = mongoose.Schema({
  callerName: {
    type: String,
    required: true
  },
  callerContact: {
    type: String
  },
  liveAtScene: {
    type: Boolean,
    required: true
  },
  emergencyAddress: {
    type: String,
    required: true
  },
  addressCords: {
    lat: String,
    long: String
  },
  callerIsVictim: {
    type: Boolean
  },
  emergencyType: {
    type: String
  },
  noOfInjured: {
    type: Number,
    required: true
  },
  ambulanceRequired: {
    type: Number
  },
  ambulanceId: [{
    type: Schema.Types.ObjectId
  }],
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  },
  emergencyDelivered: {
    type: Boolean,
    default: false,
    required: true
  },
  note: {
    type: String,
    default: 'Null'
  },
  inSession: {
    type: Boolean,
    default: false,
    required: true
  }
});

var Emergency = mongoose.model('emergencys', emergencySchema);
module.exports = Emergency
