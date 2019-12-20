import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import {
  initializefacebookuser,
  createfacebookuser
} from "../../../Actions/Actions";

import exclamation from "./exclamation-mark.svg";
import {
  isEmpty,
  isEmail,
  isLength,
  isAlphanumeric,
  blacklist,
  isNumeric
} from "validator";
const inputs = ["Username", "First Name", "Last Name", "Email", "Phone Number"];
const inputlengths = [30, 30, 50, 70, 25];
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
      showerror: [0, 0, 0, 0, 0],
      success: false
    };
    this.timeout = null;
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

  validationfunc = (arg, name, length) => {
    let errors = [];
    if (name !== "Phone Number") {
      if (isEmpty(arg)) {
        errors.push("Input is empty");
      }
      if (name !== "Email") {
        if (!isAlphanumeric(blacklist(arg, " "))) {
          errors.push(`${name} Cant Only contain letters and numbers`);
        }
      }
    }

    if (name === "Email") {
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

    if (errors.length > 0) {
      this.setState(prevstate => {
        prevstate[name] = errors;
        return prevstate;
      });
      return true;
    } else {
      this.setState(prevstate => {
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
    finderror = inputs.filter(a => {
      if (this.state[a]) {
        return true;
      }
    });
    console.log(finderror);
    if (finderror.length === 0) {
      console.log("no errors founds");
      try {
        let err;
        err = await this.props.createfacebookuser({
          name: this["First Name"].value,
          lastname: this["Last Name"].value,
          username: this["Username"].value,
          email: this["Email"].value,
          phone:
            this["Phone Number"].value !== ""
              ? this["Phone Number"].value
              : undefined
        });
        if (err) {
          throw err;
        }
        this.setState({ success: true });
        this.timeout = setTimeout(() => {
          this.props.history.push("/");
        }, 3000);
      } catch (err) {}
    }
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <div style={{ left: this.props.left + "%" }} className="registerpageform">
        {this.state.success ? (
          <div
            style={{ color: "rgb(77, 179, 68)" }}
            className="manageaccountmessages"
          >
            You've Registered Successfully
          </div>
        ) : (
          <React.Fragment>
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
                visibility: this.props.error ? "initial" : "hidden",
                marginBottom: "1rem"
              }}
              className="manageaccounterrormessage"
            >
              {this.props.error}
            </div>
            {this.props.userstate.method === "facebook"
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
                            : "hidden"
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
                        ref={e => (this[a] = e)}
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
          </React.Fragment>
        )}
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
