var express = require("express");
const users = require("../controllers/userController.js");
let router = express.Router();
//Create ne user
router.post("/users", users.create);

module.exports = router;
