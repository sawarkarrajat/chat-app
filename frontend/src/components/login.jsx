import React from "react";
import {loginUser} from "../services/userServices"
import "../css/styles.css";
import Button from "@material-ui/core/Button";


export default class login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }

  handleSubmit = () => {
    let loginData = {};
    loginData.email = this.state.email;
    loginData.password = this.state.password;

    loginUser(loginData).then((result) => {
      console.log("login successful", result.data.token);
      window.localStorage.setItem("token", result.data.token);
    }).catch((err) => {
      console.log("unsuccessful",err);
      
    });
  }

  handleEmail = (event) => {
    console.log("value of email in login",event.currentTarget.value);
    
    this.setState({email:event.currentTarget.value})
  }
  handlePassword = (event) => {
    console.log("value of password",event.currentTarget.value);
    
    this.setState({password:event.currentTarget.value})
  }

	render() {
		return (
			<div className="FormCenter">
				<form>
					<div className="FormField">
						<label className="FormField__Label">E-Mail</label>
						<input
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Enter your email"
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

					<div className="FormField">
						<Button variant="outlined" color="primary" onClick={this.handleSubmit}>Sign In</Button>
					</div>
				</form>
			</div>
		);
	}
}
