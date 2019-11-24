import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { initializegmailuser, creategmailuser } from "../../../Actions/Actions";

class Gmailform extends Component {
  onsuccess = result => {
    console.log(result);
    let token = result.accessToken;
    let id = result.googleId;
    let email = result.profileObj.email;
    this.props.initializegmailuser({ token, id, email, method: "gmail" });
  };
  onfailure = result => {
    console.log(result);
  };
  registerbutton = () => {
    this.props.creategmailuser({
      name: this["First Name"].value,
      lastname: this["Last Name"].value,
      username: this["Username"].value,
      phone:
        this["Phone Number"].value !== ""
          ? this["Phone Number"].value
          : undefined
    });
  };
  render() {
    return (
      <div
        style={{ left: this.props.left + 100 + "%" }}
        className="registerpageform"
      >
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          onSuccess={this.onsuccess}
          onFailure={this.onfailure}
          render={renderProps => {
            return (
              <div onClick={renderProps.onClick} className="googlebutton">
                Login With Google
              </div>
            );
          }}
        ></GoogleLogin>
        {this.props.userstate.method === "gmail"
          ? ["Username", "First Name", "Last Name", "Phone Number"].map(
              (a, b) => {
                return (
                  <div className="formfield formfieldsm formfieldmd formfieldxl formfieldxl formfieldxxl">
                    <input
                      ref={e => (this[a] = e)}
                      className="formfieldinput"
                      placeholder={a}
                    ></input>
                  </div>
                );
              }
            )
          : null}

        {this.props.userstate.method === "gmail" ? (
          <div onClick={this.registerbutton} className="registerbutton">
            Register
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userstate: state.createuser
});

const mapDispatchToProps = dispatch => ({
  initializegmailuser: e => {
    dispatch(initializegmailuser(e));
  },
  creategmailuser: e => dispatch(creategmailuser(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gmailform);
