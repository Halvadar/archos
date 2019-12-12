import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import {
  initializefacebookuser,
  createfacebookuser
} from "../../../Actions/Actions";

class Facebookform extends Component {
  callback = response => {
    console.log(response);
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
          appId={process.env.REACT_APP_FACEBOOK_ID}
          callback={this.callback}
          disableMobileRedirect={true}
          onFailure={response => {
            console.log(response);
          }}
          render={renderProps => {
            return (
              <div onClick={renderProps.onClick} className="facebookbutton">
                Login With Facebook
              </div>
            );
          }}
        ></FacebookLogin>
        <div
          style={{
            position: "relative",
            visibility: this.props.error ? "initial" : "hidden"
          }}
          className="errormessage"
        >
          {this.props.error}
        </div>
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
