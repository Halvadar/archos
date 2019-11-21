import React, { Component } from "react";

export default class Gmailform extends Component {
  render() {
    return (
      <div
        style={{ left: this.props.left + 100 + "%" }}
        className="registerpageform"
      >
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
