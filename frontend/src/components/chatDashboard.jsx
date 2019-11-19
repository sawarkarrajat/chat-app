import React from "react";
import "../css/styles.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { getAllUser } from "../services/userServices";
import Message  from "./message";
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
				color: "white",
				outlineColor:"transparent",
				backgroundColor: "#1e1f24",
				'&:hover': {
          backgroundColor: "red",
        }
			}
		}
	}
});

export default class chatDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loggedUser: undefined,
			loggedUserId: undefined,
			receiver:undefined,
			receiverId: undefined
		};
	}
	handleToUser = receiver => {
		console.log("value of name in recepient", receiver._id);
		
		this.setState({
			receiverId: receiver._id,
			receiver: receiver.firstName + receiver.lastName
		});
	};
	componentDidMount() {
		getAllUser()
			.then(response => {
				console.log("response ", response.data);
				console.log("users recieved", response.data.result);
				this.setState({
					users: response.data.result,
					loggedUser: window.localStorage.getItem("loggedUser"),
					loggedUserId: window.localStorage.getItem("senderId")
				});
			})
			.catch(error => {
				console.log("error at component did mount", error);
			});
	}
	render() {
		const usersAvailabe = this.state.users.filter(user => user._id !== this.state.loggedUserId);
		// console.log("value of receiver before clicking users is ",this.state);		
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
						{
							usersAvailabe.map((data, index) => (
							<div key={index}>
								<label
									className="chatUsersList_user"
									onClick={() => this.handleToUser(data)}
								>
									{data.firstName}
								</label>
							</div>
						))}
					</div>

					<div className="chatArea">
						{this.state.receiver===undefined?<p>please select a user from list</p>:<Message receiverName={this.state.receiver} />}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}
