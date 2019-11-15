import React from "react";
import { forgotUser } from "../services/userServices";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			containedPrimary: {
				fontSize: "0.8em",
				backgroundColor: "darkgreen"
			}
		}
	}
});

export default class forgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ""
		};
	}

	handleSubmit = () => {
		let forgotData = {};
		forgotData.email = this.state.email;

		forgotUser(forgotData)
			.then(result => {
				console.log("search successful", result);
			})
			.catch(err => {
				console.log("user not found in db", err);
			});
	};

	handleEmail = event => {
		console.log("value of email in login", event.currentTarget.value);

		this.setState({ email: event.currentTarget.value });
	};

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="titlebar">Chat App</div>
				<div className="App">
					<div className="AppForm">
						<div className="FormCenter">
							<form>
								<div className="FormField">
									<label className="FormField__Labelverify">
										Please Enter Your E-mail Address to Verify
									</label>
								</div>
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
								<div className="FormFieldreg">
									<Button
										variant="contained"
										color="primary"
										onClick={this.handleSubmit}
									>
										verify email
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
