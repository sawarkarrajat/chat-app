const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const utility = require("../util/utility");
const token = require("../util/tokenGen");
const nodemailer = require("../util/nodemailer.js");

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			unique: true,
			trim: true,
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
	//method to verify user for forgot password
	verifyUser(body, callback) {
		console.log(" request in verifyUSer model", body);
		// this.findUser(body, (error, data) => {
		// 	if (error) {
		// 		callback(error);
		// 	} else {
		console.log("value of data._id", body._id);
		let tokenvalue = token.tokenGenerator(body);
		console.log("tokenvalue after token generation", tokenvalue);
		let address = "localhost:3000/resetPassword/" + tokenvalue;
		nodemailer.mailer(body, address, (err, res) => {
			if (err) {
				callback(err);
			} else {
				console.log("data in model in verifyUser", res);
				callback(null, res);
			}
		});
		// 	}
		// });
	}
	// change user password using reset method from service
	changePassword(body, id, callback) {
		console.log("request in change password model method and id is:=>", id);
		console.log("request in change password model method and body is :>",body.password);
		
		var qpassword = utility.encryptPass(body.password);
		console.log("password after hashing", qpassword);
		users.findByIdAndUpdate(id, { password:qpassword }, (err, data) => {
			if (err) {
				console.log("error finding id in changepassword method in model");
				callback(err);
			} else {
				console.log("password updated succesfully", data);
				callback(null, data);
			}
		});
	}
}

module.exports = { userModel };
