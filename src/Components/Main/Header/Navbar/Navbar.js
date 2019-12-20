import React, { Component } from "react";
import logo from "./logo.svg";
import "./Navbar.css";
import { connect } from "react-redux";
import hamburger from "./hamburger.svg";
import { NavLink } from "react-router-dom";
import {
  setcurrentuser,
  logoutuser,
  loginerror
} from "../../../../Actions/Actions";
import Login from "../../../Authenticate/Login";
import Addservice from "../../../Addservice/Addservice";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOnMouseEnter: false,
      registerOnMouseEnter: false,
      categoriesOnMouseEnter: false,
      loginAnimation: 0,
      registerAnimation: 0,
      categoriesAnimation: 0,
      hamburgerheight: 0,
      hamburgerwidth: 0,
      hamburgertop: 30,
      registertop: 0,
      logintop: 0,
      usertop: 0,
      hamburgeranimationstatus: false,
      hamburgeranimationstate: "notexpanded",
      hamburgeranimationindex: 0,
      sm: null,
      hamburgerimagewidth: undefined,
      loginformstate: "none",
      history: undefined
    };
    this.hamburgerref = React.createRef(this.hamburgerref);
    this.r = React.createRef(this.r);
    this.hambimgref = React.createRef(this.hambimgref);
  }

  aaa = q => {
    this.hamburgerref = q;
    this.props.refref(q);
  };
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentDidMount() {
    this.setState({ history: this.props.history.location.pathname });
    this.props.history.listen(location => {
      this.setState({ history: this.props.history.location.pathname });
    });
    window.addEventListener("resize", this.resizefunc);

    if (this.state.sm) {
      this.setState({
        hamburgerimagewidth:
          window.getComputedStyle(this.hambimgref).getPropertyValue("width") * 2
      });
    }
  }
  resizefunc = () => {
    if (window.innerWidth < 768) {
      this.setState({ sm: true });
    } else {
      this.setState({ sm: false });
    }
  };
  onMouseEnterFunc = arg => {
    if (arg === 0) {
      this.setState({ loginOnMouseEnter: true });

      this.onmousenteranimation();
    } else if (arg === 1) {
      this.setState({ registerOnMouseEnter: true });
      this.onmouseenteranimation1();
    } else if (arg === 2) {
      this.setState({ categoriesOnMouseEnter: true });
      this.onmouseenteranimation2();
    }
  };
  onMouseLeaveFunc = arg => {
    if (arg === 0) {
      this.setState({ loginOnMouseEnter: false });
    } else if (arg === 1) {
      this.setState({ registerOnMouseEnter: false });
    } else if (arg === 2) {
      this.setState({ categoriesOnMouseEnter: false });
    }
  };

  onmousenteranimation = () => {
    var bot = 0;
    var interval = setInterval(() => {
      if (bot < 10 && this.state.loginOnMouseEnter === true) {
        bot++;
        this.setState({ loginAnimation: bot });
      } else if (bot > 0 && this.state.loginOnMouseEnter === false) {
        bot = bot - 1;
        this.setState({ loginAnimation: bot });
      } else if (bot === 10 && this.state.loginOnMouseEnter === true) {
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  onmouseenteranimation1 = () => {
    var bot = 0;
    var interval = setInterval(() => {
      if (bot < 10 && this.state.registerOnMouseEnter === true) {
        bot++;
        this.setState({ registerAnimation: bot });
        console.log(this.state.registerOnMouseEnter);
      } else if (bot > 0 && this.state.registerOnMouseEnter === false) {
        bot = bot - 1;
        this.setState({ registerAnimation: bot });
      } else if (bot === 10 && this.state.registerOnMouseEnter === true) {
      } else {
        clearInterval(interval);
      }
    }, 10);
  };
  onmouseenteranimation2 = () => {
    var bot = 0;
    var interval = setInterval(() => {
      if (bot < 10 && this.state.categoriesOnMouseEnter === true) {
        bot++;
        this.setState({ categoriesAnimation: bot });
        console.log(this.state.categoriesOnMouseEnter);
      } else if (bot > 0 && this.state.categoriesOnMouseEnter === false) {
        bot = bot - 1;
        this.setState({ categoriesAnimation: bot });
      } else if (bot === 10 && this.state.categoriesOnMouseEnter === true) {
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  hamburgerclick = e => {
    e.preventDefault();
    console.log("event triggered!");
    if (!this.state.hamburgeranimationstatus) {
      console.log("went thourgh status");
      if (this.state.hamburgeranimationstate === "notexpanded") {
        console.log("went through state!");
        var a = this.state.hamburgerwidth;
        var b = this.state.hamburgerheight;
        var interval = setInterval(() => {
          console.log("aaa");
          if (a < 100) {
            a++;
            this.setState({
              hamburgerwidth: a,
              hamburgeranimationindex: a,
              hamburgeranimationstatus: true
            });
          } else if (a === 100 && b < 100) {
            b++;
            this.setState({
              logintop: b,
              registertop: b * 2,
              usertop: b * 3,
              hamburgerheight: b,
              hamburgeranimationstatus: true
            });
          } else {
            this.setState({
              hamburgeranimationstate: "expanded",
              hamburgeranimationstatus: false
            });
            clearInterval(interval);
          }
        }, 5);
      }
      if (this.state.hamburgeranimationstate === "expanded") {
        var a = this.state.hamburgerwidth;
        var b = this.state.hamburgerheight;

        var interval = setInterval(() => {
          if (b > 0) {
            b = b - 1;

            this.setState({
              hamburgerheight: b,
              logintop: b,
              registertop: b * 2,
              usertop: b * 3,
              hamburgeranimationindex: a,
              hamburgeranimationstatus: true
            });
          } else if (b === 0 && a > 0) {
            a = a - 1;
            this.setState({
              hamburgerwidth: a,
              hamburgeranimationindex: a,
              hamburgeranimationstatus: true
            });
          } else {
            this.setState({
              hamburgeranimationstate: "notexpanded",
              hamburgeranimationstatus: false
            });
            clearInterval(interval);
          }
        }, 5);
      }
    }
  };

  style = () => {
    return this.state.hamburgerwidth;
  };
  loginclick = () => {
    this.setState({ loginformstate: "initial" });
    window.addEventListener("mousedown", this.closeloginformevent);
  };
  closeloginformevent = e => {
    if (
      e.clientX < this.loginformref.getBoundingClientRect().left ||
      e.clientX > this.loginformref.getBoundingClientRect().right ||
      e.clientY < this.loginformref.getBoundingClientRect().top ||
      e.clientY > this.loginformref.getBoundingClientRect().bottom
    ) {
      this.props.loginerror();
      window.removeEventListener("mousedown", this.closeloginformevent);
      this.setState({ loginformstate: "none" });
    }
  };

  loginwidthsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      return "20%";
    } else if (i >= 1660) {
      return "25%";
    } else if (i >= 1440) {
      return "30%";
    } else if (i >= 1024) {
      return "35%";
    } else if (i >= 768) {
      return "50%";
    } else if (i >= 500) {
      return "60%";
    }
    return "70%";
  };
  loginleftsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      return "40%";
    } else if (i >= 1660) {
      return "37.5%";
    } else if (i >= 1440) {
      return "35%";
    } else if (i >= 1024) {
      return "32.5%";
    } else if (i >= 768) {
      return "25%";
    } else if (i >= 500) {
      return "20%";
    }
    return "15%";
  };

  render() {
    if (window.innerWidth >= 768 || this.state.sm === false) {
      return (
        <div style={{}} className="navbar justify-content-between custnavbar">
          <NavLink to="/" className=" mt-2 img-l img-sm img-md">
            <img src={logo} alt="Archos" width="100%" />
          </NavLink>
          {this.state.loginformstate !== "none" && (
            <Login
              loginformstate={this.state.loginformstate}
              closeloginform={() => {
                this.setState({ loginformstate: "none" });
                window.removeEventListener(
                  "mousedown",
                  this.closeloginformevent
                );
              }}
              passref={e => (this.loginformref = e)}
              style={{
                left: this.loginleftsetter(),
                width: this.loginwidthsetter(),
                display: this.state.loginformstate
              }}
            ></Login>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: "1",
              marginRight: "2rem"
            }}
          ></div>
          <div className="row links rounded-left">
            <div
              className="custnavitemcont "
              onMouseEnter={() => this.onMouseEnterFunc(2)}
              onMouseLeave={() => this.onMouseLeaveFunc(2)}
              onClick={() => {
                this.props.history.push("/categories");
              }}
            >
              <div
                style={{
                  position: "relative",
                  bottom: this.state.categoriesAnimation + "%"
                }}
                className="custnavitem"
              >
                Categories
              </div>
              <div
                className="shadow"
                style={{
                  width: `${this.state.categoriesAnimation * 10}%`
                }}
              ></div>
            </div>
            {this.props.currentuser.username === undefined ||
            this.props.currentuser.username === null ? (
              <React.Fragment>
                <div
                  className="custnavitemcont"
                  onMouseEnter={() => this.onMouseEnterFunc(0)}
                  onMouseLeave={() => this.onMouseLeaveFunc(0)}
                  onClick={this.loginclick}
                >
                  <div
                    style={{
                      position: "relative",
                      bottom: this.state.loginAnimation + "%"
                    }}
                    className="custnavitem"
                  >
                    Log In
                  </div>
                  <div
                    className="shadow"
                    style={{
                      width: `${this.state.loginAnimation * 10}%`
                    }}
                  ></div>
                </div>
                <div
                  className="custnavitemcont"
                  onMouseEnter={() => this.onMouseEnterFunc(1)}
                  onMouseLeave={() => this.onMouseLeaveFunc(1)}
                  onClick={() => {
                    this.props.history.push("register");
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      bottom: this.state.registerAnimation + "%"
                    }}
                    className=" custnavitem"
                  >
                    Register
                  </div>
                  <div
                    className="shadow"
                    style={{
                      width: `${this.state.registerAnimation * 10}%`
                    }}
                  ></div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Addservice
                  historystate={this.state.history}
                  history={this.props.history}
                ></Addservice>
                <div
                  className="custnavitemcont"
                  onMouseEnter={() => this.onMouseEnterFunc(1)}
                  onMouseLeave={() => this.onMouseLeaveFunc(1)}
                  onClick={this.props.logout}
                >
                  <div
                    style={{
                      position: "relative",
                      bottom: this.state.registerAnimation + "%"
                    }}
                    className=" custnavitem"
                  >
                    Log Out
                  </div>
                  <div
                    className="shadow"
                    style={{
                      width: `${this.state.registerAnimation * 10}%`
                    }}
                  ></div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="w-100  custnavbar justify-content-between ">
            <div className=" mt-2 img-l img-sm img-md img-xl">
              <NavLink to="/" className=" mt-2 img-l img-sm img-md">
                <img src={logo} alt="Archos" width="100%" />
              </NavLink>
            </div>
            <Login
              loginformstate={this.state.loginformstate}
              closeloginform={() => {
                this.setState({ loginformstate: "none" });
                window.removeEventListener(
                  "mousedown",
                  this.closeloginformevent
                );
              }}
              passref={e => (this.loginformref = e)}
              style={{
                left: this.loginleftsetter(),
                width: this.loginwidthsetter(),
                display: this.state.loginformstate
              }}
            ></Login>
            {this.props.currentuser.username === undefined ||
            this.props.currentuser.username === null ? (
              <div
                style={{
                  marginRight: "5%",
                  width: "25%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div
                  ref={q => this.aaa(q)}
                  style={{
                    position: "absolute",
                    zIndex: 102,
                    right: "0px",
                    width: this.state.hamburgerwidth + "%",
                    height: this.state.hamburgerheight + "%",
                    top: this.state.hamburgertop + "%"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      zIndex: 100,
                      background: "white"
                    }}
                  >
                    <div
                      onClick={e => this.hamburgerclick(e)}
                      style={{
                        zIndex: 1,
                        position: "relative",
                        background: "white"
                      }}
                    >
                      <img
                        ref={a => (this.hambimgref = a)}
                        src={hamburger}
                        style={{
                          width: `${
                            this.state.hamburgerimagewidth
                              ? this.state.hamburgerimagewidth
                              : null
                          }+px`
                        }}
                      ></img>
                    </div>
                    <div
                      onClick={this.loginclick}
                      className="hamburgeritems"
                      style={{
                        zIndex: -1,
                        top: this.state.logintop + "%"
                      }}
                    >
                      {this.state.hamburgerwidth < 100 ? "" : "Log in"}
                    </div>
                    <div
                      onClick={() => {
                        this.props.history.push("register");
                      }}
                      className="hamburgeritems"
                      style={{
                        zIndex: -2,
                        top: this.state.registertop + "%"
                      }}
                    >
                      {this.state.hamburgerwidth < 100 ? "" : "Register"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginRight: "5%",
                  width: window.innerWidth > 500 ? "30%" : "60%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div
                  ref={q => this.aaa(q)}
                  style={{
                    position: "absolute",
                    zIndex: 102,
                    right: "0px",
                    width: this.state.hamburgerwidth + "%",
                    height: this.state.hamburgerheight + "%",
                    top: this.state.hamburgertop + "%"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      zIndex: 100,
                      background: "white"
                    }}
                  >
                    <div
                      onClick={e => this.hamburgerclick(e)}
                      style={{
                        zIndex: 1,
                        position: "relative",
                        background: "white"
                      }}
                    >
                      <img
                        ref={a => (this.hambimgref = a)}
                        src={hamburger}
                        style={{
                          width: `${
                            this.state.hamburgerimagewidth
                              ? this.state.hamburgerimagewidth
                              : null
                          }+px`
                        }}
                      ></img>
                    </div>
                    <div
                      onClick={this.props.logout}
                      className="hamburgeritems"
                      style={{
                        zIndex: -1,
                        top: this.state.logintop + "%"
                      }}
                    >
                      {this.state.hamburgerwidth < 100 ? "" : "Log Out"}
                    </div>
                    <div
                      onClick={() => {
                        this.props.history.push("categories");
                      }}
                      className="hamburgeritems"
                      style={{
                        zIndex: -2,
                        top: this.state.registertop + "%"
                      }}
                    >
                      {this.state.hamburgerwidth < 100 ? "" : "Categories"}
                    </div>
                    <div
                      style={{
                        zIndex: -2,
                        top: this.state.usertop + "%"
                      }}
                      className="hamburgeritems"
                    >
                      {this.state.hamburgerwidth < 100 ? (
                        ""
                      ) : (
                        <Addservice
                          historystate={this.state.history}
                          history={this.props.history}
                        ></Addservice>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => ({
  currentuser: state.setcurrentuser
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutuser()),
  loginerror: () => dispatch(loginerror(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
