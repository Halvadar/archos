import React, { Component } from "react";
import "./Register.css";
import facebook from "../../Main/Footer/facebook.svg";
import gmail from "../../Main/Footer/gmail.svg";
import Facebookform from "./Facebookform";
import Gmailform from "./Gmailform";
import Archosform from "./Archosform";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      activecategory: [1, 0, 0],
      swipestate: 0,
      formheight: undefined,
      formwidth: undefined
    };
    this.newinterval = undefined;
  }
  componentDidUpdate() {
    console.log(this.state.activecategory, this.state.formheight);
  }
  componentDidMount() {
    console.log(this.formref);
    this.setState({
      formheight: this.formrefstylecalc("height"),
      formwidth: this.formrefstylecalc("width")
    });
  }
  formrefstylecalc = a => {
    return window.getComputedStyle(this.formref).getPropertyValue(a);
  };
  activecategorysetter = e => {
    return () => {
      this.swipeanimation(e);
      this.setState(prevState => {
        prevState.activecategory = [0, 0, 0];
        prevState.activecategory[e] = 1;
        return { activecategory: prevState.activecategory };
      });
    };
  };

  swipeanimation = e => {
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
      if (this.state.swipestate < -100) {
        this.newinterval = setInterval(() => {
          if (this.state.swipestate < -100) {
            swipestate = swipestate + 1;
            this.setState({ swipestate: swipestate });
          } else {
            clearInterval(this.newinterval);
          }
        }, 5);
      } else if (this.state.swipestate > -100) {
        this.newinterval = setInterval(() => {
          if (this.state.swipestate > -100) {
            swipestate = swipestate - 1;
            this.setState({ swipestate: swipestate });
          } else {
            clearInterval(this.newinterval);
          }
        }, 5);
      }
    } else if (e === 2) {
      if (this.state.swipestate > -200) {
        this.newinterval = setInterval(() => {
          if (this.state.swipestate > -200) {
            swipestate = swipestate - 1;
            this.setState({ swipestate: swipestate });
          } else {
            clearInterval(this.newinterval);
          }
        }, 5);
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="registercont registercontsm registercontmd registercontxl registercontxxl"
          ref={a => (this.a = a)}
        >
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
                  className="registerpagecategory registerpagecategorysm"
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
          <div
            style={{
              position: "relative",
              height: this.state.formheight,
              width: "100%",
              overflow: "hidden"
            }}
          >
            <Facebookform left={this.state.swipestate} />
            <Gmailform left={this.state.swipestate} />
            <Archosform
              passref={e => (this.formref = e)}
              left={this.state.swipestate}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
