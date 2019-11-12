var userModel = require("../models/userModel").userModel;
var userModelObj = new userModel();
const utility = require("../util/utility");
const token = require("../util/tokenGen");
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
					userModelObj.createUser(body, (err, data) => {
						if (err) {
							callback(err);
						} else {
							callback(null, data);
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
          if (bcrypt.compareSync(body.password, result.password)) {
            let tokenvalue = token.tokenGenerator(body);
            console.log("token generated:  ",tokenvalue);
						callback(null, result);
					} else {
						callback({ message: "passwords don't match" });
					}
				}
			}
		});
	}
	/**
	 * checking user login status
	 */
	loggedUser(body, callback) {
		if (body) {
			callback(null, body);
		} else {
			callback(err);
		}
	}
	/**
	 * forgot password service method
	 */
	forgotPasswordUser(body, callback) {
		console.log(" request in forgot password service ");
		userModelObj.findUser(body, (err, result) => {
			if (err) {
				callback(err);
			} else {
				if (!result) {
					callback({ message: "user doesn't exist please register first" });
				} else {
					console.log("value of result", result);
					console.log("value of body", body);
					userModelObj.verifyUser(result, (error, data) => {
						if (error) {
							callback(error);
						} else {
							callback(null, data);
						}
					});
				}
			}
		});
	}
	/**
	 * forgot password service method
	 */
  resetPasswordUser(userNewPass, userId, callback) {
    // var uId = { '_id': id };
		console.log(" request in resetPasswordUser service\n value of password "+userNewPass+"\nvalue of id "+userId);
		userModelObj.findUser(userId, (err, result) => {
			if (err) {
				console.log("caught in error finding user");

				callback(err);
			} else {
				if (!result) {
					callback({ message: "user doesn't exist please register first" });
				} else {
					console.log("value of result", result);
					console.log("value of id", userId);
					userModelObj.changePassword(userNewPass, userId, (error, data) => {
						if (error) {
							callback(error);
						} else {
							callback(null, data);
						}
					});
				}
			}
		});
	}
}
module.exports = { userService };
