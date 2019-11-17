import React, { Component } from "react";
import "./Categoriespagefilters.css";
import dropdown from "../Categoriespagecategories/dropdown.svg";

export default class Categoriespagefilters extends Component {
  constructor() {
    super();
    this.state = {
      animationstate: "not going",
      animationtopdistance: 0
    };
  }
  animation = () => {
    if (this.state.animationstate === "not going") {
      var i = this.state.animationtopdistance;
      this.setState({ animationstate: "going" });
      if (i === 0) {
        var newinterval = setInterval(() => {
          if (i < 100) {
            i++;
            this.setState({ animationtopdistance: i });
          } else {
            clearInterval(newinterval);
            this.setState({ animationstate: "not going" });
          }
        }, 10);
      } else if (i === 100) {
        var newinterval = setInterval(() => {
          if (i > 0) {
            i = i - 1;
            this.setState({
              animationtopdistance: i
            });
          } else {
            clearInterval(newinterval);
            this.setState({ animationstate: "not going" });
          }
        }, 10);
      }
      if (i < 100) {
      }
    }
  };
  render() {
    return (
      <div className="categoriespagefilters categoriespagefiltersmd  categoriespagefilterslg categoriespagefiltersxl">
        <div onClick={this.animation} className="sortbyrating">
          <div className="rating">
            Sort By
            <div>
              <img src={dropdown} width="10px"></img>
            </div>
          </div>
          <div
            className="sortbydropdown"
            style={{
              top: this.state.animationtopdistance * 1 + "%",
              zIndex: -1
            }}
          >
            {" "}
            Rating{" "}
          </div>
          <div
            className="sortbydropdown"
            style={{
              zIndex: -2,
              top: this.state.animationtopdistance * 2 + "%"
            }}
          >
            {" "}
            Alphabet A-Z
          </div>
          <div
            className="sortbydropdown"
            style={{
              top: this.state.animationtopdistance * 3 + "%",
              zIndex: -3
            }}
          >
            {" "}
            Alphabet Z-A
          </div>
        </div>
        <div className="categoriespagesearchbox">
          <div className="categoriespagesearchboxinput"></div>
          <div className="categoriespagesearchboxbutton"></div>
        </div>
      </div>
    );
  }
}
