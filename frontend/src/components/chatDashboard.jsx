import React from "react";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { getAllUser } from "../services/userServices";

const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			outlinedPrimary: {
				fontSize: "0.8em",
				fontWeight: "bold",
				height: "40px",
				borderRadius: "15px",
				border: "1.5px solid #1e1f24!important",
				color: "#1e1f24",
				backgroundColor: "white"
			},
			outlinedSecondary: {
				fontSize: "0.4em",
				padding: "1px 10px",
				borderRadius: "15px",
				border: "1px solid white!important",
				color: "white",
				backgroundColor: "transparent"
			}
		}
	}
});

export default class chatDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loggedUser: "",
			receiver: ""
		};
	}
	handleToUser = receiver => {
		console.log("value of name in recepient", receiver._id);

		this.setState({ receiver: receiver._id });
	};
	componentDidMount() {
		getAllUser()
			.then(response => {
				console.log("response ", response.data);
				console.log("users recieved", response.data.result);
				this.setState({
					users: response.data.result,
					loggedUser: window.localStorage.getItem("loggedUser")
				});
			})
			.catch(error => {
				console.log("error at component did mount", error);
			});
	}
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="titlebar">
					Chat App
					<div className="usertitle">
						<label className="loggedUser">{this.state.loggedUser}</label>
						<Button variant="outlined" color="secondary">
							logout
						</Button>
					</div>
				</div>
				<div className="App">
					<div className="chatUsersList">
						<div>
							<label className="CUL-AVAILABLE">AVAILABE USERS</label>
						</div>
						{this.state.users.map((data, index) => (
							<div key={index}>
								<label className="chatUsersList_user" onClick={()=>this.handleToUser(data)} >{data.firstName}</label>
							</div>
						))}
					</div>

					<div className="chatArea">
						<div className="recepientUser">
							<label className="recepientWelcomeMsg">
								you are currently in conversation with:
							</label>
						</div>
						<div className="chatScreen">
							{/* message module to be called here */}
						</div>
						<div className="inputBox">
							<div className="message">
								<input
									id="messagetext"
									className="message_Input"
									placeholder="Enter Text Message Here..."
								></input>
							</div>
							<div className="messageButton">
								<Button variant="outlined" color="primary">
									Send
								</Button>
							</div>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}
