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
      hamburgerheight: "auto",
      hamburgerwidth: "auto",
      hamburgertop: null
    };
    this.hamburgerref = React.createRef(this.hamburgerref);
    this.r = React.createRef(this.r);
  }

  aaa = q => {
    this.hamburgerref = q;
    this.props.refref(q);
  };
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentDidMount() {
    console.log(
      window.getComputedStyle(this.hamburgerref).getPropertyValue("top")
    );

    /* var a = 0;
    var abc = setInterval(() => {
      a++;
      if (a < 100) {
        console.log(
          window.getComputedStyle(this.hamburgerref).getPropertyValue("top")
        );
      } else {
        clearInterval(abc);
      }
    }, 1); */
  }

  onMouseEnterFunc = arg => {
    console.log();
    if (arg === 0) {
      this.setState({ loginOnMouseEnter: true });
      console.log(this.state.loginOnMouseEnter);
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
    console.log(this.state.loginAnimation);
    var bot = 0;
    var interval = setInterval(() => {
      if (bot < 10 && this.state.loginOnMouseEnter === true) {
        bot++;
        this.setState({ loginAnimation: bot });
        console.log(this.state.loginOnMouseEnter);
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
    console.log(this.state.registerAnimation);
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

  hamburgerclick = () => {
    console.log(
      window.getComputedStyle(this.hamburgerref).getPropertyValue("top")
    );
    this.setState({ hamburgerheight: 100, hamburgerwidth: 20 }, () => {
      console.log(
        window.getComputedStyle(this.hamburgerref).getPropertyValue("top")
      );
    });
    console.log(
      window.getComputedStyle(this.hamburgerref).getPropertyValue("top")
    );
  };

  style = () => {
    console.log("asd");
    return this.state.hamburgerwidth;
  };

  render() {
    if (window.innerWidth >= 768) {
      return (
        <div style={{}} className="navbar justify-content-between custnavbar">
          <img src={logo} alt="Archos" className=" mt-2 img-l img-sm img-md" />

          <div className="row links">
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
        <div
          style={{ display: "flex", position: "relative" }}
          className=" d-flex custnavbar justify-content-between "
        >
          <div className=" mt-2 img-l img-sm img-md">
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
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}
            className=""
          >
            <div
              ref={q => this.aaa(q)}
              style={{
                position: "absolute",
                right: "5%",
                width: this.state.hamburgerwidth,
                height: this.state.hamburgerheight
              }}
            >
              <div onClick={this.hamburgerclick} style={{}}>
                <div>
                  <img src={hamburger} width="100%"></img>
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
