const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const msgSchema = new Schema({
  senderId: {
    type: String,
		trim: true,
		// required: true
  },
  receiverId: {
    type: String,
		trim: true,
		// required: true
  },
  sender: {
    type: String,
		trim: true,
		// required: true
  },
  receiver: {
    type: String,
		trim: true,
		// required: true
  },
  message: {
    type: String,
		trim: true,
		// required: true
	}
},
{
	timestamps:true	
}
);

var messages = mongoose.model("messages", msgSchema);

class msgModel {
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
				console.log("error in saving ===>",err);
				
				callback(err);
			} else {
				console.log("after saving body contains ",res);

				callback(null, res);
			}
		});
  }
}

module.exports = {  msgModel };
