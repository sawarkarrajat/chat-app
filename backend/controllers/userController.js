// const User = require("../models/register.model.js");
const service = require("../services/userService.js").userService;
var userServiceObj = new service();

class userController {
  /**
   * create user controller method
   */
  create(req, res, next) {
    console.log("request in controller creating user method");

    let response = {};
    req
      .checkBody("firstName", "firstName should not be null")
      .not()
      .isEmpty();
    req
      .checkBody("lastName", "LastName should not be null")
      .not()
      .isEmpty();
    req.checkBody("email", "Invalid Email").isEmail();
    req
      .checkBody("email", "Email should not be empty")
      .not()
      .isEmpty();
    req.checkBody("password", "Password too short").isLength({ min: 8 });

    var errors = req.validationErrors();
    if (errors) {
      response.status = false;
      response.message = "Validation Error";
      response.data = errors;
      res.status(500).send(response);
    } else {
      console.log("req ", req.body);
      var userBody = req.body;
      userServiceObj.registerUser(userBody, function(err, data) {
        if (err) {
          response.status = false;
          response.message = "Email Already Exists";
          res.status(500).send(response);
        } else {
          response.status = true;
          response.message = "Registered successfully";
          res.status(200).send(response);
        }
      });
    }
  }
  /**
   * login controller method
   */
  login(req, res, next) {
    let response = {};

    console.log("req ", req.body);
    var userBody = req.body;
    userServiceObj.loginUser(userBody, function(err, result) {
      if (err) {
        response.status = false;
        response.message = err.message;
        res.status(500).send(response);
      } else {
        response.status = true;
        response.message = "logged in successfully";
        res.status(200).send(response);
      }
    });
  }
  /**
   * forgot password controller method
   */
  resetPassword(req, res, next) {
    let response = {};

    console.log("req ", req.body);
    var userBody = req.body;
    userServiceObj.resetPasswordUser(userBody, function(err, result) {
      if (err) {
        response.status = false;
        response.message = err.message;
        res.status(500).send(response);
      } else {
        response.status = true;
        response.message = "logged in successfully";
        res.status(200).send(response);
      }
    });
  }
}

module.exports = new userController();
