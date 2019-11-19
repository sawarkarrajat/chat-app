var express = require("express");
const users = require("../controllers/userController.js");
const msgs = require("../controllers/msgController.js");
const verify = require("../util/tokenVerify");
let router = express.Router();
//Create ne user
console.log("in route");

router.post("/users/register", users.create);
router.post("/users/login", users.login);
router.post("/users/forgotPassword", users.forgotPassword);
router.post("/users/resetPassword", verify.tokenVerifyer, users.resetPassword);
router.get("/users/chatDashboard", verify.tokenVerifyer, users.getAllUsers);
router.post("/users/chatDashboard/messages", verify.tokenVerifyer,msgs.saveMessages);
router.get("/users/chatDashboard/messages", verify.tokenVerifyer,msgs.getAllchats);

module.exports = router;
