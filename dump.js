registerUser = (req, res) => {
	/**
	 * Create a user
	 */
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	/**
	 * Save user in database
	 */
	user
		.save()
		.then(data => {
			return data;
		})
		.catch(err => {
			return err;
		});
};
//Retrieve and return all users from the database
findAll = (req, res) => {
	User.find()
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving user."
			});
		});
};

//Find a single user with userId
findOne = (req, res) => {
	User.findById(req.params.username)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "user not found with id " + req.params.username
				});
			}
			res.send(user);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "user not found with id " + req.params.username
				});
			}
			return res.status(500).send({
				message: "Error retrieving user with id " + req.params.username
			});
		});
};

//Update a user identified by userId in the request
update = (req, res) => {
	/**
	 * validate request
	 */
	if (
		!req.body.firstName &&
		!req.body.lastName &&
		!req.body.email &&
		!req.body.password &&
		!req.body.username
	) {
		return res.status(400).send({
			message: "No field can be empty"
		});
	}

	/**
	 * find user and update it with the request body
	 */
	User.findByIdAndUpdate(
		req.params.username,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		},
		{ new: true }
	)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "user not found with id" + req.params.username
				});
			}
			res.send(user);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "user not found with id " + req.params.username
				});
			}
			return res.status(500).send({
				message: "Error updating user with id " + req.params.username
			});
		});
};

//Delete a user with the specified userId in the request
deletes = (req, res) => {
	User.findByIdAndDelete(req.params.username)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id" + req.params.username
				});
			}
			res.send({ message: "user Deleted successfully!" });
		})
		.catch(err => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "user not found with id" + req.params.username
				});
			}
			return res.status(500).send({
				message: "Could not delete user with userid" + req.params.username
			});
		});
};
