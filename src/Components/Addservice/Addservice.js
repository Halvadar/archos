import React, { Component } from "react";
import { connect } from "react-redux";
import "./Addservice.css";
import dropdown from "./drop-down-arrow.svg";
import { NavLink } from "react-router-dom";
class Addservice extends Component {
  constructor() {
    super();
    this.state = {
      refheight: 0,
      animation: 0,
      animationmotionstate: "shrinking",
      history: "/",
    };
    this.interval = undefined;
  }
  componentDidUpdate() {}
  closemanagefunc = (e) => {
    if (
      this.managecontref &&
      (e.clientX < this.managecontref.getBoundingClientRect().left ||
        e.clientX > this.managecontref.getBoundingClientRect().right ||
        e.clientY < this.managecontref.getBoundingClientRect().top ||
        e.clientY > this.managecontref.getBoundingClientRect().bottom)
    ) {
      this.setState({ animationmotionstate: "shrinking", animation: 0 });
      clearInterval(this.interval);
      window.removeEventListener("mousedown", this.closemanagefunc);
    }
  };
  componentDidMount() {
    this.setState({
      refheight: window
        .getComputedStyle(this.listitemref)
        .getPropertyValue("height"),
    });
  }
  componentDidUpdate() {}
  dropdownanimation = () => {
    clearInterval(this.interval);
    if (this.state.animationmotionstate === "shrinking") {
      this.setState({ animationmotionstate: "expanding" });
      if (this.state.animation < 100) {
        let i = this.state.animation;
        this.interval = setInterval(() => {
          if (this.state.animation < 100) {
            i++;
            this.setState({ animation: i });
          } else {
            window.addEventListener("mousedown", this.closemanagefunc);
            clearInterval(this.interval);
          }
        }, 5);
      }
    } else {
      this.setState({ animationmotionstate: "shrinking" });
      window.removeEventListener("mousedown", this.closemanagefunc);
      if (this.state.animation > 0) {
        let i = this.state.animation;
        this.interval = setInterval(() => {
          if (this.state.animation > 0) {
            i = i - 1;
            this.setState({ animation: i });
          } else {
            clearInterval(this.interval);
          }
        }, 5);
      }
    }
  };

  render() {
    return (
      <div
        style={{
          width: window.innerWidth > 768 ? null : "100%",
          zIndex: this.state.animation > 0 ? "201" : 0,
        }}
        className="loggedinusercont loggedinusercontmd"
      >
        <div
          ref={(a) => (this.manageref = a)}
          style={{ height: "100%" }}
          className="loggedinuserrelative"
        >
          <div
            ref={(a) => (this.managecontref = a)}
            style={{
              position: "absolute",
              width: "100%",
              top: 0,
              zIndex: -100,
              height:
                this.state.refheight &&
                this.state.refheight.slice(0, this.state.refheight.length - 2) *
                  4 +
                  "px",
            }}
          ></div>
          <div onClick={this.dropdownanimation} className="currentusername">
            {window.innerWidth <= 768 ? (
              <div
                style={{
                  width: "90%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {this.props.currentuser.username}
              </div>
            ) : (
              this.props.currentuser.username
            )}

            <img width="10px" src={dropdown}></img>
          </div>
          <div
            onClick={() => this.props.history.push("/postservice")}
            style={{
              top: this.state.animation + "%",
              background:
                this.props.historystate === "/postservice"
                  ? "rgb(54, 158, 255)"
                  : "rgb(54, 232, 255)",
            }}
            className="loggedinuserlistitem"
          >
            <span className="loggedinuserlistitemtext">Post a Service</span>
          </div>

          <div
            style={{
              top: this.state.animation * 2 + "%",
              background:
                this.props.historystate === "/postedservices"
                  ? "rgb(54, 158, 255)"
                  : "rgb(54, 232, 255)",
            }}
            ref={(a) => (this.listitemref = a)}
            className="loggedinuserlistitem"
            onClick={() => this.props.history.push("/postedservices")}
          >
            <span className="loggedinuserlistitemtext"> Posted Services</span>
          </div>
          <div
            onClick={() => this.props.history.push("/manageaccount")}
            style={{
              top: this.state.animation * 3 + "%",
              background:
                this.props.historystate === "/manageaccount"
                  ? "rgb(54, 158, 255)"
                  : "rgb(54, 232, 255)",
            }}
            className="loggedinuserlistitem"
          >
            <span className="loggedinuserlistitemtext">Manage Account</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.setcurrentuser,
});

export default connect(mapStateToProps)(Addservice);
