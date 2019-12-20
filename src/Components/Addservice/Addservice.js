import React, { Component } from "react";
import { connect } from "react-redux";
import "./Addservice.css";
import dropdown from "./drop-down-arrow.svg";
import { NavLink } from "react-router-dom";
class Addservice extends Component {
  constructor() {
    super();
    this.state = {
      animation: 0,
      animationmotionstate: "shrinking",
      history: "/"
    };
    this.interval = undefined;
  }
  componentDidUpdate() {}

  componentDidMount() {
    console.log(this.props.history);
    this.setState({
      refheight: window
        .getComputedStyle(this.listitemref)
        .getPropertyValue("height")
    });
  }
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
            clearInterval(this.interval);
          }
        }, 5);
      }
    } else {
      this.setState({ animationmotionstate: "shrinking" });
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
          width: window.innerWidth > 768 ? null : "100%"
        }}
        className="loggedinusercont loggedinusercontmd"
      >
        <div style={{ height: "100%" }} className="loggedinuserrelative">
          <div onClick={this.dropdownanimation} className="currentusername">
            {window.innerWidth <= 768 ? (
              <div
                style={{
                  width: "90%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
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
                  : "rgb(54, 232, 255)"
            }}
            className="loggedinuserlistitem"
          >
            Post a Service
          </div>

          <div
            style={{
              top: this.state.animation * 2 + "%",
              background:
                this.props.historystate === "/postedservices"
                  ? "rgb(54, 158, 255)"
                  : "rgb(54, 232, 255)"
            }}
            ref={a => (this.listitemref = a)}
            className="loggedinuserlistitem"
            onClick={() => this.props.history.push("/postedservices")}
          >
            {" "}
            Posted Services
          </div>
          <div
            onClick={() => this.props.history.push("/manageaccount")}
            style={{
              top: this.state.animation * 3 + "%",
              background:
                this.props.historystate === "/manageaccount"
                  ? "rgb(54, 158, 255)"
                  : "rgb(54, 232, 255)"
            }}
            className="loggedinuserlistitem"
          >
            Manage Account
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentuser: state.setcurrentuser
});

export default connect(mapStateToProps)(Addservice);
