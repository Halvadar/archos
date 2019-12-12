import React, { Component } from "react";
import { connect } from "react-redux";
import { createuser, registererror } from "../../../Actions/Actions";

class Archosform extends Component {
  componentDidMount() {
    this.props.nullifyerror();
  }
  componentDidUpdate() {}
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
        <div
          style={{
            position: "relative",
            visibility: this.props.error ? "initial" : "hidden"
          }}
          className="errormessage"
        >
          {this.props.error}
        </div>
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
  createuser: e => dispatch(createuser(e)),
  nullifyerror: e =>
    dispatch(
      registererror({ errormessage: null, type: "REGISTER_ARCHOS_USER_ERROR" })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Archosform);
