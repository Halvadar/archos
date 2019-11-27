import React, { Component } from "react";
import { connect } from "react-redux";
import "./Addservice.css";
import dropdown from "./drop-down-arrow.svg";

class Addservice extends Component {
  constructor() {
    super();
    this.state = {
      animation: 0,
      animationmotionstate: "shrinking"
    };
    this.interval = undefined;
  }

  componentDidMount() {
    this.setState({
      refheight: window
        .getComputedStyle(this.listitemref)
        .getPropertyValue("height")
    });
  }
  dropdownanimation = () => {
    console.log("passed");

    console.log("passed1");
    clearInterval(this.interval);
    if (this.state.animationmotionstate === "shrinking") {
      console.log("passed1");
      this.setState({ animationmotionstate: "expanding" });
      if (this.state.animation < 100) {
        console.log("passed");
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
      <div className="loggedinusercont">
        <div style={{ height: "100%" }} className="loggedinuserrelative">
          <div onClick={this.dropdownanimation} className="currentusername">
            {this.props.currentuser.username}
            <img width="10px" src={dropdown}></img>
          </div>
          <div
            style={{ top: this.state.animation + "%" }}
            className="loggedinuserlistitem"
          >
            {" "}
            Post a Service
          </div>
          <div
            style={{ top: this.state.animation * 2 + "%" }}
            ref={a => (this.listitemref = a)}
            className="loggedinuserlistitem"
          >
            {" "}
            Posted Services
          </div>
          <div
            style={{ top: this.state.animation * 3 + "%" }}
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
