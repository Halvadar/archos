import React, { Component } from "react";
import "./Searchboxanimation.css";
import searchicon from "./searchicon.svg";
import { connect } from "react-redux";
import { changescreensize } from "../../../../../Actions/Actions";
class Searchboxanimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationstate: undefined,
      searchboxbottomdistance: 0,
      searchboxwidth: 0,
      searchinputborder: null,
      searchboxposition: "absolute"
    };
    this.searchbox = React.createRef(this.searchbox);
  }
  componentDidMount() {
    this.props.changescreensize(window.innerWidth);
    this.searchboxanimation();
    window.addEventListener("resize", this.resizewidthsetter);
    /* window.addEventListener("scroll", this.searchboxposition); */
    console.log(
      window.getComputedStyle(this.searchbox).getPropertyValue("offsettop")
    );
  }
  componentDidUpdate() {}

  searchboxposition = () => {
    console.log(window.getComputedStyle(this.searchbox));
    if (
      window.getComputedStyle(this.searchbox).getPropertyValue("offsetTop") > 10
    ) {
      this.setState({ searchboxposition: "absolute" });
    } else {
      this.setState({ searchboxposition: "sticky" });
    }
  };

  searchboxanimation = async () => {
    await this.bottomupanimation();
    await this.searchboxstretchanimation();
    this.setState({
      searchinputborder: "1px solid rgb(200,200,200)",
      animationstate: "done"
    });
  };

  resizefunc = (
    screensizes = [500, 768, 1024, 1366, 1920],
    widths = [40, 35, 25, 20, 15, 10],
    screensize = this.props.screensize
  ) => {
    for (const element of screensizes) {
      if (screensize < element) {
        return this.setState({
          searchboxwidth: widths[screensizes.indexOf(element)]
        });
      } else if (screensize >= 1920) {
        this.setState({ searchboxwidth: 10 });
      }
    }
  };

  resizewidthsetter = () => {
    if (this.state.animationstate === "done") {
      this.resizefunc();
    }
  };

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
        if (searchboxstyle("top") - searchboxstyle("bottom") >= 1) {
          searchboxbottomdistance++;
          this.setState({ searchboxbottomdistance: searchboxbottomdistance });
        } else {
          this.setState({ animationstate: "liftended" });
          clearInterval(bottomupinterval);
          resolve();
        }
      }, 10);
    });
  };

  searchboxstretchanimation = () => {
    return new Promise((resolve, reject) => {
      let width = this.state.searchboxwidth;
      if (this.state.animationstate === "liftended") {
        let interval = setInterval(() => {
          if (this.props.screensize < 500 && this.state.searchboxwidth <= 40) {
            width = width + 0.7;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 768 &&
            this.state.searchboxwidth <= 35
          ) {
            width = width + 0.7;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1024 &&
            this.state.searchboxwidth <= 25
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1366 &&
            this.state.searchboxwidth <= 20
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1920 &&
            this.state.searchboxwidth <= 15
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (this.props.screensize >= 1920 && this.state.width <= 10) {
            width = width + 0;
            this.setState({ searchboxwidth: width });
          } else {
            this.setState({ animationstate: "stretchended" });
            clearInterval(interval);
            resolve();
          }
        }, 10);
      } else {
        reject();
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            bottom: this.state.searchboxbottomdistance + "%",
            width: this.state.searchboxwidth + "%",
            position: this.state.searchboxposition
          }}
          className="searchbox"
          ref={a => (this.searchbox = a)}
        >
          <input
            className="searchboxinput"
            type="text"
            style={{ border: this.state.searchinputborder }}
          />

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

const mapStateToProps = state => ({
  screensize: state.screen.screensize,
  scroll: state.screen.scroll
});
const mapDispatchToProps = dispatch => ({
  changescreensize: e => dispatch(changescreensize(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchboxanimation);
