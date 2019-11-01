import React, { Component } from "react";
import "./Searchboxanimation.css";
import Searchboxheader from "../Searchbox/Searchbox";
import searchicon from "./searchicon.svg";
import { exportDefaultSpecifier } from "@babel/types";
import { promised, Promise } from "q";

class Searchboxanimation extends Component {
  constructor(props) {
    super(props);
    this.searchbutton = React.createRef();
    this.Searchboxheader = React.createRef();
    this.presearchbox = React.createRef();
    this.searchinput = React.createRef();
    this.kubikiii = React.createRef();

    this.state = {
      animaciisstili: {
        kaci1: {},
        kaci2: {},
        kaci3: {}
      },
      searchanimacia: {
        bottom: 0,
        alignSelf: "flex-end",
        top: null
      },
      presearchheight: 0,

      searchinputwidth: 0,
      marginLeft: 0,
      animationdone: false,
      position1: "absolute"
    };

    this.scrollthingyistrue = this.scrollthingyistrue.bind(this);
    this.searchboxtop = this.searchboxtop.bind(this);
    this.presearchboxheight = this.presearchboxheight.bind(this);
  }
  huhuhu = l => {
    this.kubikiii = l;
    this.props.kubik1(l);
  };

  scrollthingyistrue(a) {
    return a ? (
      <div className="searchbox">
        <input className="searchinput" type="text" />
        <input className="searchbutton" type="button" />
      </div>
    ) : null;
  }

  searchboxtop() {
    var searchboxtop1 = window
      .getComputedStyle(this.presearchbox)
      .getPropertyValue("top");
    return searchboxtop1;
  }

  funqcia = () => {
    console.log(this.props.backgroundheight);
    return new Promise((resolve, reject) => {
      console.log("asdasd");
      var searchanimacia1 = Object.assign({}, this.state.searchanimacia);

      var searchboxinterval = setInterval(() => {
        if (
          Math.round(
            this.searchboxtop().slice(0, this.searchboxtop().length - 2)
          ) -
            this.presearchbox.style.bottom.slice(
              0,
              this.presearchbox.style.bottom.length - 2
            ) >=
          2
        ) {
          console.log("1111");
          searchanimacia1.bottom = searchanimacia1.bottom + 1.5;
          let searchanimacia2 = Object.assign({}, searchanimacia1);
          searchanimacia2.bottom = searchanimacia2.bottom + "px";

          this.setState({ searchanimacia: searchanimacia2 });
        } else {
          resolve("asd");
          clearInterval(searchboxinterval);
        }
      }, 1);
    }).then(resolve => {
      let searchinputwidth1 = this.state.searchinputwidth;
      let presearchboxwidth = window
        .getComputedStyle(this.presearchbox)
        .getPropertyValue("width");
      let searchbuttonmargin = this.state.marginLeft;
      console.log(presearchboxwidth);

      let presearchboxwidth1 = presearchboxwidth.slice(
        0,
        presearchboxwidth.length - 2
      );

      console.log(presearchboxwidth1);

      var searchinputinterval = setInterval(() => {
        let searchinputwidth2 = window
          .getComputedStyle(this.searchinput)
          .getPropertyValue("width");
        let searchinputwidth3 = searchinputwidth2.slice(
          0,
          searchinputwidth2.length - 2
        );
        if (presearchboxwidth1 - searchinputwidth3 >= 1) {
          console.log(presearchboxwidth1 - searchinputwidth3);

          searchinputwidth1 = searchinputwidth1 + 2;
          searchbuttonmargin = searchbuttonmargin + 1;
          console.log(searchbuttonmargin);

          let piqselmimmatebeli = searchbuttonmargin + "px";
          let piqselmomshorebeli = searchinputwidth1 + "px";
          this.setState({ searchinputwidth: piqselmomshorebeli });
          this.setState({ marginLeft: piqselmimmatebeli });
        } else {
          clearInterval(searchinputinterval);
          this.setState({ animationdone: true });
          console.log(this.state.animationdone);
        }
      }, 1);
    });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.backgroundheight !== prevProps.backgroundheight &&
      prevProps.backgroundheight === undefined
    ) {
      this.funqcia();
    }
    console.log(
      Math.round(this.searchboxtop().slice(0, this.searchboxtop().length - 2)) -
        this.presearchbox.style.bottom.slice(
          0,
          this.presearchbox.style.bottom.length - 2
        )
    );
  }
  componentDidMount() {
    this.presearchboxheight();
    let searchinputheight = window
      .getComputedStyle(this.searchinput)
      .getPropertyValue("height");
    window.addEventListener("scroll", this.searchbardistance);
  }
  aaaaa = () => {
    if (this.props.scrollthingy) {
      return <Searchboxheader />;
    }
  };
  presearchboxheight() {
    this.setState({
      presearchheight: window
        .getComputedStyle(this.searchbutton)
        .getPropertyValue("width")
    });
  }
  position = () => {
    return this.state.animationdone ? {} : { position: "absolute" };
  };

  wedwed = () => {
    return window.getComputedStyle(this.props.nav);
  };
  kubikiheight = () => {
    return this.props.backgroundheight.slice(
      0,
      this.props.backgroundheight.length - 2
    );
  };
  searchboxheight = () => {
    return window
      .getComputedStyle(this.searchbutton)
      .getPropertyValue("height")
      .slice(
        0,
        window.getComputedStyle(this.searchbutton).getPropertyValue("height")
          .length - 2
      );
  };
  navheight = () => {
    return typeof this.props.nav === "string"
      ? this.props.nav.slice(0, this.props.nav.length - 2)
      : 0;
  };
  searchbardistance = () => {
    if (
      this.state.animationdone &&
      this.state.position1 == "absolute" &&
      Math.round(window.scrollY) >
        Math.round(this.navheight()) +
          Math.round(this.kubikiheight()) / 2 -
          ((Math.round(this.navheight()) - Math.round(this.searchboxheight())) /
            2 +
            Math.round(this.searchboxheight()))
    ) {
      this.setState({ position1: "fixed" });
      this.setState({ searchanimacia: { bottom: null } });
      this.setState({ searchanimacia: { alignSelf: null } });
      this.setState({
        searchanimacia: {
          top:
            this.navheight() / 2 -
            Math.round(this.searchboxheight() / 2) +
            Math.round(this.searchboxheight())
        }
      });
    } else if (
      this.state.animationdone &&
      this.state.position1 == "fixed" &&
      Math.round(window.scrollY) <
        Math.round(this.navheight()) +
          Math.round(this.kubikiheight()) / 2 -
          ((Math.round(this.navheight()) - Math.round(this.searchboxheight())) /
            2 +
            Math.round(this.searchboxheight()))
    ) {
      this.setState({ position1: "absolute" });
      this.setState({ searchanimacia: { alignSelf: "center" } });
      this.setState({ searchanimacia: { bottom: this.kubikiheight() / 2 } });
    }
  };

  render() {
    return (
      <div className="konteineri">
        <div
          className="presearchbox-md presearchbox "
          ref={presearch => (this.presearchbox = presearch)}
          style={{
            bottom: this.state.searchanimacia.bottom,
            top: this.state.searchanimacia.top,
            position: this.state.position1,
            selfAlign: this.state.searchanimacia.alignSelf
          }}
        >
          <div
            className="searchbutton1"
            ref={search => (this.searchbutton = search)}
            style={{
              width: "15%",
              height: this.state.presearchheight,
              marginLeft: this.state.marginLeft
            }}
          >
            <img src={searchicon} style={{ margin: "auto" }} width="70%" />
          </div>
          <div
            ref={inp => (this.searchinput = inp)}
            className="searchinput1"
            style={{
              height: this.state.presearchheight,
              width: this.state.searchinputwidth
            }}
          >
            {this.state.animationdone ? (
              <input
                className="searchtextinput"
                type="text"
                placeholder="სანტექნიკი, კბილის ექიმი, ადვოკატი..."
              ></input>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Searchboxanimation;
