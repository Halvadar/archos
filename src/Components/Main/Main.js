import React, { Component } from "react";
import Navbar from "./Header/Navbar/Navbar";
import Sandbox from "./Sandbox";
import Headerbackground from "./Header/Headerbackground/Headerbackground";
import { connect } from "react-redux";
import { changescreensize } from "../../Actions/Actions";
import Categories from "./Header/Categories/Categories";
import { scroll } from "../../Actions/Actions";
import Jumbotron from "./Body/Jumbotron/Jumbotron";
import Cards from "./Body/Cards/Cards";
import Footer from "./Footer/Footer";

class Main extends Component {
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
      <React.Fragment>
        <Navbar refref={q => (this.burgerref = q)} click1 />
        {/* <Sandbox></Sandbox> */}
        <Headerbackground />
        <Categories />
        <Jumbotron />
        <Cards />
        <Footer />
      </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
