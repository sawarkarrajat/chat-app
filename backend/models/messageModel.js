const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const msgSchema = new Schema({
  senderId: {
    type: String,
    trim: true
  },
  receiverId: {
    type: String,
    trim: true
  },
  sender: {
    type: String,
    trim: true
  },
  receiver: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  }
}
);

var messages = mongoose.model("messages", msgSchema);

class messageModel {
	// findUser(body, callback) {
	// 	users.findOne(body, (err, data) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			callback(null, data);
	// 		}
	// 	});
	// }
	getAllMsgs(body,callback) {
		messages.find(body, (err, chats) => {
			if (err) {
				callback(err);
			} else {
				callback(null,chats);
			}
		});
	}
	//create and save messages
	saveMsg(body, callback) {
		console.log(" request in model save msg", body);
		var newConversation = new messages({
			senderId: body.senderId,
			receiverId:body.receiverId,
			sender: body.sender,
			receiver:body.receiver,
			message: body.message
		});

		newConversation.save((err, res) => {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		});
  }
}

module.exports = {  messageModel };
