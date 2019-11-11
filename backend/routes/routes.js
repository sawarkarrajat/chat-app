var express = require("express");
const users = require("../controllers/userController.js");
let router = express.Router();
//Create ne user
router.post("/users", users.create);
router.post("/users/login", users.login);
router.post("/users/forgotPassword", users.forgotPassword);
router.post("/users/resetPassword", users.resetPassword);

module.exports = router;
