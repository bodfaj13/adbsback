const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserMsgController = require("../controllers/UserMsgController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails.json");
const FunctionController = require("../controllers/FunctionController");
const moment = require('moment');
const Admin = require('../models/adminModel');
const Ambulance = require('../models/ambulanceModel');
const Driver = require('../models/driverModel');
const DataController = require('../controllers/DataController');
const Emergency = require('../models/emergencyModel');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "ABDS BackEnd" });
  console.log('Lets get started');
});

router.get("/api", function (req, res, next) {
    res.send({msg: "hello world"});
})

//adminlogin
router.post("/api/adminlogin", AuthController.adminLogin);

//driverlogin
router.post("/api/driverlogin", AuthController.driverLogin);

//create-emergency
router.post("/api/recordcallcase", FunctionController.recordCall);

//emergency-to-case
router.post("/api/createcase", FunctionController.callToCase);

//releaseCase
router.post("/api/releasecase", FunctionController.releaseCase);

//user contact message
router.post(
  "/api/usersendcontact",
  ControllerPolicy.userSendContact,
  UserMsgController.sendMsg
);

//get-driver-no
router.get("/api/getdriversno", DataController.getDriversNo);

//get-driver-details
router.get("/api/getdriversavilableforassining", DataController.getDriverAvailbleForAssinging);

//get-ambulance-no
router.get("/api/getambulanceno", DataController.getAmbulanceNo);

//get-ambulance
router.get("/api/getambulancedetails", DataController.getAmbulanceDetails);

//get-total-calls
router.get("/api/gettotalcallno", DataController.getTotalCallsNo);

//get-total cases
router.get("/api/gettotalcasesno", DataController.getTotalCasesNo);

//get-available-ambulance-no
router.get("/api/getavailableambulanceno", DataController.getAvailableAmbulanceNo);

//get-available-ambulance-detils
router.get("/api/getavailableambulancdetails", DataController.getAvailableAmbulanceDetails);

//get-active-emergency-no
router.get("/api/getactiveemergencyno", DataController.getActiveEmergencyNo);

//get calls
router.get("/api/gettotalcall", DataController.getTotalCalls);

//get cases
router.get("/api/gettotalcases", DataController.getTotalCases);

//get-active-emergency-
router.get("/api/getactiveambulance", DataController.getActiveEmergency);

//get all drivers
router.get("/api/getalldrivers", DataController.getAllDrivers);

//get all ambulances
router.get("/api/getallambulances", DataController.getAllAmbulances);

//route middleware to authenticate and check token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-auth"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      var decoded = jwt.verify(token, appdetails.jwtSecret);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

//checking explicitly
router.get("/api/check", function(req, res) {
  res.json(req.decoded);
});

//protected routes
router.get("/api/standard", function(req, res) {
  res.send("standard");
});

//registeradmin
router.post(
  "/api/registeradmin",
  ControllerPolicy.registerAdmin,
  AuthController.registerAdmin
);

//registerdriver
router.post(
  "/api/registerdriver",ControllerPolicy.registerDriver,
  AuthController.registerDriver
);

//create-driver
router.post(
  "/api/createambulance",
  FunctionController.createAmbulance
);

//admin-update-pass
router.post(
  "/api/adminpassupdate",
  ControllerPolicy.adminPassUpdate,
  AuthController.adminPassUpdate
);

module.exports = router;
