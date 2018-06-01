const Joi = require('joi');

module.exports = {
  registerAdmin (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      password: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullName':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'password':
          res.status(400).send({
            error_Password: 'Invalid Password supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  },
  userSendContact (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      message: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullname':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'contact':
          res.status(400).send({
            error_Contact: 'Invalid Message supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Contact supplied'
          })
      }
    }else{
      next()
    }
  },
  registerDriver (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      password: Joi.string(),
      address: Joi.string(),
      contact: Joi.string(),
      gender: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullName':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'password':
          res.status(400).send({
            error_Password: 'Invalid Password supplied'
          })
          break
        case 'address':
          res.status(400).send({
            error_Address: 'Invalid   Address supplied'
          })
          break
        case 'gender':
          res.status(400).send({
            error_Gender: 'Invalid Gender supplied'
          })
          break
        case 'contact':
          res.status(400).send({
            error_Contact: 'Invalid Contact supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  },
  adminPassUpdate (req, res, next){
    const schema = {
      formerPass: Joi.string(),
      newPass: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){ 
        case 'formerPass':
          res.status(400).send({
            error_formerPass: 'Invalid Password supplied'
          })
          break
        case 'newPass':
          res.status(400).send({
            error_newPass: 'Invalid New Password supplied'
          })
        default:
          res.status(400).send({
            error: 'Invalid Update Supplied'
          })
      }
    }else{
      next()
    }
  }
}