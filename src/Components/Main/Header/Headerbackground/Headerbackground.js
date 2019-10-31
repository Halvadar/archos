import React, { Component } from "react";
import background from "./background.jpg";
import "./Headerbackground.css";
import Searchboxanimation from "./Searchboxanimation/Searchboxanimation";

export default class Headerbackground extends Component {
  constructor() {
    super();
    this.state = {
      backgroundheight: undefined
    };

    this.backgroundref = React.createRef(this.backgroundref);
  }

  componentDidMount() {
    this.backgroundheightsetter();
  }

  backgroundheightsetter = () => {
    this.setState({
      backgroundheight: window
        .getComputedStyle(this.backgroundref)
        .getPropertyValue("height")
    });
  };

  render() {
    return (
      <div
        ref={q => (this.backgroundref = q)}
        className="mainheaderbackgrounddiv"
        style={{
          backgroundImage: `url(${background})`
        }}
      >
        <Searchboxanimation
          backgroundheight={this.state.backgroundheight}
        ></Searchboxanimation>
      </div>
    );
  }
}
