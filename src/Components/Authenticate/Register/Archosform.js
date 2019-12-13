import React, { Component } from "react";
import { connect } from "react-redux";
import { createuser, registererror } from "../../../Actions/Actions";
import validator from "validator";
import exclamation from "./exclamation-mark.svg";

class Archosform extends Component {
  constructor() {
    super();
    this.state = {
      "First Name": null,
      "Last Name": null,
      Username: null,
      Email: null,
      Password: null,
      "Repeat Password": null,
      "Phone Number": null,
      errorsfound: false,
      showerror: [0, 0, 0, 0, 0, 0, 0]
    };
  }
  componentDidMount() {
    this.props.nullifyerror();
  }
  componentDidUpdate() {}
  validatorfunc = () => {
    let firstnameerrors = [];
    let lastnameerrors = [];
    let usernameerrors = [];
    let emailerrors = [];
    let phoneerrors = [];
    let passworderrors = [];
    let repeatpassworderrors = [];
    if (validator.isEmpty(this["First Name"].value)) {
      firstnameerrors.push("Input is Empty");
    }
    if (!validator.isAlpha(this["First Name"].value)) {
      console.log("aaa");
      firstnameerrors.push("Has to contain only Letters and numbers. ");
    }
    if (!validator.isLength(this["First Name"].value, { max: 30 })) {
      firstnameerrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Last Name"].value)) {
      lastnameerrors.push("Input is Empty");
    }
    if (!validator.isAlpha(this["Last Name"].value)) {
      lastnameerrors.push("Has to contain only Letters and numbers. ");
    }

    if (!validator.isLength(this["Last Name"].value, { max: 30 })) {
      lastnameerrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Username"].value)) {
      usernameerrors.push("Input is Empty");
    }
    if (!validator.isAlpha(this["Username"].value)) {
      usernameerrors.push("Has to contain only Letters and numbers. ");
    }

    if (!validator.isLength(this["Username"].value, { max: 30 })) {
      usernameerrors.push("Input is Too Long");
    }

    if (
      !validator.isEmpty(this["Phone Number"].value) &&
      !validator.isNumeric(this["Phone Number"].value)
    ) {
      phoneerrors.push("Phone Number needs to be numeric");
    }
    if (
      !validator.isEmpty(this["Phone Number"].value) &&
      !validator.isLength(this["Phone Number"].value)
    ) {
      phoneerrors.push("Input Too Long");
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
    if (validator.isEmpty(this["Password"].value)) {
      passworderrors.push("Input is Empty");
    }
    if (!validator.isLength(this["Password"].value, { max: 100 })) {
      passworderrors.push("Input is Too Long");
    }
    if (validator.isEmpty(this["Repeat Password"].value)) {
      repeatpassworderrors.push("Input is Empty");
    }
    if (!validator.isLength(this["Repeat Password"].value, { max: 100 })) {
      repeatpassworderrors.push("Input is Too Long");
    }
    if (this["Repeat Password"].value !== this["Password"].value) {
      repeatpassworderrors.push("Passwords Dont match");
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
    if (passworderrors.length > 0) {
      this.setState({ Password: passworderrors });
    } else {
      this.setState({ Password: null });
    }
    if (repeatpassworderrors.length > 0) {
      this.setState({ "Repeat Password": repeatpassworderrors });
    } else {
      this.setState({ "Repeat Password": null });
    }

    let combinederrors = [
      ...phoneerrors,
      ...usernameerrors,
      ...lastnameerrors,
      ...firstnameerrors,
      ...emailerrors,
      ...repeatpassworderrors,
      ...passworderrors
    ];
    if (combinederrors.length > 0) {
      console.log("asdasd");
      this.setState({ errorsfound: true });
    } else {
      this.setState({ errorsfound: false });
    }
  };

  createnormaluser = async () => {
    await this.validatorfunc();
    if (!this.state.errorsfound) {
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
    }
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
                type={
                  a === "Password" || a === "Repeat Password"
                    ? "password"
                    : "text"
                }
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
