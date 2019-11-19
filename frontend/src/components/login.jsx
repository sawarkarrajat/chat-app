import React from "react";
import { loginUser } from "../services/userServices";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
let path = '/chatDashboard';
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
			},
			containedSecondary: {
				color: "#1e1f24",
				backgroundColor: "#00acc1",
				fontSize: "0.3em"
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
			.then(response => {
				console.log("data in req",response.data);				
				console.log("login successful", response.data.token);
				window.localStorage.setItem("token", response.data.token);
				window.localStorage.setItem("loggedUser", response.data.result);
				window.localStorage.setItem("senderId", response.data.senderId);
				if (response.data.status) {
					this.props.history.push(path);
				} else {
					path = "/";
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
	handleRegister = () => {
		const path = "/register";
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
				<div className="titlebar">Chat App
				<div className="usertitle">
						<Button variant="contained" color="secondary" onClick={this.handleRegister}>
							Register
						</Button>
					</div>
				</div>
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
					<div className="AppAsidee">
						<div className="image">
								<img src="https://media.giphy.com/media/6pTZvzSItv5eM/giphy.gif" alt="well we tried to show something cool" width="600" height="400"/>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}
