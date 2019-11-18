import React, { Component } from "react";
import "./Categoriespagefilters.css";
import dropdown from "../Categoriespagecategories/dropdown.svg";
import searchicon from "./search.svg";

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
  searchboxwidthsetter = () => {
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
      return "40%";
    }
    return "200px";
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
        <div
          className="categoriespagesearchbox"
          style={{ width: this.searchboxwidthsetter() }}
        >
          <div className="categoriespagesearchboxinputcont">
            <input className="categoriespagesearchboxinput" type="text"></input>
          </div>
          <div className="categoriespagesearchboxbutton">
            <img src={searchicon} width="75%"></img>
          </div>
        </div>
      </div>
    );
  }
}
