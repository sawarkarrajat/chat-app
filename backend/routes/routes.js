var express = require("express");
const users = require("../controllers/userController.js");
let route = express.Router();
//Create ne user
// console.log(" in router");
route.post("/users", users.create);

//Retrieve all users
//route.get("/users", users.findAll);

//Retrieve a single user with userId
// app.get("/users/:userId", users.findOne);

//Update a user with userId
// app.put("/user/:userId", users.update);

//Delete a user with userId
// app.delete("/users/:userId", users.delete);
// }
module.exports = route;