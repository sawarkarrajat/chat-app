var userModel = require("../models/userModel").userModel;
var userModelObj = new userModel();

class userService {
	registerUser(req, callback) {
		console.log(" reqest in service ");

		// return new Promise(function(resolve, reject) {
		userModelObj.registerUser(req, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
		
	}
}
module.exports = { userService };
