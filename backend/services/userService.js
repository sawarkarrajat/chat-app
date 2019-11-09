var userModel = require("../models/userModel").userModel;
var userModelObj = new userModel();

class userService {
	registerUser(body, callback) {
		console.log(" request in service ");
		userModelObj.createUser(body, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}
}
module.exports = { userService };
