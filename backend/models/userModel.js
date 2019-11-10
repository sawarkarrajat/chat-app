const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const utility = require("../util/utility");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
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
      required: true
    }
  },
  {
    timestamps: true
  }
);

var users = mongoose.model("users", userSchema);

class userModel {
  findUser(body, callback) {
    users.findOne(body, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
  //Create and Save a new User
  createUser(body, callback) {
    console.log(" request in model", body);
    body.password = utility.encryptPass(body.password);
    console.log("hashed password is ", body.password);
    var createUserDb = new users({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    });

    createUserDb.save((err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }
}

module.exports = { userModel };
