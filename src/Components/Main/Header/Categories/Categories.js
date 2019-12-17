import React, { Component } from "react";
import "./categories.css";
import krani from "./krani.svg";
import broom from "./broom.svg";
import electro from "./electro.svg";
import px from "./pc.svg";
import build from "./build.svg";
import carpenter from "./carpenter.svg";
import moving from "./moving.svg";
import dots from "./dots.svg";
import { connect } from "react-redux";
import { fetchcards } from "../../../../Actions/Actions";
import { NavLink } from "react-router-dom";
import { tsThisType } from "@babel/types";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: [0, 0, 0, 0, 0, 0, 0, 0],
      style1: [0, 0, 0, 0, 0, 0, 0, 0],
      style2: [0, 0, 0, 0, 0, 0, 0, 0],
      style3: { position: "relative" }
    };
    this.categ = React.createRef();
    this.refarray = [];
    this.ggg = React.createRef();
    this.unmounted = false;
  }
  componentDidUpdate() {}
  componentDidMount() {}
  componentWillUnmount() {
    this.unmounted = true;
  }

  func = b => () => {
    var styleprop = (aaa, bbb, ccc) => {
      return {
        background: `linear-gradient(45deg, rgb(176, 205, 240) ${aaa -
          10}% , rgb(222, 222, 247) ${aaa}% ${bbb}%, rgb(150, 205, 240) ${bbb +
          10}% ${ccc}%)`
      };
    };
    let stylerepl = [0, 0, 0, 0, 0, 0, 0, 0];
    new Promise((resolve, reject) => {
      for (var i = 0, l = stylerepl.length; i < l; i++) {
        if (this.state.style[i] == stylerepl[i]) {
          resolve();
        }
      }
    }).then(resolve => {
      stylerepl[b] = 1;

      this.setState({ style: stylerepl });
      var styleinter = () => {
        var aaa = 0,
          bbb = 10,
          ccc = 100;
        var styleintervali = setInterval(() => {
          this.unmounted && clearInterval(styleintervali);
          if (aaa < 90 && this.state.style[b] == 1) {
            aaa += 1;
            bbb += 1;
            ccc += 1;

            this.setState(prevState => {
              var backstyle = Object.assign({}, prevState.style2);
              backstyle[b] = styleprop(aaa, bbb, ccc);

              return { style1: backstyle };
            });
          } else if (aaa >= 90 && this.state.style[b] == 1) {
            this.setState(prevState => {
              var backstyle = Object.assign({}, prevState.style1);
              backstyle[b] = {
                background:
                  "linear-gradient(45deg,rgb(176, 205, 240) 0%,  rgb(176, 205, 240) 100%)"
              };
              return { style1: backstyle };
            });
          } else {
            clearInterval(styleintervali);
            this.setState(prevState => {
              var backstyle = Object.assign({}, prevState.style1);
              backstyle[b] = null;
              return { style1: backstyle };
            });
          }
        }, 10);
      };
      var bottommargin = () => {
        var bott = 0;

        var bottommargin1 = setInterval(() => {
          this.unmounted && clearInterval(bottommargin1);
          if (bott <= 10 && this.state.style[b] == 1) {
            if (bott < 10) {
              bott += 1;
              this.setState(prevState => {
                var stata = { ...prevState.style2 };
                stata[b] = bott;

                return { style2: stata };
              });
            }
          } else if (bott > 0 && this.state.style[b] == 0) {
            bott = bott - 1;
            this.setState(prevState => {
              var stata = { ...prevState.style2 };
              stata[b] = bott;
              return { style2: stata };
            });
          } else {
            clearInterval(bottommargin1);
          }
        }, 10);
      };
      styleinter();
      bottommargin();
    });
  };

  underdivfunc = d => {
    if (this.state.style[d] == 1) {
      return {
        background: "rgb(154, 241, 137)",
        width: "100%",
        zIndex: 200,
        height: "10px",
        alignSelf: "bottom",
        position: "absolute",
        bottom: -this.state.style2[d]
      };
    } else {
      return null;
    }
  };

  func1 = q => () => {
    let stylerepl2 = [0, 0, 0, 0, 0, 0, 0, 0];

    this.setState({ style: stylerepl2 });
  };
  stylefunc = d => {
    if (this.state.style[d] == 1) {
      return Object.assign(
        {},
        this.state.style1[d],
        { bottom: `${this.state.style2[d]}px` },
        { position: "relative" },
        { zIndex: 100 }
      );
    } else if (this.state.style[d] == 0 && this.state.style2[d] > 0) {
      return Object.assign(
        {},
        this.state.style1[d],
        { bottom: `${this.state.style2[d]}px` },
        { position: "relative" },
        { zIndex: 100 }
      );
    } else {
      return null;
    }
  };

  linkevent = e => {
    return () => {
      this.props.history.push("/categories");
      this.props.getcards(e);
    };
  };

  render() {
    let sources = [krani, broom, electro, px, build, carpenter, moving];
    let text = [
      "Plumbing",
      "Cleaning",
      "Electrician",
      "IT",
      "Construction Work",
      "Carpentry",
      "Moving"
    ];
    let combined = sources.map((a, b) => {
      return [a, text[b]];
    });

    return (
      <div
        ref={this.categ}
        className="categories d-flex flex-sm-wrap"
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "auto"
        }}
      >
        {combined.map((t, d) => {
          return (
            <React.Fragment>
              <div
                className="categchildren categchildrenlarge categchildrenmedium categchildrensmall"
                style={this.stylefunc(d)}
                key={t}
                onMouseEnter={this.func(d)}
                onMouseLeave={this.func1(d)}
                onClick={this.linkevent({ subcategory: t[1] })}
              >
                <img src={t[0]} />
                {t[1]}

                <div style={this.underdivfunc(d)}></div>
              </div>

              <div
                style={{
                  background:
                    (d === 5 &&
                      this.props.screensize < 1024 &&
                      this.props.screensize >= 768) ||
                    (d === 3 &&
                      this.props.screensize < 768 &&
                      this.props.screensize >= 500) ||
                    ((d === 5 || d === 2) && this.props.screensize < 500)
                      ? null
                      : "white",
                  width: "1px"
                }}
              ></div>
            </React.Fragment>
          );
        })}

        <div
          onClick={() => this.props.history.push("/categories")}
          className="dotsdiv categchildren categchildrenlarge categchildrenmedium categchildrensmall"
        >
          <img className="dots" src={dots} width="20px" />
          More
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  screensize: state.screen.screensize
});
const mapDispatchToProps = dispatch => ({
  getcards: e => {
    return dispatch(fetchcards(e));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
