import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "./Main/Header/Navbar/Navbar";
import Sandbox from "./Main/Sandbox";
import Headerbackground from "./Main/Header/Headerbackground/Headerbackground";
import { connect } from "react-redux";
import { changescreensize } from "../Actions/Actions";
import Categories from "./Main/Header/Categories/Categories";
import { scroll } from "../Actions/Actions";
import Jumbotron from "./Main/Body/Jumbotron/Jumbotron";
import Cards from "./Main/Body/Cards/Cards";
import Footer from "./Main/Footer/Footer";
import Categoriespage from "./Categories/Categoriespage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.burgerref = React.createRef(this.burgerref);
  }
  componentDidUpdate() {}
  componentDidMount() {
    window.addEventListener(
      "resize",
      this.props.changescreensize(this.windowwidth)
    );
    window.addEventListener("scroll", this.props.scrollprop(this.scroll));
  }

  windowwidth = () => {
    return window.innerWidth;
  };
  scroll = () => {
    return window.scrollY || window.pageYOffset || document.body.scrollTop;
  };

  render() {
    return (
      <div style={{ width: "100px", height: "100px", background: "red" }}></div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changescreensize: e => {
    console.log(e());
    return () => {
      console.log(e());
      dispatch(changescreensize(e()));
    };
  },
  scrollprop: e => {
    return () => {
      dispatch(scroll(e()));
    };
  }
});
const mapStateToProps = state => ({
  screensize: state
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
