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
  loginarchosuser
} from "../../Actions/Actions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      animation: 0
    };
    this.newinterval = undefined;
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

  slideanimation = e => {
    return () => {
      clearInterval(this.newinterval);
      if (e === "archos") {
        if (this.state.animation > -100) {
          let i = this.state.animation;

          this.newinterval = setInterval(() => {
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

  archoscallback = () => {
    this.props.loginarchos({
      email: this.email.value,
      password: this.password.value
    });
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
              <div
                style={{
                  background: "rgb(255, 132, 132)",

                  height: "3rem",
                  width: "70%"
                }}
              >
                {this.props.userstate.errormessage}
              </div>
            )}
            <div className="archoslogininputcont">
              <input
                ref={a => (this.email = a)}
                placeholder="Email"
                className="archoslogininput"
              ></input>
            </div>
            <div className="archoslogininputcont">
              <input
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
