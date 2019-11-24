import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import {
  initializefacebookuser,
  createfacebookuser
} from "../../../Actions/Actions";

class Facebookform extends Component {
  callback = response => {
    let { id, accessToken } = response;
    this.props.initializefacebookuser({
      id,
      token: accessToken,
      method: "facebook"
    });
  };
  componentDidUpdate() {}

  registerbutton = () => {
    this.props.createfacebookuser({
      name: this["First Name"].value,
      lastname: this["Last Name"].value,
      username: this["Username"].value,
      email: this["Email"].value,
      phone:
        this["Phone Number"].value !== ""
          ? this["Phone Number"].value
          : undefined
    });
  };

  render() {
    return (
      <div style={{ left: this.props.left + "%" }} className="registerpageform">
        <FacebookLogin
          appId="553096981924816"
          callback={this.callback}
          render={renderprops => {
            return (
              <div onClick={renderprops.onClick} className="facebookbutton">
                Login With Facebook
              </div>
            );
          }}
        ></FacebookLogin>
        {this.props.userstate.method === "facebook"
          ? [
              "Username",
              "First Name",
              "Last Name",
              "Email",
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
            })
          : null}
        {this.props.userstate.method === "facebook" ? (
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
  createfacebookuser: e => dispatch(createfacebookuser(e)),
  initializefacebookuser: e => {
    dispatch(initializefacebookuser(e));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Facebookform);
