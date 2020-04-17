import React, { Component } from "react";
import { connect } from "react-redux";
import { createuser, registererror } from "../../../Actions/Actions";

import exclamation from "./exclamation-mark.svg";
import {
  isEmpty,
  isEmail,
  isLength,
  matches,
  isAlphanumeric,
  blacklist,
  isNumeric,
} from "validator";
const inputs = [
  "Username",
  "First Name",
  "Last Name",
  "Email",
  "Password",
  "Repeat Password",
  "Phone Number",
];
const inputlengths = [30, 50, 30, 70, 100, 100, 25];

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
      showerror: [0, 0, 0, 0, 0, 0, 0],
      success: false,
    };
    this.timeout = null;
  }
  componentDidMount() {
    this.props.nullifyerror();
  }
  componentDidUpdate() {}

  validationfunc = (arg, name, length) => {
    let errors = [];
    if (name !== "Email" && name !== "Phone Number") {
      if (isEmpty(arg)) {
        errors.push("Input is empty");
      }
      if (!isAlphanumeric(blacklist(arg, " "))) {
        errors.push(`${name} Cant Only contain letters and numbers`);
      }
    } else if (name === "Email") {
      if (!isEmail(arg)) {
        errors.push("Email needs to be in a given format - aaa@gmail.com");
      }
    }

    if (name === "Phone Number") {
      if (!isEmpty(arg)) {
        if (!isNumeric(arg)) {
          errors.push("Phone number has to be numeric. No Whitespaces");
        }
      }
    }
    if (!isLength(arg, { max: length })) {
      errors.push("Input is too long");
    }
    if (name === "Password" || name === "Repeat Password") {
      if (
        !isEmpty(this["Password"].value) &&
        !isEmpty(this["Repeat Password"].value)
      ) {
        if (this["Password"].value !== this["Repeat Password"].value) {
          errors.push("Passwords dont match");
        }
      }
    }

    if (errors.length > 0) {
      this.setState((prevstate) => {
        prevstate[name] = errors;
        return prevstate;
      });
      return true;
    } else {
      this.setState((prevstate) => {
        prevstate[name] = null;
        return prevstate;
      });
      return false;
    }
  };

  createnormaluser = async () => {
    await inputs.map((a, b) => {
      this.validationfunc(this[a].value, a, inputlengths[b]);
    });
    let finderror;
    finderror = inputs.filter((a) => {
      if (this.state[a]) {
        return true;
      }
    });

    if (finderror.length === 0) {
      let err;
      try {
        err = await this.props.createuser({
          name: this["First Name"].value,
          lastname: this["Last Name"].value,
          username: this["Username"].value,
          email: this["Email"].value,
          password: this["Password"].value,
          repassword: this["Repeat Password"].value,
          phone:
            this["Phone Number"].value !== ""
              ? this["Phone Number"].value
              : undefined,
        });
        if (err) {
          throw err;
        }
        this.setState({ success: true });
        this.timeout = setTimeout(() => {
          this.props.history.push("/");
        }, 3000);
      } catch {}
    }
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <div
        style={{ left: this.props.left + 200 + "%" }}
        ref={this.props.passref}
        className="registerpageform"
      >
        {this.state.success ? (
          <div
            style={{ color: "rgb(77, 179, 68)" }}
            className="manageaccountmessages"
          >
            You've Registered Successfully
          </div>
        ) : (
          <React.Fragment>
            <div
              style={{
                position: "relative",
                visibility: this.props.error ? "initial" : "hidden",
                marginBottom: "1rem",
              }}
              className="manageaccounterrormessage"
            >
              {this.props.error}
            </div>
            {inputs.map((a, b) => {
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
                        : "hidden",
                    }}
                  >
                    {a}
                  </div>
                  <input
                    onChange={() => {
                      this.validationfunc(this[a].value, a, inputlengths[b]);
                    }}
                    ref={(e) => (this[a] = e)}
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
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createuser: (e) => dispatch(createuser(e)),
  nullifyerror: (e) =>
    dispatch(
      registererror({ errormessage: null, type: "REGISTER_ARCHOS_USER_ERROR" })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Archosform);
