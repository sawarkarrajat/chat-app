// const User = require("../models/register.model.js");
const service = require("../services/userService.js").userService;
var userServiceObj = new service();

class userController {
	create(req, res, next) {
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
			.checkBody("userName", "username cannot be empty")
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
			console.log("req", req.body);
			var userBody = req.body;
			userServiceObj.registerUser(userBody, (err, result) => {
				if (err) {
					response.success = false;
					response.message = "Email or username Already Exists";
					res.status(500).send(response);
				} else {
					response.success = true;
					response.message = "Registered successfully";
					res.status(200).send(response);
				}
			});
		}
	}
}

module.exports = new userController();
