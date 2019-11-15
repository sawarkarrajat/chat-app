import React from "react";
import { loginUser } from "../services/userServices";
import "../css/styles.css";
// import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

// const theme = createMuiTheme({
// 	overrides: {
// 		MuiButton: {
// 			containedPrimary: {
// 				fontSize: "0.8em",
// 				backgroundColor: "teal"
// 			},
// 			outlinedSecondary: {
// 				color: "red",
// 				fontSize: "0.8em"
// 			}
// 		}
// 	}
// });
export default class chatDashboard extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		email: "",
	// 		password: ""
	// 	};
	// }

	// handleSubmit = () => {
	// 	let loginData = {};
	// 	loginData.email = this.state.email;
	// 	loginData.password = this.state.password;

	// 	loginUser(loginData)
	// 		.then(result => {
	// 			console.log("login successful", result.data.token);
	// 			window.localStorage.setItem("token", result.data.token);
	// 		})
	// 		.catch(err => {
	// 			console.log("unsuccessful", err);
	// 		});
	// };

	// handleForgot = () => {
	// 	const path = "/forgotPassword";
	// 	this.props.history.push(path);
	// };

	// handleEmail = event => {
	// 	console.log("value of email in login", event.currentTarget.value);

	// 	this.setState({ email: event.currentTarget.value });
	// };
	// handlePassword = event => {
	// 	console.log("value of password", event.currentTarget.value);

	// 	this.setState({ password: event.currentTarget.value });
	// };

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="titlebar">Chat App</div>
				<div className="titlebar">Chat App</div>
				<div className="App">
					<div className="chatUsersList"></div>
					<div className="chatArea"></div>
				</div>
			</MuiThemeProvider>
		);
	}
}
