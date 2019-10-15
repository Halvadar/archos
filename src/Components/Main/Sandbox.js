import React, { Component } from "react";

export default class Sandbox extends Component {
  constructor() {
    super();

    this.state = {};
    this.a = React.createRef(this.s);
  }
  componentDidUpdate() {
    console.log(window.getComputedStyle(this.a).getPropertyValue("top"));
  }

  componentDidMount() {
    /* console.log(window.getComputedStyle(this.a).getPropertyValue("top"));
    var a = 0;
    var abc = setInterval(() => {
      a++;
      if (a < 100) {
        console.log(window.getComputedStyle(this.a).getPropertyValue("top"));
      } else {
        clearInterval(abc);
      }
    }, 1);
    console.log("asd"); */
  }

  render() {
    return (
      <div
        style={{
          background: "red",
          height: "400px",
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 1rem"
        }}
      >
        <div
          ref={a => (this.a = a)}
          style={{
            position: "absolute",
            background: "blue"
          }}
        >
          <div style={{ width: "50px", height: "50px" }}></div>
        </div>
      </div>
    );
  }
}
