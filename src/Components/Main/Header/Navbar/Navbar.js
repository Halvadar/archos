import React, { Component } from "react";
import logo from "./logo.svg";
import "./Navbar.css";
import { connect } from "react-redux";
import hamburger from "./hamburger.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOnMouseEnter: false,
      registerOnMouseEnter: false,
      loginAnimation: 0,
      registerAnimation: 0,
      hamburgerheight: 0,
      hamburgerwidth: 0,
      hamburgertop: 30,
      registertop: 0,
      logintop: 0,
      hamburgeranimationstatus: false,
      hamburgeranimationstate: "notexpanded",
      hamburgeranimationindex: 0,
      sm: null,
      hamburgerimagewidth: undefined
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
    } else {
      this.setState({ registerOnMouseEnter: true });
      this.onmouseenteranimation1();
    }
  };
  onMouseLeaveFunc = arg => {
    if (arg === 0) {
      this.setState({ loginOnMouseEnter: false });
    } else this.setState({ registerOnMouseEnter: false });
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

  render() {
    if (window.innerWidth >= 768 || this.state.sm === false) {
      return (
        <div style={{}} className="navbar justify-content-between custnavbar">
          <img src={logo} alt="Archos" className=" mt-2 img-l img-sm img-md" />

          <div className="row links rounded-left">
            <div
              className="custnavitemcont"
              onMouseEnter={() => this.onMouseEnterFunc(0)}
              onMouseLeave={() => this.onMouseLeaveFunc(0)}
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
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-100  custnavbar justify-content-between ">
          <div className=" mt-2 img-l img-sm img-md img-xl">
            <img
              ref={r => (this.r = r)}
              src={logo}
              alt="Archos"
              width="100%"
              onClick={this.hamburgerclick}
            />
          </div>
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
                  className="hamburgeritems"
                  style={{
                    zIndex: -1,
                    top: this.state.logintop + "%"
                  }}
                >
                  {this.state.hamburgerwidth < 100 ? "" : "Log in"}
                </div>
                <div
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
        </div>
      );
    }
  }
}

export default Navbar;
