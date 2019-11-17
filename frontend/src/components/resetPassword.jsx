import React from "react";
import { resetUser } from "../services/userServices";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	overrides: {
    MuiButton: {
      containedPrimary: {
        fontSize: "0.8em",
        backgroundColor: "purple"
      }
    }
	}
});
export default class resetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		};
	}

	handleSubmit = () => {
		let resetData = {};
		resetData.password = this.state.password;
		let token = this.props.match.params.token;

		resetUser(resetData, token)
			.then(result => {
				console.log("reset successful", result);
			})
			.catch(err => {
				console.log("user not found in db", err);
			});
	};

	handlePassword = event => {
		console.log("value of password in reset", event.currentTarget.value);

		this.setState({ password: event.currentTarget.value });
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
									<label className="FormField__Labelreset">
										Please Enter Your NEW PASSWORD
									</label>
								</div>
								<div className="FormField">
									<label className="FormField__Label">new password</label>
									<input
										type="password"
										id="password"
										className="FormField__Input"
										placeholder="new password here.."
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
										Set Password
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
