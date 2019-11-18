// const User = require("../models/register.model.js");
const service = require("../services/msgService.js").msgService;
var msgServiceObj = new service();

class msgController {
	
	/**
	 * chatDashboard controller method
	 */
	getAllchats(req, res) {
		let response = {};

		console.log("req controller getAllUsers has body\n", req.body);
		var userBody = req.body;
		msgServiceObj.getAll_chats(userBody, function (err, result) {
			if (err) {
				response.status = false;
				response.message = "no users in db";
				res.status(500).send(response);
			} else {
				
				response.status = true;
				response.message = "chats extracted successfully";
				response.result = result;
				res.status(200).send(response);
			}
		});
	}
	/**
	 * chatDashboard controller method
	 */
	saveMessages(msg, callback) {
		let response = {};

		console.log("req controller saveMessages has body\n", msg);
		msgServiceObj.saveConversation(msg, function (err, result) {
			if (err) {
				response.status = false;
				response.message = "couldn't save message to db";
				res.status(500).send(response);
			} else {
				
				response.status = true;
				response.message = "message saved successfully";
				response.result = result;
				res.status(200).send(response);
			}
		});
	}
}

module.exports = new msgController();
