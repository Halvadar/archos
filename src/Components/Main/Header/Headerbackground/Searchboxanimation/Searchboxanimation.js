import React, { Component } from "react";
import "./Searchboxanimation.css";
import searchicon from "./searchicon.svg";
import { connect } from "react-redux";
import { changescreensize, fetchcards } from "../../../../../Actions/Actions";
import { services } from "../../../../Categories/Categoriespagecategories/Categoriespagecategories";

class Searchboxanimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputheight: 0,
      inputdone: false,
      mounted: true,
      animationstate: undefined,
      searchboxbottomdistance: 0,
      searchboxwidth: 0,
      searchinputborder: null,
      searchboxposition: "absolute",
      searchboxfromtop: undefined,
      fixedsearchboxfromtop: undefined,
      matchedvalues: [],
      firstsuggestedvalue: null
    };
    this.searchbox = React.createRef();
    this.bottomupinterval = undefined;
    this.interval = undefined;
  }
  componentDidMount() {
    this.props.changescreensize(window.innerWidth);
    this.searchboxanimation();
    this.searchboxtopinit();
    window.addEventListener("resize", this.resizewidthsetter);
    window.addEventListener("scroll", this.searchboxfixed);
  }

  componentWillUnmount() {
    this.setState({ mount: false });
    this.interval = undefined;
    this.bottomupinterval = undefined;
    window.removeEventListener("resize", this.resizewidthsetter);
    window.removeEventListener("scroll", this.searchboxfixed);
  }
  searchboxtopinit = () => {
    this.setState({
      searchboxfromtop:
        this.searchbox.offsetTop + this.searchbox.parentNode.offsetTop
    });
  };

  searchboxanimation = async () => {
    if (this.state.mounted) {
      await this.bottomupanimation();
    }
    if (this.state.mounted) {
      await this.searchboxstretchanimation();
    }
    if (this.state.mounted) {
      this.setState({
        searchinputborder: "1px solid rgb(200,200,200)",
        animationstate: "done",
        searchboxfromtop:
          this.searchbox.offsetTop + this.searchbox.parentNode.offsetTop
      });
    }
    if (this.state.mounted) {
      this.setState({
        inputheight: window
          .getComputedStyle(this.searchbox)
          .getPropertyValue("height")
      });
    }
  };

  searchboxfixed = () => {
    if (this.state.animationstate === "done") {
      console.log(this.state.searchboxfromtop - window.scrollY);
      if (this.state.searchboxfromtop - window.scrollY <= 10) {
        this.setState({
          searchboxposition: "fixed",
          fixedsearchboxfromtop: 10
        });
      } else {
        this.setState({ searchboxposition: "absolute" });
      }
    }
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
      this.bottomupinterval = setInterval(() => {
        if (searchboxstyle("top") - searchboxstyle("bottom") >= 1) {
          searchboxbottomdistance++;
          this.setState({ searchboxbottomdistance: searchboxbottomdistance });
        } else {
          this.setState({ animationstate: "liftended" });
          clearInterval(this.bottomupinterval);
          resolve();
        }
      }, 10);
    });
  };

  searchboxstretchanimation = () => {
    return new Promise((resolve, reject) => {
      let width = this.state.searchboxwidth;
      if (this.state.animationstate === "liftended") {
        this.interval = setInterval(() => {
          if (this.props.screensize < 500 && this.state.searchboxwidth <= 50) {
            width = width + 0.7;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 768 &&
            this.state.searchboxwidth <= 40
          ) {
            width = width + 0.7;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1024 &&
            this.state.searchboxwidth <= 35
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1366 &&
            this.state.searchboxwidth <= 30
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize < 1920 &&
            this.state.searchboxwidth <= 25
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else if (
            this.props.screensize >= 1920 &&
            this.state.searchboxwidth <= 20
          ) {
            width = width + 0.2;
            this.setState({ searchboxwidth: width });
          } else {
            this.setState({ animationstate: "stretchended" });
            clearInterval(this.interval);
            resolve();
          }
        }, 10);
      } else {
        reject();
      }
    });
  };
  searchboxdistance = () => {
    return this.state.searchboxposition === "absolute"
      ? { bottom: this.state.searchboxbottomdistance + "%" }
      : { top: this.state.fixedsearchboxfromtop + "px" };
  };

  inputonchange = e => {
    let matchedvalues = [];
    let input = this.inputref.value;
    input.length > 0
      ? this.setState({ inputdone: true })
      : this.setState({ inputdone: false });
    services.forEach(value => {
      if (value.name.toLowerCase().includes(input)) {
        matchedvalues.push({ name: value.name, type: "cat" });
      }
      if (value.children.length > 0) {
        value.children.forEach(child => {
          if (child.toLowerCase().includes(input)) {
            matchedvalues.push({ name: child, type: "subcat" });
          }
        });
      }
    });
    this.setState({ matchedvalues: matchedvalues });
    matchedvalues.length > 0
      ? this.setState({ firstsuggestedvalue: matchedvalues[0].name })
      : this.setState({ firstsuggestedvalue: null });
  };

  getcardsevent = e => {
    return () => {
      this.props.history.push("/categories");
      this.props.getcards(e);
    };
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            width: this.state.searchboxwidth + "%",
            position: this.state.searchboxposition,
            bottom:
              this.state.searchboxposition === "absolute"
                ? this.state.searchboxbottomdistance + "%"
                : "",
            top:
              this.state.searchboxposition === "fixed"
                ? this.state.fixedsearchboxfromtop + "px"
                : ""
          }}
          className="searchbox"
          ref={a => (this.searchbox = a)}
        >
          <div
            style={{
              display: this.state.inputdone ? "initial" : "none",
              top: this.state.inputheight
            }}
            className="searchboxsuggestions"
          >
            {this.state.matchedvalues.length > 0 ? (
              this.state.matchedvalues.map(item => {
                return (
                  <div
                    className="searchsuggestionsitem"
                    onClick={
                      item.type === "cat"
                        ? this.getcardsevent({ category: item.name })
                        : this.getcardsevent({ subcategory: item.name })
                    }
                  >
                    {item.name}
                  </div>
                );
              })
            ) : (
              <div
                className="searchsuggestionsitem"
                style={{ color: "rgb(255, 125, 125)", borderBottom: 0 }}
              >
                {" "}
                No Result found{" "}
              </div>
            )}
          </div>
          <div className="searchboxinputcont">
            <input
              onChange={this.inputonchange}
              ref={a => (this.inputref = a)}
              className="searchboxinput"
              type="text"
              style={{ border: this.state.searchinputborder }}
            />
            <div className="inputsuggest">
              {" "}
              {this.state.firstsuggestedvalue && this.state.firstsuggestedvalue}
            </div>
          </div>

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
  changescreensize: e => dispatch(changescreensize(e)),
  getcards: e => dispatch(fetchcards(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchboxanimation);
