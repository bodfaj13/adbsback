const Admin = require('../models/adminModel');
const Driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const bcrypt = require('bcrypt');
const Ambulance = require('../models/ambulanceModel');

module.exports = {
  registerAdmin(req, res, next){
    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var adminDetails = { 
      fullName: fullName, 
      email: email, 
      password: password, 
      createdAt: createdAt 
    };

    bcrypt.hash(adminDetails.password, 10, function(err, hash){
        if(err)throw err;
        adminDetails.password = hash;
        
        Admin.findOne({ email: adminDetails.email })
        .then(function(data) {
          if (!data) {
            var admin = new Admin(adminDetails);
            admin
              .save()
              .then(function(data) {
              res.send({
                success: "Registration done successfully",
                entity: 'Admin'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  registerDriver(req, res, next) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var address = req.body.address;
    var gender = req.body.gender;
    var password = req.body.password;
    var contact = req.body.contact;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var driverDetails = { 
      fullName: fullName,
      email: email,
      gender: gender,
      password: password,
      contact: contact,
      address: address,
      createdAt: createdAt
    };

    bcrypt.hash(driverDetails.password, 10, function(err, hash){
        if(err)throw err;
        driverDetails.password = hash;
        
        Driver.findOne({ email: driverDetails.email })
        .then(function(data) {
          if (!data) {
            var driver = new Driver(driverDetails);
            driver
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: "Registration done successfully",
                entity: 'Driver'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  adminLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var adminDetails = {
      email: email,
      password: password
    };

    Admin.findOne({ email: adminDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email Address not found"
          });
        } else {
          bcrypt.compare(adminDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Admin Authentication Successfull",
                adminDetails: data
              });
            } else {
              res.status(403).send({
                error_Password: "Incorrect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  },
  driverLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var driverDetails = {
      email: email,
      password: password
    };

    Driver.findOne({ email: driverDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email not found"
          });
        } else {
          bcrypt.compare(driverDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Driver Authentication Successfull"
              });
            } else {
              res.status(403).send({
                error_Password: "Incorect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  },
  adminPassUpdate(req, res, next){
    var formerPass = req.body.formerPass;
    var newPass = req.body.newPass;
    
    var Details = {
      formerPass: formerPass,
      newPass: newPass
    };

    var getDecoded = req.decoded.email;
    Admin.findOne({email: getDecoded}).then(function(data){
      bcrypt.compare(Details.formerPass, data.password, function(err,isMatch) {
        if (err) throw err;
          if (isMatch) {
            if(Details.formerPass == Details.newPass){
              res.status(400).send({
                error: "New Password should be different"
              });
            }else{
              bcrypt.hash(Details.newPass, 10, function(err, hash){
                  if(err)throw err;
                  data.password = hash;
                  data.save().then(function(){
                    console.log(data);
                    res.send({
                      success: "Password Updated Successfully",
                      entity: "AdminPassReset"
                    });
                  }).catch(function(error){
                    console.log(error.message);
                    res.status(400).send({
                      error: "Something went wrong"
                    });
                  });
              });
            }
        } else {
          res.status(403).send({
            error_formerPass: "Incorrect Former Password"
          });
        }
      });
    }).catch(function(error){
      console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
    });
  }
}