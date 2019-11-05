import React, { Component } from "react";

export default class Sandbox extends Component {
  render() {
    return (
      <div
        style={{
          background: "blue",
          height: "100px",
          width: "500px"
        }}
      >
        <div style={{ height: "50%", width: "100%" }}></div>
        <div style={{ width: "100%", height: "80px" }}></div>
      </div>
    );
  }
}
