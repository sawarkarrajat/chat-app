const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/routes");
const app = express();
const { port } = require("../backend/config/server.config");
const expressValidator = require("express-validator");
var cors = require('cors');
//configuring the  database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
app.use(cors());
//Connecting to the database
mongoose.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch(err => {
		console.log("Could not connect to the database. Exiting now".err);
		process.exit();
	});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Chat App" });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Express Validator Middleware
app.use(
	expressValidator({
		errorFormatter: function(param, msg, value) {
			var namespace = param.split("."),
				root = namespace.shift(),
				formParam = root;

			while (namespace.length) {
				formParam += "[" + namespace.shift() + "]";
			}
			return {
				param: formParam,
				msg: msg,
				value: value
			};
		}
	})
);
// Require routes
app.use("/", route);

app.listen(port, () => {
	console.log("server is listening on port " + port);
});
