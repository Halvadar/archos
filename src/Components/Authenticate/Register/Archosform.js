import React, { Component } from "react";

export default class Archosform extends Component {
  render() {
    return (
      <div
        style={{ left: this.props.left + 200 + "%" }}
        ref={this.props.passref}
        className="registerpageform"
      >
        {[
          "Username",
          "First Name",
          "Last Name",
          "Email",
          "Password",
          "Repeat Password",
          "Phone Number"
        ].map((a, b) => {
          return (
            <div className="formfield formfieldsm formfieldmd formfieldxl formfieldxl formfieldxxl">
              <input className="formfieldinput" placeholder={a}></input>
            </div>
          );
        })}
        <div className="registerbutton">Register</div>
      </div>
    );
  }
}
