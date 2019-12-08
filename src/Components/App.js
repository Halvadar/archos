import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Main/Header/Navbar/Navbar";
import Sandbox from "./Main/Sandbox";
import Headerbackground from "./Main/Header/Headerbackground/Headerbackground";
import { connect } from "react-redux";
import { changescreensize, checklogin } from "../Actions/Actions";
import Categories from "./Main/Header/Categories/Categories";
import { scroll } from "../Actions/Actions";
import Jumbotron from "./Main/Body/Jumbotron/Jumbotron";
import Cards from "./Main/Body/Cards/Cards";
import Footer from "./Main/Footer/Footer";
import Categoriespage from "./Categories/Categoriespage";
import Register from "./Authenticate/Register/Register";
import Postservice from "./Addservice/Postservice/Postservice";
import Postedservices from "./Addservice/Postedservices/Postedservices";
import Manageaccount from "./Manageaccount/Manageaccount";
import Categoriespagecard from "./Categories/Categoriespagecard/Categoriespagecard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.burgerref = React.createRef(this.burgerref);
  }
  componentDidUpdate() {}
  componentDidMount() {
    this.props.checklogin();
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
      <Router>
        <React.Fragment>
          <Route
            render={props => (
              <Navbar {...props} refref={q => (this.burgerref = q)} click1 />
            )}
          ></Route>

          <Switch>
            <Route
              path="/cardinfo/:id"
              render={props => (
                <Categoriespagecard {...props}></Categoriespagecard>
              )}
            ></Route>
            <Route
              path="/manageaccount"
              render={props => <Manageaccount {...props}></Manageaccount>}
            ></Route>
            <Route
              path="/postedservices"
              render={props => <Postedservices {...props}></Postedservices>}
            ></Route>
            <Route
              path="/postservice"
              render={props => <Postservice {...props}></Postservice>}
            ></Route>
            <Route
              path="/categories"
              render={props => <Categoriespage {...props}></Categoriespage>}
            />
            <Route path="/register" render={props => <Register />}></Route>

            <Route
              path="/"
              render={props => (
                <React.Fragment>
                  <Headerbackground {...props} />
                  <Categories {...props} />
                  <Jumbotron />
                  <Cards />
                </React.Fragment>
              )}
            ></Route>
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
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
  },
  checklogin: e => dispatch(checklogin())
});
const mapStateToProps = state => ({
  screensize: state,
  currentuser: state.setcurrentuser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
