const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		userName: String,
		password: String
	},
	{
		timestamps: true
	}
);

var user = mongoose.model("user ", userSchema);
class userModel {
	//Create and Save a new User
	registerUser(body, callback) {
		console.log(" request in model", body);
		var createUser = new user({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			userName: body.userName,
			password: body.password
		}); 
		createUser.save((err, res) => {
			if(err) {
				callback(err);
			}
			else{
				callback(null,res)
			}
		})
	}
}

module.exports = { userModel };
