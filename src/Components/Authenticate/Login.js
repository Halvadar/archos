import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div style={this.props.style} className="loginfixed">
        <FacebookLogin
          appID={process.env.REACT_APP_FACEBOOK_ID}
          callback={this.facebookcallback}
        ></FacebookLogin>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          onSuccess={this.gmailcallback}
          onFailure={this.gmailfailure}
        ></GoogleLogin>
      </div>
    );
  }
}
