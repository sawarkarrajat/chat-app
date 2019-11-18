import React from "react";
import "../css/styles.css";
import io from "socket.io-client";
var socket;
socket = io.connect('http://localhost:3000');

export default class message extends React.Component { 
  render() {
    return (
      <div className="message">
        
      </div>
    );
  }
}