import React, { Component } from "react";
import "./Manageaccount.css";
import { connect } from "react-redux";

class Manageaccount extends Component {
  constructor() {
    super();
    this.state = {
      switcheroostate: 0,
      swipestate: 0
    };
    this.interval = undefined;
  }
  componentDidMount() {
    console.log(this.props.currentuser);
  }
  componentDidUpdate() {
    console.log(this.props.currentuser);
  }

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

  render() {
    return (
      <React.Fragment>
        <div className="manageaccountmanageaccount">Manage Your Account</div>
        <div className="manageaccountcont">
          <div className="manageaccountswitcheroo">
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
          <div className="manageaccountslideroo">
            <div
              style={{ left: this.state.swipestate + "%" }}
              className="changeaccountpasswordcont"
            >
              {this.props.currentuser.usertype === "archos" ? (
                <React.Fragment>
                  <div className="manageaccountmessages">
                    Provide Your account's email address to change current
                    password
                  </div>
                  <div className="changepasswordemailinputcont">
                    <input
                      placeholder="Email"
                      className="manageaccountinput"
                      type="text"
                    ></input>
                  </div>
                  <div className="manageaccountbutton">Proceed</div>
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
              <div
                className="manageaccountmessages"
                style={{
                  color: "rgb(138, 255, 163)"
                }}
              >
                provide Account Email{" "}
                {this.props.currentuser.usertype === "archos"
                  ? "and Password"
                  : ""}{" "}
                to delete your account
              </div>
              <div className="deleteaccountemailinputcont">
                <input
                  placeholder="Email"
                  type="text"
                  className="manageaccountinput"
                ></input>
              </div>
              <div className="deleteaccountpasswordinputcont">
                <input
                  placeholder="Password"
                  className="manageaccountinput"
                  type="text"
                ></input>
              </div>
              <div className="manageaccountbutton">Proceed</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentuser: state.setcurrentuser
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Manageaccount);
