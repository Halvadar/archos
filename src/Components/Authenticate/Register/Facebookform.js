import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import {
  initializefacebookuser,
  createfacebookuser
} from "../../../Actions/Actions";
import validator from "validator";
import exclamation from "./exclamation-mark.svg";

class Facebookform extends Component {
  constructor() {
    super();
    this.state = {
      "First Name": null,
      "Last Name": null,
      Username: null,
      Email: null,
      "Phone Number": null,
      errorsfound: false,
      showerror: [0, 0, 0, 0, 0]
    };
  }
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

  validatorfunc = () => {
    let firstnameerrors = [];
    let lastnameerrors = [];
    let usernameerrors = [];
    let emailerrors = [];
    let phoneerrors = [];
    if (validator.isEmpty(this["First Name"].value)) {
      firstnameerrors.push("Input is Empty");
    }
    if (!validator.isAlpha(this["First Name"].value)) {
      console.log("aaa");
      firstnameerrors.push("Has to contain only Letters. ");
    }
    if (!validator.isLength(this["First Name"].value, { max: 30 })) {
      firstnameerrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Last Name"].value)) {
      lastnameerrors.push("Input is Empty");
    }
    if (!validator.isAlpha(this["Last Name"].value)) {
      lastnameerrors.push("Has to contain only Letters. ");
    }

    if (!validator.isLength(this["Last Name"].value, { max: 30 })) {
      lastnameerrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Username"].value)) {
      usernameerrors.push("Input is Empty");
    }
    if (!validator.isAlphanumeric(this["Username"].value)) {
      usernameerrors.push("Has to contain only Letters and numbers. ");
    }

    if (!validator.isLength(this["Username"].value, { max: 30 })) {
      usernameerrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Email"].value)) {
      emailerrors.push("Input is Empty");
    }

    if (!validator.isLength(this["Email"].value, { max: 40 })) {
      emailerrors.push("Input is Too Long");
    }
    if (!validator.isEmail(this["Email"].value)) {
      emailerrors.push("Email needs to be in a given format - aaa@email.com");
    }

    if (
      !validator.isEmpty(this["Phone Number"].value) &&
      !validator.isMobilePhone(this["Phone Number"].value)
    ) {
      phoneerrors.push("Phone Number needs to be numeric");
    }
    if (
      !validator.isEmpty(this["Phone Number"].value) &&
      !validator.isLength(this["Phone Number"].value)
    ) {
      phoneerrors.push("Input is Too Long");
    }

    if (emailerrors.length > 0) {
      this.setState({ Email: emailerrors });
    } else {
      this.setState({ Email: null });
    }
    if (usernameerrors.length > 0) {
      this.setState({ Username: usernameerrors });
    } else {
      this.setState({ Username: null });
    }
    if (firstnameerrors.length > 0) {
      this.setState({ "First Name": firstnameerrors });
    } else {
      this.setState({ "First Name": null });
    }
    if (lastnameerrors.length > 0) {
      this.setState({ "Last Name": lastnameerrors });
    } else {
      this.setState({ "Last Name": null });
    }
    if (phoneerrors.length > 0) {
      this.setState({ "Phone Number": phoneerrors });
    } else {
      this.setState({ "Phone Number": null });
    }
    let combinederrors = [
      ...phoneerrors,
      ...usernameerrors,
      ...lastnameerrors,
      ...firstnameerrors,
      ...emailerrors
    ];
    if (combinederrors.length > 0) {
      this.setState({ errorsfound: true });
    } else {
      this.setState({ errorsfound: false });
    }
  };

  registerbutton = async () => {
    await this.validatorfunc();

    if (!this.state.errorsfound) {
      console.log("no errors founds");
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
    }
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
                <div
                  style={{ border: this.state[a] ? "1px solid red" : null }}
                  className="formfield formfieldsm formfieldmd formfieldxl formfieldxl formfieldxxl"
                >
                  <div
                    className="inputenteredtitle"
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "0",
                      visibility: this[a]
                        ? this[a].value.length > 0
                          ? "initial"
                          : "hidden"
                        : "hidden"
                    }}
                  >
                    {a}
                  </div>
                  <input
                    onChange={() => {
                      this.forceUpdate();
                    }}
                    ref={e => (this[a] = e)}
                    className="formfieldinput"
                    placeholder={a}
                  ></input>
                  {this.state[a] ? (
                    <div className="inputerrorsmark">
                      {this.state.showerror[b] === 1 ? (
                        <div className="inputerrors">{this.state[a][0]}</div>
                      ) : null}
                      <img
                        onMouseEnter={() => {
                          let showerrorcopy = this.state.showerror;
                          showerrorcopy[b] = 1;
                          console.log(showerrorcopy);
                          this.setState({ showerror: showerrorcopy });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0] });
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                  ) : null}
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
