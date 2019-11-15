import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import login from "./components/login";
import register from "./components/register";
import forgotPassword from "./components/forgotPassword";
import resetPassword from "./components/resetPassword";

// import Button from "@material-ui/core/Button";

import "./App.css";
import "./css/styles.css";

function App() {
	return (
		<div>
			<div className="titlebar">
				Chat App
			</div>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={login}></Route>
					<Route path="/register" component={register}></Route>
					<Route path="/forgotPassword" component={forgotPassword}></Route>
					<Route path="/resetPassword/:token" component={resetPassword}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
