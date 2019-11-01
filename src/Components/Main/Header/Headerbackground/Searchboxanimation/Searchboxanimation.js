import React, { Component } from "react";
import "./Searchboxanimation.css";
import searchicon from "./searchicon.svg";
import { timingSafeEqual } from "crypto";

export default class Searchboxanimation extends Component {
  constructor() {
    super();
    this.state = {
      animationstate: undefined,
      searchboxbottomdistance: 0
    };
    this.searchbox = React.createRef(this.searchbox);
  }
  componentDidMount() {
    this.bottomupanimation();
  }

  bottomupanimation = () => {
    const searchboxstyle = arg =>
      window
        .getComputedStyle(this.searchbox)
        .getPropertyValue(arg)
        .slice(
          0,
          window.getComputedStyle(this.searchbox).getPropertyValue(arg).length -
            2
        );
    var searchboxbottomdistance = this.state.searchboxbottomdistance;
    return new Promise((resolve, reject) => {
      let bottomupinterval = setInterval(() => {
        console.log(searchboxstyle("bottom"));
        if (searchboxstyle("top") - searchboxstyle("bottom") >= 1) {
          console.log(searchboxbottomdistance);
          searchboxbottomdistance++;
          this.setState({ searchboxbottomdistance: searchboxbottomdistance });
        } else {
          clearInterval(bottomupinterval);
        }
      }, 100);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ bottom: this.state.searchboxbottomdistance + "%" }}
          className="searchbox"
          ref={a => (this.searchbox = a)}
        >
          <input className="searchboxinput" type="text" />
          <div className="searchbuttoncontainer">
            <div className="searchbutton">
              <img src={searchicon} alt="" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
