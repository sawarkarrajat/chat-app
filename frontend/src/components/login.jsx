import React from "react";
import { loginUser } from "../services/userServices";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			containedPrimary: {
				fontSize: "0.8em",
				backgroundColor: "teal"
			},
			outlinedSecondary: {
				color: "red",
				fontSize: "0.8em"
			}
		}
	}
});
export default class login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	handleSubmit = () => {
		let loginData = {};
		loginData.email = this.state.email;
		loginData.password = this.state.password;

		loginUser(loginData)
			.then(result => {
				console.log("login successful", result.data.token);
				window.localStorage.setItem("token", result.data.token);
				if (result.data.status == 200) {
					var path = "/chatDashboard";
					this.props.history.push(path);
				} else {
					var path = "/";
					this.props.history.push(path);
				}
			})
			.catch(err => {
				console.log("unsuccessful", err);
			});
	};

	handleForgot = () => {
		const path = "/forgotPassword";
		this.props.history.push(path);
	};

	handleEmail = event => {
		console.log("value of email in login", event.currentTarget.value);

		this.setState({ email: event.currentTarget.value });
	};
	handlePassword = event => {
		console.log("value of password", event.currentTarget.value);

		this.setState({ password: event.currentTarget.value });
	};

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="titlebar">Chat App</div>
				<div className="App">
					<div className="AppForm">
						<div className="FormCenter">
							<form className="FormContainer">
								<div className="FormField">
									<label className="FormField__Label">E-Mail</label>
									<input
										type="email"
										id="email"
										className="FormField__Input"
										placeholder="Enter your email"
										value={this.state.email}
										onChange={event => this.handleEmail(event)}
									/>
								</div>

								<div className="FormField">
									<label className="FormField__Label">Password</label>
									<input
										type="password"
										id="password"
										className="FormField__Input"
										placeholder="Enter your password"
										value={this.state.password}
										onChange={event => this.handlePassword(event)}
									/>
								</div>

								<div className="FormFieldreg">
									<Button
										variant="contained"
										color="primary"
										onClick={this.handleSubmit}
									>
										Sign In
									</Button>
									<Button
										variant="outlined"
										color="secondary"
										onClick={this.handleForgot}
									>
										Forgot Password
									</Button>
								</div>
							</form>
						</div>
					</div>
					<div className="AppAside"></div>
				</div>
			</MuiThemeProvider>
		);
	}
}
