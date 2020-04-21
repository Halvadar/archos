import React, { Component } from "react";
import "./Categoriespagefilters.css";
import dropdown from "../Categoriespagecategories/dropdown.svg";
import searchicon from "./search.svg";
import { connect } from "react-redux";
import { sortcards, filtercards, focuscards } from "../../../Actions/Actions";

class Categoriespagefilters extends Component {
  constructor() {
    super();
    this.state = {
      heightref: null,
      animationstate: "not going",
      animationtopdistance: 0,
      sort: null,
      searchboxwidth: null,
    };
    this.unmounted = false;
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  componentDidMount() {
    this.searchboxwidthsetter();
    window.addEventListener("resize", this.searchboxwidthsetter);
    this.setState({
      heightref: window
        .getComputedStyle(this.sortref)
        .getPropertyValue("height"),
    });
  }
  componentDidUpdate() {}
  closefilterfunc = (e) => {
    if (
      e.clientX < this.sortcontref.getBoundingClientRect().left ||
      e.clientX > this.sortcontref.getBoundingClientRect().right ||
      e.clientY < this.sortcontref.getBoundingClientRect().top ||
      e.clientY > this.sortcontref.getBoundingClientRect().bottom
    ) {
      this.setState({ animationtopdistance: 0 });
      window.removeEventListener("mousedown", this.closefilterfunc);
    }
  };

  animation = () => {
    if (this.state.animationstate === "not going") {
      var i = this.state.animationtopdistance;
      this.setState({ animationstate: "going" });
      if (i === 0) {
        var newinterval = setInterval(() => {
          this.unmounted && clearInterval(newinterval);
          if (i < 100) {
            i++;
            this.setState({ animationtopdistance: i });
          } else {
            window.addEventListener("mousedown", this.closefilterfunc);
            clearInterval(newinterval);
            this.setState({ animationstate: "not going" });
          }
        }, 5);
      } else if (i === 100) {
        var newinterval = setInterval(() => {
          this.unmounted && clearInterval(newinterval);
          if (i > 0) {
            i = i - 1;
            this.setState({
              animationtopdistance: i,
            });
          } else {
            window.removeEventListener("mousedown", this.closefilterfunc);
            clearInterval(newinterval);
            this.setState({ animationstate: "not going" });
          }
        }, 5);
      }
      if (i < 100) {
      }
    }
  };
  searchboxwidthsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      this.setState({ searchboxwidth: "20%" });
    } else if (i >= 1660) {
      this.setState({ searchboxwidth: "25%" });
    } else if (i >= 1440) {
      this.setState({ searchboxwidth: "30%" });
    } else if (i >= 1024) {
      this.setState({ searchboxwidth: "35%" });
    } else if (i >= 768) {
      this.setState({ searchboxwidth: "50%" });
    } else if (i >= 500) {
      this.setState({ searchboxwidth: "40%" });
    }
    this.setState({ searchboxwidth: "200px" });
  };

  sortcardsAZ = () => {
    this.setState({ sort: "A-Z" });
    let sortedcards;
    sortedcards = this.props.cards.cards.sort((a, b) => {
      if (a.title.localeCompare(b.title) < 0) {
        return -1;
      } else if (a.title.localeCompare(b.title) > 0) {
        return 1;
      } else {
        return 0;
      }
    });
    this.props.sortcards({ type: "AZ", cards: sortedcards });
  };
  sortcardsZA = () => {
    this.setState({ sort: "Z-A" });
    let sortedcards;
    sortedcards = this.props.cards.cards.sort((a, b) => {
      if (a.title.localeCompare(b.title) < 0) {
        return 1;
      } else if (a.title.localeCompare(b.title) > 0) {
        return -1;
      } else {
        return 0;
      }
    });
    this.props.sortcards({ type: "ZA", cards: sortedcards });
  };
  sortcardsrating = () => {
    this.setState({ sort: "Rating" });
    let sortedcards;
    sortedcards = this.props.cards.cards.sort((a, b) => {
      if (a.score !== "Not Rated" && b.score === "Not Rated") {
        return -1;
      } else if (a.score === "Not Rated" && b.score !== "Not Rated") {
        return 1;
      } else if (a.score === "Not Rated" && b.score === "Not Rated") {
        return 0;
      } else if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else {
        return 0;
      }
    });
    this.props.sortcards({ type: "RATING", cards: sortedcards });
  };

  inputfilter = () => {
    this.props.filtercards(this.inputref.value);
  };
  focuscardsevent = () => {
    if (this.props.cards.focuscards === 0) {
      this.props.focuscards(1);
    } else {
      this.props.focuscards(0);
    }
  };

  render() {
    return (
      <div className="categoriespagefilters categoriespagefiltersmd  categoriespagefilterslg categoriespagefiltersxl">
        <div className="sortbyrating" ref={(a) => (this.sortref = a)}>
          <div
            ref={(a) => (this.sortcontref = a)}
            style={{
              position: "absolute",
              width: "100%",
              top: 0,
              zIndex: -100,
              height:
                this.state.heightref &&
                this.state.heightref.slice(0, this.state.heightref.length - 2) *
                  4 +
                  "px",
            }}
          ></div>
          <div onClick={this.animation} className="rating">
            Sort By {this.state.sort && `- ${this.state.sort}`}
            <div>
              <img src={dropdown} width="10px"></img>
            </div>
          </div>
          <div
            onClick={this.sortcardsrating}
            className="sortbydropdown"
            style={{
              top: this.state.animationtopdistance * 1 + "%",
              zIndex: -1,
              background:
                this.state.sort === "Rating" ? "rgb(209, 246, 255)" : null,
            }}
          >
            {" "}
            Rating{" "}
          </div>
          <div
            onClick={this.sortcardsAZ}
            className="sortbydropdown"
            style={{
              zIndex: -2,
              top: this.state.animationtopdistance * 2 + "%",
              background:
                this.state.sort === "A-Z" ? "rgb(209, 246, 255)" : null,
            }}
          >
            {" "}
            Alphabet A-Z
          </div>
          <div
            onClick={this.sortcardsZA}
            className="sortbydropdown"
            style={{
              top: this.state.animationtopdistance * 3 + "%",
              zIndex: -3,
              background:
                this.state.sort === "Z-A" ? "rgb(209, 246, 255)" : null,
            }}
          >
            {" "}
            Alphabet Z-A
          </div>
        </div>
        <div
          className="categoriespagesearchbox"
          style={{
            width: this.state.searchboxwidth,
            zIndex: this.state.animationtopdistance > 0 ? 0 : 150,
          }}
        >
          <div className="categoriespagesearchboxinputcont">
            <input
              onChange={this.inputfilter}
              ref={(a) => (this.inputref = a)}
              className="categoriespagesearchboxinput"
              type="text"
            ></input>
          </div>
          <div
            onClick={this.focuscardsevent}
            className="categoriespagesearchboxbutton"
          >
            <img src={searchicon} width="75%"></img>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.getcards,
});

const mapDispatchToProps = (dispatch) => ({
  focuscards: (e) => dispatch(focuscards(e)),
  sortcards: (e) => dispatch(sortcards(e)),
  filtercards: (e) => dispatch(filtercards(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categoriespagefilters);
