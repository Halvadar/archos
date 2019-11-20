import React, { Component } from "react";
import "./Register.css";
import facebook from "../../Main/Footer/facebook.svg";
import gmail from "../../Main/Footer/gmail.svg";
import Facebookform from "./Facebookform";
import Gmailform from "./Gmailform";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      activecategory: [1, 0, 0],
      swipestate: [0]
    };
  }
  componentDidUpdate() {
    console.log(this.state.activecategory);
  }

  activecategorysetter = e => {
    return () => {
      this.setState(prevState => {
        prevState.activecategory = [0, 0, 0];
        prevState.activecategory[e] = 1;
        return { activecategory: prevState.activecategory };
      });
    };
  };

  swipeanimation = e => {};
  render() {
    return (
      <React.Fragment>
        <div className="registercont registercontsm registercontmd registercontxl registercontxxl">
          <div className="registerby">Register By</div>
          <div
            style={{
              width: "50%",
              height: "2px",
              background: "gray",
              marginBottom: "2rem"
            }}
          ></div>
          <div className="registerpagecategories">
            {["Facebook", "Google", "Website"].map((i, e) => {
              return (
                <div
                  className="registerpagecategory"
                  onClick={this.activecategorysetter(e)}
                  style={{
                    background:
                      this.state.activecategory[e] &&
                      "linear-gradient(90deg, rgb(195, 221, 252), rgb(15, 122, 245))",
                    color: this.state.activecategory[e]
                      ? "rgb(222, 232, 253)"
                      : null
                  }}
                >
                  {(() => {
                    if (e === 0) {
                      return (
                        <img
                          src={facebook}
                          width="30px"
                          style={{ paddingRight: "5px" }}
                        />
                      );
                    } else if (e === 1) {
                      return (
                        <img
                          src={gmail}
                          width="30px"
                          style={{ paddingRight: "5px" }}
                        />
                      );
                    }
                  })()}
                  {i}
                </div>
              );
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "gray"
            }}
          ></div>
          {(() => {
            if (this.state.activecategory[0] === 1) {
              return <Facebookform></Facebookform>;
            } else if (this.state.activecategory[1] === 1) {
              return <Gmailform></Gmailform>;
            }
          })()}
        </div>
      </React.Fragment>
    );
  }
}
