const Admin = require('../models/adminModel');
const Driver = require('../models/driverModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const Ambulance = require('../models/ambulanceModel')
const Emergency = require('../models/emergencyModel')

module.exports = {
  recordCall(req, res, next) {
    var callerName = req.body.callerName;
    var callerContact = req.body.callerContact;
    var liveAtScene = req.body.liveAtScene;
    var emergencyAddress = req.body.emergencyAddress;
    var callerIsVictim = req.body.callerIsVictim;
    var emergencyType = req.body.emergencyType;
    var noOfInjured = req.body.noOfInjured;
    var ambulanceRequired = req.body.ambulanceRequired;
    var note = req.body.note;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    
    var emergencyDetails = {
      callerName: callerName,
      callerContact: callerContact,
      liveAtScene: liveAtScene,
      emergencyAddress: emergencyAddress,
      callerIsVictim: callerIsVictim,
      noOfInjured: noOfInjured,
      emergencyType: emergencyType,
      note: note,
      createdAt: createdAt
    };

    var emergencyCase = new Emergency(emergencyDetails);
    emergencyCase
      .save()
      .then(function(data) {
      console.log(data);
      res.send({
        success: 'Call added successfully',
        entity: 'Emergency Call',
        callDetails: data
      });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  callToCase(req, res, next) {
    var emergencyId = req.body.emergencyId;
    var ambulanceRequired = req.body.ambulanceRequired;
    var ambulanceId= req.body.ambulanceId;
    var updatedAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 

    var callId = {
      _id: emergencyId
    };

    var caseDetails = {
      ambulanceRequired: ambulanceRequired,
      updatedAt: updatedAt,
      active: true,
      inSession: true,
      ambulanceId: ambulanceId
    };

    for (var i = 0; i < ambulanceId.length; i++) {
      Ambulance.findById(ambulanceId[i]).then(function(data){
        data.isAvailable = false;
        data.assignedCases.push(callId._id);
        data.save().then(function(data){
          console.log(data);
        });
      })
    }

    Emergency.findById(callId._id).then(function(data){
      data.active = caseDetails.active;
      data.ambulanceRequired = caseDetails.ambulanceRequired;
      data.updatedAt = caseDetails.updatedAt;
      data.ambulanceId = caseDetails.ambulanceId
      data.inSession = caseDetails.inSession
      
      data.save().then(function(data){
        // console.log(data);
        res.send({
          success: "Case creaed successfully",
          entity: "Emergency"
        });
      }).catch(function(error){
        console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  createAmbulance(req, res, next) {
    var assignedDriver = req.body.assignedDriver;
    var plateNumber = req.body.plateNumber;
    var vechileName = req.body.vechileName;
    var vechileModel = req.body.vechileModel;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var ambulanceDetails = { 
      assignedDriver: assignedDriver,
      plateNumber: plateNumber,
      vechileModel: vechileModel,
      vechileName: vechileName,
      createdAt: createdAt
    };

    Ambulance.findOne({ plateNumber: ambulanceDetails.plateNumber })
    .then(function(data) {
      if (!data) {
        Driver.findById(ambulanceDetails.assignedDriver)
        .then(function(data){
         data.isAvailable = false;
         ambulanceDetails.assignedDriverName = data.fullName;
         data.save().then(function(data){
          var ambulance = new Ambulance(ambulanceDetails);
            ambulance
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: "Creation done successfully",
                entity: 'Ambulance'
              });
            }) 
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          }).catch(function(error){
            console.log(error.message);
            res.status(400).send({
              error: "Something went wrong"
            });
          });
        })
        .catch(function(error){
          console.log(error.message);
          res.status(400).send({
            error: "Something went wrong"
          });
        });
      } else {
        res.status(400).send({
          error_PlateNumber: "Plate Number is already taken"
        });
      }
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    });
  },
  releaseCase(req, res, next) {
    var emergencyId = req.body.emergencyId;
    var ambulanceId= req.body.ambulanceId;
    var updatedAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 

    var callId = {
      _id: emergencyId
    };

    var caseDetails = {
      updatedAt: updatedAt,
      active: false,
      inSession: false,
      ambulanceId: ambulanceId,
      emergencyDelivered: true
    };

    for (var i = 0; i < ambulanceId.length; i++) {
      Ambulance.findById(ambulanceId[i]).then(function(data){
        data.isAvailable = true
        data.assignedCases.push(callId._id);
        data.save().then(function(data){
          console.log(data);
        });
      })
    }

    Emergency.findById(callId._id).then(function(data){
      data.active = caseDetails.active;
      data.updatedAt = caseDetails.updatedAt;
      data.inSession = caseDetails.inSession
      data.emergencyDelivered = caseDetails.emergencyDelivered

      data.save().then(function(data){
        // console.log(data);
        res.send({
          success: "Case creaed successfully",
          entity: "Emergency"
        });
      }).catch(function(error){
        console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }
};