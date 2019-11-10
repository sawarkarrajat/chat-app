var userModel = require("../models/userModel").userModel;
var userModelObj = new userModel();
const utility = require("../util/utility");
var bcrypt = require("bcryptjs");

class userService {
  //register service
  registerUser(body, callback) {
    console.log(" request in create service ");
    let mail = { email: body.email };
    userModelObj.findUser(mail, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          userModelObj.createUser(body, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
        } else {
          callback(result);
        }
      }
    });
  }
  // login service
  loginUser(body, callback) {
    console.log(" request in login service ");
    let mail = { email: body.email };

    userModelObj.findUser(mail, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          callback({ message: "no data found" });
        } else {
          console.log("value of result", result.password);
          console.log("value of result", body.password);
          let comparePass = bcrypt.compareSync(body.password, result.password);
          if (comparePass) {
            callback(null, result);
          } else {
            callback({ message: "password don't match" });
          }
        }
      }
    });
  }
  /**
   * reset password service method
   */
  resetPasswordUser(body, callback) {
    console.log(" request in login service ");
    let mail = { email: body.email };

    userModelObj.findUser(mail, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          callback({ message: "no data found" });
        } else {
          console.log("value of result", result.password);
          console.log("value of result", body.password);
          let comparePass = bcrypt.compareSync(body.password, result.password);
          if (comparePass) {
            callback(null, result);
          } else {
            callback({ message: "password don't match" });
          }
        }
      }
    });
  }
}
module.exports = { userService };
