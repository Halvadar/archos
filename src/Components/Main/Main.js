import React, { Component } from "react";
import Navbar from "./Header/Navbar/Navbar";
import Sandbox from "./Sandbox";
import Headerbackground from "./Header/Headerbackground/Headerbackground";
import { connect } from "react-redux";
import { changescreensize } from "../../Actions/Actions";
import Categories from "./Header/Categories/Categories";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.burgerref = React.createRef(this.burgerref);
  }
  componentDidUpdate() {
    console.log(this.props.screensize);
  }
  componentDidMount() {
    window.addEventListener(
      "resize",
      this.props.changescreensize(this.windowwidth)
    );
  }

  windowwidth = () => {
    return window.innerWidth;
  };

  render() {
    return (
      <React.Fragment>
        <Navbar refref={q => (this.burgerref = q)} click1 />
        {/* <Sandbox></Sandbox> */}
        <Headerbackground />
        <Categories />
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
  }
});
const mapStateToProps = state => ({
  screensize: state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
