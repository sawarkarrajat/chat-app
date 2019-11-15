import React from "react";
import {registerUser} from "../services/userServices"
import "../css/styles.css";
import Button from "@material-ui/core/Button";


export default class register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }

  handleSubmit = () => {
    let userRegisterData = {};
    userRegisterData.firstName = this.state.firstName;
    userRegisterData.lastName = this.state.lastName;
    userRegisterData.email = this.state.email;
    userRegisterData.password = this.state.password;

    registerUser(userRegisterData).then((result) => {
      console.log("registration successful", result);
      // window.localStorage.setItem("token", result.data.token);
    }).catch((err) => {
      console.log("unsuccessful registration",err);
      
    });
  }

  handleLoginButton = () => {
    const path = '/login';
    this.props.history.push(path);
  }

  handleFirstName = (event) => {
    console.log("value of firstName in register",event.currentTarget.value);
    
    this.setState({ firstName: event.currentTarget.value });
  }

  handleLastName = (event) => {
    console.log("value of lastName in login",event.currentTarget.value);
    
    this.setState({ lastName: event.currentTarget.value });
  }

  handleEmail = (event) => {
    console.log("value of email in login",event.currentTarget.value);
    
    this.setState({ email: event.currentTarget.value });
  }
  handlePassword = (event) => {
    console.log("value of password",event.currentTarget.value);
    
    this.setState({ password: event.currentTarget.value });
  }

	render() {
		return (
			<div className="FormCenter">
				<form>
					<div className="FormField">
						<label className="FormField__Label">First Name</label>
						<input
              type="text"
              id="firstName"
              className="FormField__Input"
              placeholder="fisrt name..."
              value={this.state.firstName}
              onChange={(event) => this.handleFirstName(event)}
						/>
					</div>
					<div className="FormField">
						<label className="FormField__Label">Last Name</label>
						<input
              type="text"
              id="lastName"
              className="FormField__Input"
              placeholder="last name..."
              value={this.state.lastName}
              onChange={(event) => this.handleLastName(event)}
						/>
					</div>
					<div className="FormField">
						<label className="FormField__Label">E-Mail</label>
						<input
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Enter your email here..."
              value={this.state.email}
              onChange={(event) => this.handleEmail(event)}
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
              onChange={(event)=>this.handlePassword(event)}
            />
					</div>

					<div className="FormFieldreg">
						<Button variant="contained" color="primary" onClick={this.handleSubmit}>Register</Button>
						<Button variant="outlined" color="secondary" onClick={this.handleLoginButton}>Login In</Button>
					</div>
				</form>
			</div>
		);
	}
}
