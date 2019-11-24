import React, { Component } from "react";
import { connect } from "react-redux";
import { createuser } from "../../../Actions/Actions";

class Archosform extends Component {
  createnormaluser = () => {
    this.props.createuser({
      name: this["First Name"].value,
      lastname: this["Last Name"].value,
      username: this["Username"].value,
      email: this["Email"].value,
      password: this["Password"].value,
      repassword: this["Repeat Password"].value,
      phone:
        this["Phone Number"].value !== ""
          ? this["Phone Number"].value
          : undefined
    });
  };
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
              <input
                ref={e => (this[a] = e)}
                className="formfieldinput"
                placeholder={a}
              ></input>
            </div>
          );
        })}
        <div onClick={this.createnormaluser} className="registerbutton">
          Register
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createuser: e => dispatch(createuser(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Archosform);
