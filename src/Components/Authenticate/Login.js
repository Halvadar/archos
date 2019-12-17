import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import "./Login.css";
import cancel from "./cancel.svg";
import leftarrow from "./left-arrow.svg";
import { connect } from "react-redux";
import {
  loginfacebookuser,
  logingmailuser,
  loginarchosuser,
  loginerror
} from "../../Actions/Actions";
import { isEmpty, isLength, isEmail } from "validator";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      animation: 0,
      errorsfound: false
    };
    this.newinterval = undefined;
    this.unmounted = false;
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.loginformstate === "none") {
        clearInterval(this.newinterval);
        this.setState({ animation: 0 });
      }
    }
  }
  componentWillUnmount() {
    this.unmounted = true;
  }

  slideanimation = e => {
    return () => {
      this.props.loginerror(null);
      clearInterval(this.newinterval);
      if (e === "archos") {
        if (this.state.animation > -100) {
          let i = this.state.animation;

          this.newinterval = setInterval(() => {
            if (this.unmounted) {
              clearInterval(this.newinterval);
            }
            if (this.state.animation > -100) {
              i = i - 1;

              this.setState({ animation: i });
            } else {
              clearInterval(this.newinterval);
            }
          }, 5);
        }
      } else if (e === "facebookgmail") {
        if (this.state.animation < 0) {
          let i = this.state.animation;
          this.newinterval = setInterval(() => {
            if (this.unmounted) {
              clearInterval(this.newinterval);
            }
            if (this.state.animation < 0) {
              i++;
              this.setState({ animation: i });
            } else {
              clearInterval(this.newinterval);
            }
          }, 5);
        }
      }
    };
  };

  animationresetter = () => {
    this.props.closeloginform();
    this.setState({ animation: 0 });
    this.props.loginerror(null);
  };
  facebookcallback = result => {
    console.log(result);
    this.props.loginfacebook({ id: result.id, token: result.accessToken });
  };
  gmailcallback = result => {
    console.log(result);
    this.props.logingmail({
      id: result.googleId,
      token: result.accessToken
    });
  };

  archoscallback = async () => {
    await this.validatorfun();
    if (!this.state.errorsfound) {
      this.props.loginarchos({
        email: this.email.value,
        password: this.password.value
      });
    }
  };
  validatorfun = () => {
    let emailerrors = [];
    let passworderrors = [];
    if (isEmpty(this.email.value)) {
      emailerrors.push("Email Input is Empty");
    }

    if (!isLength(this.email.value, { max: 40 })) {
      emailerrors.push("Email Input is Too Long");
    }
    if (!isEmail(this.email.value)) {
      emailerrors.push("Email needs to be in a given format - aaa@email.com");
    }
    if (isEmpty(this.password.value)) {
      passworderrors.push("Password Input is Empty");
    }
    if (!isLength(this.password.value, { max: 100 })) {
      passworderrors.push("Password Input is Too Long");
    }
    let combinederrors = [...emailerrors, ...passworderrors];
    if (combinederrors.length > 0) {
      this.setState({ errorsfound: true });
    } else {
      this.setState({ errorsfound: false });
    }
    this.props.loginerror(combinederrors[0]);
  };

  render() {
    return (
      <div
        ref={e => this.props.passref(e)}
        style={this.props.style}
        className="loginfixed loginfixedmd"
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div className="loginx">
            <div
              className="formicons"
              onClick={this.slideanimation("facebookgmail")}
              style={{
                visibility: this.state.animation === -100 ? "initial" : "hidden"
              }}
            >
              <img src={leftarrow} width="25px"></img>
            </div>
            <div className="formicons" onClick={this.animationresetter}>
              <img src={cancel} width="30px"></img>
            </div>
          </div>
          <div
            style={{ left: this.state.animation + "%" }}
            className="loginformfacegoogle"
          >
            <div className="loginlogin"> Login </div>
            {this.props.userstate.errormessage && (
              <div className="errormessage">
                {this.props.userstate.errormessage}
              </div>
            )}
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              callback={this.facebookcallback}
              disableMobileRedirect={true}
              render={renderProps => {
                return (
                  <div
                    onClick={renderProps.onClick}
                    className="loginbuttonfacebook"
                  >
                    Login With Facebook
                  </div>
                );
              }}
            ></FacebookLogin>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              onSuccess={this.gmailcallback}
              onFailure={this.gmailfailure}
              render={props => {
                return (
                  <div
                    style={{}}
                    className="loginbuttongoogle"
                    onClick={props.onClick}
                  >
                    Login With Google
                  </div>
                );
              }}
            ></GoogleLogin>
            <div
              onClick={this.slideanimation("archos")}
              className="loginbuttonarchos"
            >
              Login With Archos
            </div>
          </div>
          <div
            style={{ left: this.state.animation + 100 + "%" }}
            className="loginformarchos"
          >
            {this.props.userstate.errormessage && (
              <div className="errormessage">
                {this.props.userstate.errormessage}
              </div>
            )}
            <div className="archoslogininputcont">
              <div
                className="inputenteredtitle"
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "0",
                  visibility: this.email
                    ? this.email.value.length > 0
                      ? "initial"
                      : "hidden"
                    : "hidden"
                }}
              >
                Email
              </div>
              <input
                onChange={() => {
                  this.forceUpdate();
                }}
                ref={a => (this.email = a)}
                placeholder="Email"
                className="archoslogininput"
              ></input>
            </div>
            <div className="archoslogininputcont">
              <div
                className="inputenteredtitle"
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "0",
                  visibility: this.password
                    ? this.password.value.length > 0
                      ? "initial"
                      : "hidden"
                    : "hidden"
                }}
              >
                Password
              </div>
              <input
                onChange={() => {
                  this.forceUpdate();
                }}
                type="password"
                ref={a => (this.password = a)}
                placeholder="Password"
                className="archoslogininput"
              ></input>
            </div>

            <div onClick={this.archoscallback} className="archosformlogin">
              Login
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userstate: state.setcurrentuser
});

const mapDispatchToProps = dispatch => ({
  loginfacebook: e => {
    dispatch(loginfacebookuser(e));
  },
  logingmail: e => {
    dispatch(logingmailuser(e));
  },
  loginarchos: e => {
    dispatch(loginarchosuser(e));
  },
  loginerror: e => dispatch(loginerror(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
