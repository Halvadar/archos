import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { initializegmailuser, creategmailuser } from "../../../Actions/Actions";

import exclamation from "./exclamation-mark.svg";
import {
  isEmpty,
  isLength,
  isAlphanumeric,
  blacklist,
  isNumeric,
} from "validator";

const inputs = ["Username", "First Name", "Last Name", "Phone Number"];
const inputlengths = [30, 30, 50, 25];
class Gmailform extends Component {
  constructor() {
    super();
    this.state = {
      "First Name": null,
      "Last Name": null,
      Username: null,
      "Phone Number": null,
      errorsfound: false,
      showerror: [0, 0, 0, 0],
      success: false,
    };
    this.timeout = null;
  }
  onsuccess = (result) => {
    let token = result.accessToken;
    let id = result.googleId;
    let email = result.profileObj.email;
    this.props.initializegmailuser({ token, id, email, method: "gmail" });
  };
  onfailure = (result) => {};
  validationfunc = (arg, name, length) => {
    let errors = [];
    if (name !== "Phone Number") {
      if (isEmpty(arg)) {
        errors.push("Input is empty");
      }
      if (!isAlphanumeric(blacklist(arg, " "))) {
        errors.push(`${name} Cant Only contain letters and numbers`);
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
  registerbutton = async () => {
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
        err = await this.props.creategmailuser({
          name: this["First Name"].value,
          lastname: this["Last Name"].value,
          username: this["Username"].value,
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
        style={{ left: this.props.left + 100 + "%" }}
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
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              onSuccess={this.onsuccess}
              onFailure={this.onfailure}
              render={(renderProps) => {
                return (
                  <div onClick={renderProps.onClick} className="googlebutton">
                    Login With Google
                  </div>
                );
              }}
            ></GoogleLogin>
            <div
              style={{
                marginBottom: "1rem",
                position: "relative",
                visibility: this.props.error ? "initial" : "hidden",
              }}
              className="manageaccounterrormessage"
            >
              {this.props.error}
            </div>
            {this.props.userstate.method === "gmail"
              ? inputs.map((a, b) => {
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
                          this.validationfunc(
                            this[a].value,
                            a,
                            inputlengths[b]
                          );
                        }}
                        ref={(e) => (this[a] = e)}
                        className="formfieldinput"
                        placeholder={a}
                      ></input>
                      {this.state[a] ? (
                        <div className="inputerrorsmark">
                          {this.state.showerror[b] === 1 ? (
                            <div className="inputerrors">
                              {this.state[a][0]}
                            </div>
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
                })
              : null}

            {this.props.userstate.method === "gmail" ? (
              <div onClick={this.registerbutton} className="registerbutton">
                Register
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userstate: state.createuser,
});

const mapDispatchToProps = (dispatch) => ({
  initializegmailuser: (e) => {
    dispatch(initializegmailuser(e));
  },
  creategmailuser: (e) => dispatch(creategmailuser(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gmailform);
