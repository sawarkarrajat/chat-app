import React, { Fragment } from "react";
import "../css/styles.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
var socket,localChatHistory=[];
socket = io.connect("http://localhost:3000");

const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			containedPrimary: {
        fontSize: "0.8em",
        borderRadius:"10px",
        color: "white",
        backgroundColor: "#1e1f24",
        '&:hover': {
          backgroundColor: "teal",
        }
			}
		}
	}
});

export default class Message extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      msgToBeSent: undefined,
      chatHistory:[]
		};
  }
  handleInput = event => {
    event.preventDefault();
		console.log("text in input field", event.currentTarget.value);

		this.setState({ msgToBeSent: event.currentTarget.value });
  };
  handleSend = () => {
    var msg = this.state.msgToBeSent;
    socket.emit('messaged', msg);
    socket.on('readMsg', (data) => {
      localChatHistory.push(data)
      console.log("data in localchathistory==> ",localChatHistory);
      
    });
    
  }
	render() {
		return (
			<Fragment>
				<MuiThemeProvider theme={theme}>
					<div className="recepientUser">
						<label className="recepientWelcomeMsg">
							you are currently in conversation with : {this.props.receiverName}
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
                value={this.state.msgToBeSent}
                onChange={event => this.handleInput(event)}
							></input>
						</div>
						<div className="messageButton">
							<Button variant="contained" color="primary" onClick={this.handleSend()}>
								Send
							</Button>
						</div>
					</div>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}
