import React, { Component } from "react";
import "./Manageaccount.css";
import { connect } from "react-redux";
import {
  changepassword,
  changepasswordconfirmation,
  emailtoken,
  deleteuser,
  deleteuserconfirmation,
  logoutuser,
} from "../../Actions/Actions";
import leftarrow from "../Authenticate/left-arrow.svg";
import { isEmpty, isEmail, isLength, matches } from "validator";
import exclamation from "../Authenticate/Register/exclamation-mark.svg";

class Manageaccount extends Component {
  constructor() {
    super();
    this.state = {
      switcheroostate: 0,
      swipestate: 0,
      pswareyousuredisplay: "none",
      deletestate: "invalid",
      accareyousuredisplay: "none",
      email: null,
      token: null,
      password: null,
      changeemail: null,
      changetoken: null,
      changenewpassword: null,
      showerror: [0, 0, 0, 0, 0, 0],
      changepassworderror: undefined,
      changepasswordconfirmationerror: undefined,
      deleteaccconfirmationerror: undefined,
      currentmanageref: null,
    };
    this.interval = undefined;
  }
  componentDidMount() {}
  componentDidUpdate() {}
  closemanagefunc = (e) => {
    if (
      e.clientX <
        this[this.state.currentmanageref].getBoundingClientRect().left ||
      e.clientX >
        this[this.state.currentmanageref].getBoundingClientRect().right ||
      e.clientY <
        this[this.state.currentmanageref].getBoundingClientRect().top ||
      e.clientY >
        this[this.state.currentmanageref].getBoundingClientRect().bottom
    ) {
      this.setState({
        pswareyousuredisplay: "none",
        accareyousuredisplay: "none",
      });

      window.removeEventListener("mousedown", this.closemanagefunc);
    }
  };
  swipeanimation = (e) => {
    clearInterval(this.newinterval);

    let swipestate = this.state.swipestate;
    if (e === 0) {
      if (this.state.swipestate < 0) {
        this.newinterval = setInterval(() => {
          if (this.state.swipestate < 0) {
            swipestate++;
            this.setState({ swipestate: swipestate });
          } else {
            clearInterval(this.newinterval);
          }
        }, 5);
      }
    } else if (e === 1) {
      if (this.state.swipestate > -100) {
        this.newinterval = setInterval(() => {
          if (this.state.swipestate > -100) {
            swipestate = swipestate - 1;
            this.setState({ swipestate: swipestate });
          } else {
            clearInterval(this.newinterval);
          }
        }, 5);
      }
    }
  };
  switcheroosetter = (e) => {
    if (this.state.switcheroostate === 0 && e === 1) {
      this.setState({ switcheroostate: 1 });
    } else if (this.state.switcheroostate === 1 && e === 0) {
      this.setState({ switcheroostate: 0 });
    }
  };
  combinefunc = (e) => {
    return () => {
      this.switcheroosetter(e);
      this.swipeanimation(e);
    };
  };

  changepswproceed = async () => {
    let result = { error: undefined };
    await this.props.changepassword({
      email: this.changepswemail.value,
      result,
    });
    if (result.error) {
      this.setState({ changepassworderror: result.error });
    }
  };
  changepswconfirmationproceed = () => {
    this.props.changepasswordconfirmation({
      token: this.changepswtoken.value,
      changepassword: this.changepswconfirmationemail.value,
    });
  };
  changepswconfirmationagree = async () => {
    window.removeEventListener("mousedown", this.closemanagefunc);
    let result = { error: false };
    this.setState({ pswareyousuredisplay: "none" });
    await this.props.changepasswordconfirmation({
      changepassword: this.changepswconfirmationemail.value,
      token: this.changepswtoken.value,
      result,
    });
    if (result.error) {
      this.setState({ changepasswordconfirmationerror: result.error });
    }
  };
  formwidthsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      return "30%";
    } else if (i >= 1660) {
      return "35%";
    } else if (i >= 1440) {
      return "40%";
    } else if (i >= 1024) {
      return "45%";
    } else if (i >= 768) {
      return "60%";
    } else if (i >= 500) {
      return "70%";
    }
    return "100%";
  };
  formleftsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      return "35%";
    } else if (i >= 1660) {
      return "32.5%";
    } else if (i >= 1440) {
      return "30%";
    } else if (i >= 1024) {
      return "27.5%";
    } else if (i >= 768) {
      return "20%";
    } else if (i >= 500) {
      return "15%";
    }
    return "10%";
  };

  inputheightsetter = () => {
    let i = window.innerWidth;
    if (i >= 768) {
      return "3rem";
    } else {
      return "4rem";
    }
  };
  deleteuser = async () => {
    let result = { result: undefined, error: false };
    if (this.props.currentuser.usertype === "archos") {
      await this.props.deleteuser({
        props: {
          email: this.deleteaccemail.value,
          password: this.deleteaccpsw.value,
        },
        result: result,
      });
    } else {
      await this.props.deleteuser({
        props: { email: this.deleteaccemail.value },
        result: result,
      });
    }
    if (result.result === true) {
      this.setState({ deletestate: "valid" });
    }
    if (result.error) {
      this.setState({ deleteaccerror: result.error });
    }
  };
  deleteuserconfirmation = async () => {
    const result = { result: false };
    await this.props.deleteuserconfirmation({
      props: { token: this.deleteacctoken.value },
      result: result,
    });

    if (result.result === true) {
      this.setState({ deletestate: "success" });
      this.props.logout();
    }
    if (result.error) {
      this.setState({ deleteaccconfirmationerror: result.error });
    }
  };

  deleteaccountconfirmationagree = () => {
    window.removeEventListener("mousedown", this.closemanagefunc);
    this.deleteuserconfirmation();
    this.setState({ accareyousuredisplay: "none" });
  };

  validationfunc = (arg, name, length) => {
    let errors = [];
    if (isEmpty(arg)) {
      errors.push("Input is empty");
    }
    if (name === "email" || name === "changeemail") {
      if (!isEmail(arg)) {
        errors.push("Email needs to be in a given format - aaa@gmail.com");
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

  submitvalidation = (...args) => {
    let errorfound = false;
    args.map((a, b) => {
      if (!errorfound) {
        if (this.validationfunc(a.arg, a.name, a.length)) {
          errorfound = true;
        }
      }
    });
    return errorfound;
  };

  render() {
    return (
      <React.Fragment>
        <div className="manageaccountmanageaccount">Manage Your Account</div>
        <div className="manageaccountcont">
          <div
            className="manageaccountswitcheroo"
            style={{
              width: this.formwidthsetter(),
            }}
          >
            <div
              style={{
                background: this.state.switcheroostate === 0 ? "cyan" : null,
              }}
              className="changeaccountpasswordswitcheroo"
              onClick={this.combinefunc(0)}
            >
              Change Password
            </div>

            <div
              style={{
                background: this.state.switcheroostate === 1 ? "cyan" : null,
              }}
              className="deleteaccountswitcheroo"
              onClick={this.combinefunc(1)}
            >
              Delete Account
            </div>
          </div>
          <div
            className="manageaccountslideroo"
            style={{
              width: this.formwidthsetter(),
            }}
          >
            <div
              style={{ left: this.state.swipestate + "%" }}
              className="changeaccountpasswordcont"
            >
              {this.props.currentuser.usertype === "archos" ? (
                <React.Fragment>
                  {(() => {
                    if (this.props.emailtokenstate.tokenstate === "valid") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              padding: "0.5rem",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.props.setemailtokenstate("invalid")
                              }
                            >
                              <img src={leftarrow} width="20px" />
                            </div>
                          </div>
                          <div className="manageaccountmessages">
                            The token was sent to your email address
                          </div>
                          <div
                            className="manageaccounterrormessage"
                            style={{
                              visibility: this.state
                                .changepasswordconfirmationerror
                                ? null
                                : "hidden",
                            }}
                          >
                            {this.state.changepasswordconfirmationerror}
                          </div>
                          <div className="changepasswordemailinputcont">
                            <div
                              className="manageaccountinput"
                              style={{ height: this.inputheightsetter() }}
                            >
                              <input
                                onChange={() => {
                                  this.validationfunc(
                                    this.changepswtoken.value,
                                    "changetoken",
                                    1000
                                  );
                                }}
                                ref={(a) => (this.changepswtoken = a)}
                                placeholder="Token"
                                className="manageaccountinputinput"
                                type="text"
                              ></input>
                              <div
                                style={{
                                  display: this.state.changetoken
                                    ? null
                                    : "none",
                                }}
                                className="inputerrorsmark"
                              >
                                <img
                                  onMouseEnter={() => {
                                    this.setState((prevstate) => {
                                      prevstate.showerror[1] = 1;
                                      return { showerror: prevstate.showerror };
                                    });
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      showerror: [0, 0, 0, 0, 0, 0, 0],
                                    });
                                  }}
                                  style={{
                                    background: "white",
                                    paddingRight: "2px",
                                  }}
                                  src={exclamation}
                                  width="20px"
                                ></img>
                              </div>
                              <div
                                style={{
                                  display: this.state.showerror[1]
                                    ? "initial"
                                    : "none",
                                }}
                                className="inputerrors"
                              >
                                {this.state.changetoken &&
                                  this.state.changetoken[0]}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ height: this.inputheightsetter() }}
                            className="changepasswordemailinputcont"
                          >
                            <div
                              className="manageaccountinput"
                              style={{ height: this.inputheightsetter() }}
                            >
                              <input
                                onChange={() => {
                                  this.validationfunc(
                                    this.changepswconfirmationemail.value,
                                    "changenewpassword",
                                    50
                                  );
                                }}
                                ref={(a) =>
                                  (this.changepswconfirmationemail = a)
                                }
                                name="asd"
                                placeholder="New Password"
                                className="manageaccountinputinput"
                                type="text"
                              ></input>
                              <div
                                style={{
                                  display: this.state.changenewpassword
                                    ? null
                                    : "none",
                                }}
                                className="inputerrorsmark"
                              >
                                <img
                                  onMouseEnter={() => {
                                    this.setState((prevstate) => {
                                      prevstate.showerror[2] = 1;
                                      return { showerror: prevstate.showerror };
                                    });
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      showerror: [0, 0, 0, 0, 0, 0, 0],
                                    });
                                  }}
                                  style={{
                                    background: "white",
                                    paddingRight: "2px",
                                  }}
                                  src={exclamation}
                                  width="20px"
                                ></img>
                              </div>
                              <div
                                style={{
                                  display: this.state.showerror[2]
                                    ? "initial"
                                    : "none",
                                }}
                                className="inputerrors"
                              >
                                {this.state.changenewpassword &&
                                  this.state.changenewpassword[0]}
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={async () => {
                              await this.setState({
                                currentmanageref: "areyousureref",
                              });
                              window.addEventListener(
                                "mousedown",
                                this.closemanagefunc
                              );
                              this.setState({ pswareyousuredisplay: "flex" });
                            }}
                            className="manageaccountbutton"
                          >
                            Proceed
                          </div>
                          <div
                            ref={(a) => (this.areyousureref = a)}
                            style={{ display: this.state.pswareyousuredisplay }}
                            className="areyousure"
                          >
                            <div
                              style={{
                                flexGrow: 1,
                                color: "rgb(186, 255, 121)",
                              }}
                            >
                              Are you sure you want to continue
                            </div>
                            <div style={{ display: "flex" }}>
                              <div
                                className="manageaccountbutton"
                                onClick={this.changepswconfirmationagree}
                              >
                                Yes
                              </div>
                              <div
                                className="manageaccountbutton"
                                onClick={() => {
                                  window.removeEventListener(
                                    "mousedown",
                                    this.closemanagefunc
                                  );
                                  this.setState({
                                    pswareyousuredisplay: "none",
                                  });
                                }}
                              >
                                No
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (
                      this.props.emailtokenstate.tokenstate === "invalid"
                    ) {
                      return (
                        <React.Fragment>
                          <div className="manageaccountmessages">
                            Provide Your account's email address to change
                            current password
                          </div>
                          <div
                            className="manageaccounterrormessage"
                            style={{
                              visibility: this.state.changepassworderror
                                ? null
                                : "hidden",
                            }}
                          >
                            {this.state.changepassworderror}
                          </div>
                          <div className="changepasswordemailinputcont">
                            <div
                              className="manageaccountinput"
                              style={{ height: this.inputheightsetter() }}
                            >
                              <input
                                onChange={() => {
                                  this.validationfunc(
                                    this.changepswemail.value,
                                    "changeemail",
                                    50
                                  );
                                }}
                                name="qwe"
                                ref={(a) => (this.changepswemail = a)}
                                placeholder="Email"
                                className="manageaccountinputinput"
                                type="text"
                              ></input>
                              <div
                                style={{
                                  display: this.state.changeemail
                                    ? null
                                    : "none",
                                }}
                                className="inputerrorsmark"
                              >
                                <img
                                  onMouseEnter={() => {
                                    this.setState((prevstate) => {
                                      prevstate.showerror[0] = 1;
                                      return { showerror: prevstate.showerror };
                                    });
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      showerror: [0, 0, 0, 0, 0, 0, 0],
                                    });
                                  }}
                                  style={{
                                    background: "white",
                                    paddingRight: "2px",
                                  }}
                                  src={exclamation}
                                  width="20px"
                                ></img>
                              </div>
                              <div
                                style={{
                                  display: this.state.showerror[0]
                                    ? "initial"
                                    : "none",
                                }}
                                className="inputerrors"
                              >
                                {this.state.changeemail &&
                                  this.state.changeemail[0]}
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={this.changepswproceed}
                            className="manageaccountbutton"
                          >
                            Proceed
                          </div>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <div className="manageaccountmessages">
                          Your Password has Successfully Changed. Redirecting
                          back
                        </div>
                      );
                    }
                  })()}
                </React.Fragment>
              ) : (
                <div
                  style={{
                    color: "rgb(255, 184, 184)",
                  }}
                  className="manageaccountmessages"
                >
                  You can't change Gmail-Facebook Registered user's password
                </div>
              )}
            </div>

            <div
              className="deleteaccountcont"
              style={{ left: this.state.swipestate + 100 + "%" }}
            >
              {(() => {
                if (this.state.deletestate === "invalid") {
                  return (
                    <React.Fragment>
                      <div
                        className="manageaccountmessages"
                        style={{
                          color: "rgb(138, 255, 163)",
                        }}
                      >
                        Provide Account Email{" "}
                        {this.props.currentuser.usertype === "archos"
                          ? "and Password"
                          : ""}{" "}
                        to delete your account
                      </div>
                      <div
                        className="manageaccounterrormessage"
                        style={{
                          visibility: this.state.deleteaccerror
                            ? null
                            : "hidden",
                        }}
                      >
                        {this.state.deleteaccerror}
                      </div>
                      <div
                        className="deleteaccountemailinputcont"
                        style={{
                          height: this.inputheightsetter(),
                        }}
                      >
                        <div className="manageaccountinput">
                          <input
                            onChange={() => {
                              this.validationfunc(
                                this.deleteaccemail.value,
                                "email",
                                50
                              );
                            }}
                            className="manageaccountinputinput"
                            ref={(a) => (this.deleteaccemail = a)}
                            placeholder="Email"
                            type="text"
                          ></input>
                          <div
                            style={{
                              display: this.state.email ? null : "none",
                            }}
                            className="inputerrorsmark"
                          >
                            <img
                              onMouseEnter={() => {
                                this.setState((prevstate) => {
                                  prevstate.showerror[3] = 1;
                                  return { showerror: prevstate.showerror };
                                });
                              }}
                              onMouseLeave={() => {
                                this.setState({
                                  showerror: [0, 0, 0, 0, 0, 0, 0],
                                });
                              }}
                              style={{
                                background: "white",
                                paddingRight: "2px",
                              }}
                              src={exclamation}
                              width="20px"
                            ></img>
                          </div>
                          <div
                            style={{
                              display: this.state.showerror[3]
                                ? "initial"
                                : "none",
                            }}
                            className="inputerrors"
                          >
                            {this.state.email && this.state.email[0]}
                          </div>
                        </div>
                      </div>
                      {this.props.currentuser.usertype === "archos" ? (
                        <div className="deleteaccountpasswordinputcont">
                          <div
                            className="manageaccountinput"
                            style={{ height: this.inputheightsetter() }}
                          >
                            <input
                              onChange={() => {
                                this.validationfunc(
                                  this.deleteaccpsw.value,
                                  "password",
                                  50
                                );
                              }}
                              ref={(a) => (this.deleteaccpsw = a)}
                              placeholder="Password"
                              className="manageaccountinputinput"
                              type="password"
                            ></input>
                            <div
                              style={{
                                display: this.state.password ? null : "none",
                              }}
                              className="inputerrorsmark"
                            >
                              <img
                                onMouseEnter={() => {
                                  this.setState((prevstate) => {
                                    prevstate.showerror[4] = 1;
                                    return { showerror: prevstate.showerror };
                                  });
                                }}
                                onMouseLeave={() => {
                                  this.setState({
                                    showerror: [0, 0, 0, 0, 0, 0, 0],
                                  });
                                }}
                                style={{
                                  background: "white",
                                  paddingRight: "2px",
                                }}
                                src={exclamation}
                                width="20px"
                              ></img>
                            </div>
                            <div
                              style={{
                                display: this.state.showerror[4]
                                  ? null
                                  : "none",
                              }}
                              className="inputerrors"
                            >
                              {this.state.password && this.state.password[0]}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div
                        onClick={this.deleteuser}
                        className="manageaccountbutton"
                      >
                        Proceed
                      </div>
                    </React.Fragment>
                  );
                } else if (this.state.deletestate === "valid") {
                  return (
                    <React.Fragment>
                      <div className="manageaccountmessages">
                        The token was sent to your email address
                      </div>
                      <div
                        className="manageaccounterrormessage"
                        style={{
                          visibility: this.state.deleteaccconfirmationerror
                            ? null
                            : "hidden",
                        }}
                      >
                        {this.state.deleteaccconfirmationerror}
                      </div>
                      <div className="changepasswordemailinputcont">
                        <div
                          className="manageaccountinput"
                          style={{ height: this.inputheightsetter() }}
                        >
                          <div style={{ width: "100%", height: "100%" }}>
                            <input
                              onChange={() => {
                                this.validationfunc(
                                  this.deleteacctoken.value,
                                  "token",
                                  1000
                                );
                              }}
                              style={{ width: "100%", height: "100%" }}
                              ref={(a) => (this.deleteacctoken = a)}
                              placeholder="Token"
                              type="text"
                              className="manageaccountinputinput"
                            ></input>
                          </div>
                          <div
                            style={{
                              display: this.state.token ? null : "none",
                            }}
                            className="inputerrorsmark"
                          >
                            <img
                              onMouseEnter={() => {
                                this.setState((prevstate) => {
                                  prevstate.showerror[5] = 1;
                                  return { showerror: prevstate.showerror };
                                });
                              }}
                              onMouseLeave={() => {
                                this.setState({
                                  showerror: [0, 0, 0, 0, 0, 0, 0],
                                });
                              }}
                              style={{
                                background: "white",
                                paddingRight: "2px",
                              }}
                              src={exclamation}
                              width="20px"
                            ></img>
                          </div>
                          <div
                            style={{
                              display: this.state.showerror[5] ? null : "none",
                            }}
                            className="inputerrors"
                          >
                            {this.state.token && this.state.token[0]}
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={async () => {
                          await this.setState({
                            currentmanageref: "delareyousureref",
                          });
                          window.addEventListener(
                            "mousedown",
                            this.closemanagefunc
                          );
                          this.setState({ accareyousuredisplay: "flex" });
                        }}
                        className="manageaccountbutton"
                      >
                        Proceed
                      </div>
                      <div
                        ref={(a) => (this.delareyousureref = a)}
                        style={{ display: this.state.accareyousuredisplay }}
                        className="areyousure"
                      >
                        <div
                          style={{
                            flexGrow: 1,
                            color: "rgb(186, 255, 121)",
                          }}
                        >
                          Are you sure you want to continue
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            className="manageaccountbutton"
                            onClick={this.deleteaccountconfirmationagree}
                          >
                            Yes
                          </div>
                          <div
                            className="manageaccountbutton"
                            onClick={() => {
                              window.removeEventListener(
                                "mousedown",
                                this.closemanagefunc
                              );
                              this.setState({
                                accareyousuredisplay: "none",
                              });
                            }}
                          >
                            No
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                } else if (this.state.deletestate === "success") {
                  return (
                    <React.Fragment>
                      <div className="manageaccountmessages">
                        Account Deleted
                      </div>
                    </React.Fragment>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.setcurrentuser,
  emailtokenstate: state.setemailtokenstate,
});

const mapDispatchToProps = (dispatch) => ({
  setemailtokenstate: (e) => dispatch(emailtoken(e)),
  changepassword: (e) => dispatch(changepassword(e)),
  changepasswordconfirmation: (e) => dispatch(changepasswordconfirmation(e)),
  deleteuser: (e) => dispatch(deleteuser(e)),
  deleteuserconfirmation: (e) => dispatch(deleteuserconfirmation(e)),
  logout: () => dispatch(logoutuser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manageaccount);
