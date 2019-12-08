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

    this.backgroundref = React.createRef();
  }

  componentDidMount() {
    this.backgroundheightsetter();
  }

  backgroundheightsetter = () => {
    this.setState({
      backgroundheight: window
        .getComputedStyle(this.backgroundref.current)
        .getPropertyValue("height")
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          ref={this.backgroundref}
          className="mainheaderbackgrounddiv"
          style={{
            backgroundImage: `url(${background})`
          }}
        >
          <Searchboxanimation
            history={this.props.history}
            backgroundheight={this.state.backgroundheight}
          ></Searchboxanimation>
        </div>
      </React.Fragment>
    );
  }
}
