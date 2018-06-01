const UserMsg = require('../models/userMsgModel');
const moment = require('moment');

module.exports = {
  sendMsg (req, res, next) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var message = req.body.message;
    var sentAt =  moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var userMessage = {
      fullname: fullname,
      email: email,
      message: message,
      sentAt: sentAt
    };

    var userSend = new UserMsg(userMessage);
    userSend.save()
    .then(function (data) {
      console.log(data)
      res.send({
        success: 'Message sent successfully'
      })
    }) 
    .catch(function (error) {
      console.log(error.message)
      res.status(400).send({
        error: error
      })
    });  
  }
}