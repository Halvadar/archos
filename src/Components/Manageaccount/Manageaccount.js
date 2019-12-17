import React, { Component } from "react";
import "./Manageaccount.css";
import { connect } from "react-redux";
import {
  changepassword,
  changepasswordconfirmation,
  emailtoken,
  deleteuser,
  deleteuserconfirmation
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
      showerror: [0, 0, 0, 0, 0, 0]
    };
    this.interval = undefined;
  }
  componentDidMount() {
    console.log(this.props.changepassword);
  }
  componentDidUpdate() {}

  swipeanimation = e => {
    console.log("passed");
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
  switcheroosetter = e => {
    if (this.state.switcheroostate === 0 && e === 1) {
      this.setState({ switcheroostate: 1 });
    } else if (this.state.switcheroostate === 1 && e === 0) {
      this.setState({ switcheroostate: 0 });
    }
  };
  combinefunc = e => {
    return () => {
      this.switcheroosetter(e);
      this.swipeanimation(e);
    };
  };

  changepswproceed = () => {
    this.props.changepassword({ email: this.changepswemail.value });
  };
  changepswconfirmationproceed = () => {
    this.props.changepasswordconfirmation({
      token: this.changepswtoken.value,
      changeemail: this.changepswconfirmationemail.value
    });
  };
  changepswconfirmationagree = () => {
    this.setState({ pswareyousuredisplay: "false" });
    this.props.changepasswordconfirmation({
      changeemail: this.changepswconfirmationemail.value,
      token: this.changepswtoken.value
    });
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
    let result = { result: undefined };
    if (this.props.currentuser.usertype === "archos") {
      await this.props.deleteuser({
        props: {
          email: this.deleteaccemail.value,
          password: this.deleteaccpsw.value
        },
        result: result
      });
    } else {
      await this.props.deleteuser({
        props: { email: this.deleteaccemail.value },
        result: result
      });
    }
    console.log(result);
    if (result.result === true) {
      this.setState({ deletestate: "valid" });
    }
  };
  deleteuserconfirmation = async () => {
    const result = { result: false };
    await this.props.deleteuserconfirmation({
      props: { token: this.deleteacctoken.value },
      result: result
    });

    if (result.result === true) {
      this.setState({ deletestate: "success" });
    }
  };

  deleteaccountconfirmationagree = () => {
    this.deleteuserconfirmation();
    this.setState({ accareyousuredisplay: "none" });
  };

  validationfunc = (arg, name, length) => {
    let errors = [];
    if (isEmpty(arg)) {
      errors.push("Input is empty");
    }
    if (name === "email") {
      if (!isEmail(arg)) {
        errors.push("Email needs to be in a given format - aaa@gmail.com");
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
              width: this.formwidthsetter()
            }}
          >
            <div
              style={{
                background: this.state.switcheroostate === 0 ? "cyan" : null
              }}
              className="changeaccountpasswordswitcheroo"
              onClick={this.combinefunc(0)}
            >
              Change Password
            </div>

            <div
              style={{
                background: this.state.switcheroostate === 1 ? "cyan" : null
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
              width: this.formwidthsetter()
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
                            alignItems: "center"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              padding: "0.5rem",
                              width: "100%"
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
                          <div className="changepasswordemailinputcont">
                            <input
                              style={{ height: this.inputheightsetter() }}
                              ref={a => (this.changepswtoken = a)}
                              placeholder="Token"
                              className="manageaccountinput"
                              type="text"
                            ></input>
                          </div>
                          <div
                            style={{ height: this.inputheightsetter() }}
                            className="changepasswordemailinputcont"
                          >
                            <input
                              style={{ height: this.inputheightsetter() }}
                              ref={a => (this.changepswconfirmationemail = a)}
                              name="asd"
                              placeholder="New Email"
                              className="manageaccountinput"
                              type="text"
                            ></input>
                          </div>
                          <div
                            onClick={() =>
                              this.setState({ pswareyousuredisplay: "flex" })
                            }
                            className="manageaccountbutton"
                          >
                            Proceed
                          </div>
                          <div
                            style={{ display: this.state.pswareyousuredisplay }}
                            className="areyousure"
                          >
                            <div
                              style={{
                                flexGrow: 1,
                                color: "rgb(186, 255, 121)"
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
                                onClick={() =>
                                  this.setState({
                                    pswareyousuredisplay: "none"
                                  })
                                }
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
                          <div className="changepasswordemailinputcont">
                            <input
                              style={{ height: this.inputheightsetter() }}
                              name="qwe"
                              ref={a => (this.changepswemail = a)}
                              placeholder="Email"
                              className="manageaccountinput"
                              type="text"
                            ></input>
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
                    color: "rgb(255, 184, 184)"
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
                console.log(this.state.deletestate);
                if (this.state.deletestate === "invalid") {
                  return (
                    <React.Fragment>
                      <div
                        className="manageaccountmessages"
                        style={{
                          color: "rgb(138, 255, 163)"
                        }}
                      >
                        Provide Account Email{" "}
                        {this.props.currentuser.usertype === "archos"
                          ? "and Password"
                          : ""}{" "}
                        to delete your account
                      </div>
                      <div className="deleteaccountemailinputcont">
                        <input
                          style={{ height: this.inputheightsetter() }}
                          ref={a => (this.deleteaccemail = a)}
                          placeholder="Email"
                          type="text"
                          className="manageaccountinput"
                        ></input>
                        <div
                          style={{
                            display: this.state.email ? "initial" : "none"
                          }}
                          className="inputerrorsmark"
                        >
                          <img
                            onMouseEnter={() => {
                              this.setState(prevstate => {
                                prevstate.showerror[3] = 1;
                                return { showerror: prevstate.showerror };
                              });
                            }}
                            onMouseLeave={() => {
                              this.setState({
                                showerror: [0, 0, 0, 0, 0, 0, 0]
                              });
                            }}
                            style={{
                              background: "white",
                              paddingRight: "2px"
                            }}
                            src={exclamation}
                            width="20px"
                          ></img>
                        </div>
                        <div
                          style={{
                            display: this.state.showerror[1]
                              ? "initial"
                              : "none"
                          }}
                          className="inputerrors"
                        >
                          {this.state.description && this.state.description[0]}
                        </div>
                      </div>
                      {this.props.currentuser.usertype === "archos" ? (
                        <div className="deleteaccountpasswordinputcont">
                          <input
                            style={{ height: this.inputheightsetter() }}
                            ref={a => (this.deleteaccpsw = a)}
                            placeholder="Password"
                            className="manageaccountinput"
                            type="text"
                          ></input>
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
                      <div className="changepasswordemailinputcont">
                        <div style={{ width: "100%", height: "100%" }}>
                          <input
                            style={{ height: this.inputheightsetter() }}
                            ref={a => (this.deleteacctoken = a)}
                            placeholder="Token"
                            className="manageaccountinput"
                            type="text"
                          ></input>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          this.setState({ accareyousuredisplay: "flex" })
                        }
                        className="manageaccountbutton"
                      >
                        Proceed
                      </div>
                      <div
                        style={{ display: this.state.accareyousuredisplay }}
                        className="areyousure"
                      >
                        <div
                          style={{
                            flexGrow: 1,
                            color: "rgb(186, 255, 121)"
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
                            onClick={() =>
                              this.setState({
                                accareyousuresuredisplay: "none"
                              })
                            }
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

const mapStateToProps = state => ({
  currentuser: state.setcurrentuser,
  emailtokenstate: state.setemailtokenstate
});

const mapDispatchToProps = dispatch => ({
  setemailtokenstate: e => dispatch(emailtoken(e)),
  changepassword: e => dispatch(changepassword(e)),
  changepasswordconfirmation: e => dispatch(changepasswordconfirmation(e)),
  deleteuser: e => dispatch(deleteuser(e)),
  deleteuserconfirmation: e => dispatch(deleteuserconfirmation(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Manageaccount);
