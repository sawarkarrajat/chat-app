var msgModel = require("../models/messageModel").messageModel;
var msgModelObj = new msgModel();

class msgService {
	/**
	 * getting all users in chatDashboard
	 */
	getAll_chats(body, callback) {
		console.log(" request in getallusers service and has body", body);

		msgModelObj.getAllMsgs(body,(err, result) => {
			if (err) {
				callback(err);
			} else {
				if (!result) {
					callback({ message: "no data found" });
				} else {
					callback(null, result);
				}
			}
		});
	}
	/**
	 * saving messages in db
	 */
	saveConversation(body, callback) {
		console.log(" request in saveConversation service and has body", body);

		msgModelObj.saveMsg(body,(err, result) => {
			if (err) {
				callback(err);
			} else {
				if (!result) {
					callback({ message: "no data found" });
				} else {
					callback(null, result);
				}
			}
		});
	}
}
module.exports = { msgService };
