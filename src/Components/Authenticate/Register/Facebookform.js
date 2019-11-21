import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default class Facebookform extends Component {
  callback = response => {
    console.log(response);
  };
  render() {
    return (
      <div style={{ left: this.props.left + "%" }} className="registerpageform">
        <FacebookLogin
          appId="553096981924816"
          autoLoad={true}
          callback={this.callback}
          render={renderprops => {
            return (
              <div onClick={renderprops.onClick} className="facebookbutton">
                Login With Facebook
              </div>
            );
          }}
        ></FacebookLogin>
        {["Username", "First Name", "Last Name", "Email", "Phone Number"].map(
          (a, b) => {
            return (
              <div className="formfield formfieldsm formfieldmd formfieldxl formfieldxl formfieldxxl">
                <input className="formfieldinput" placeholder={a}></input>
              </div>
            );
          }
        )}
        <div className="registerbutton">Register</div>
      </div>
    );
  }
}
