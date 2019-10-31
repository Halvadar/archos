import React, { Component } from "react";

import Navbar from "./Header/Navbar/Navbar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import click from "../../Reducers/rootReducer";
import Sandbox from "./Sandbox";
import Headerbackground from "./Header/Headerbackground/Headerbackground";

const store = createStore(click);

class Main extends Component {
  constructor() {
    super();
    this.state = {};
    this.burgerref = React.createRef(this.burgerref);
  }
  componentDidUpdate() {
    console.log(
      window.getComputedStyle(this.burgerref).getPropertyValue("top")
    );
  }

  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <Navbar refref={q => (this.burgerref = q)} click1 />
        {/* <Sandbox></Sandbox> */}
        <Headerbackground></Headerbackground>
      </Provider>
    );
  }
}

export default Main;
