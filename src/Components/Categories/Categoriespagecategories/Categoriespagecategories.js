import React, { Component } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import "./Categoriespagecategories.css";
import dropdown from "./dropdown.svg";
import { fetchcards } from "../../../Actions/Actions";
import { connect } from "react-redux";
// CR=categrenderer
const cr = (categname, ...args) => {
  return {
    name: categname,
    children: args,
  };
};
export const services = [
  cr(
    "Cleaning",
    "House Cleaning",
    "Roof Cleaning",
    "Window Cleaning",
    "Carpet Cleaning",
    "Gutter Cleaning",
    "Floor Cleaning"
  ),

  cr(
    "Plumbing",
    "Piping",
    "Drain Clearing",
    "Sewers and Water Mains",
    "Water Purification"
  ),
  cr("Home Repair"),
  cr("Construction Work"),
  cr("Painting", "Interior Painting", "House Painting"),
  cr("Electrician"),
  cr(
    "Design and Remodeling",
    "interior Design and Remodeling",
    "Exterior Design and Landscaping"
  ),
  cr("Roofing", "Gutter Repair", "Solar Panels"),
  cr(
    "Heating and A/C",
    "Heating and A/C Installment",
    "Heating and A/C Repair"
  ),
  cr("Carpentry", "Framing", "Closet Building", "Steel Beams Installment"),
  cr("Locksmith"),
  cr(
    "Fences",
    "Wood Fence installment",
    "Metal Fence installment",
    "Barbed Wire installment"
  ),
  cr("Windows", "Window Installment", "Window Trim Installment"),
  cr("Doors", "Gates Installment"),
  cr("Removal and Control", "Mold Removal", "Pest Control", "Asbestos Removal"),
  cr("Moving"),
  cr("Garage Building"),
  cr("House Sitting", "Pet Sitting"),
  cr("IT", "Computer Network Wiring", "Troubleshooting"),
];

const intervalsetter = () =>
  services.map((a, b) => {
    return { interval: undefined };
  });
const car = () =>
  services.map((a, b) => {
    return {
      animationstate: "closing",
      animationtopdistance: 0,
      subcategoryextensionheight: undefined,
    };
  });

class Categoriespagecategories extends Component {
  constructor() {
    super();
    this.state = {
      animation: car(),
      heightreference: undefined,
      dropdownanimationstate: "closing",
      dropdowntopdistance: 0,
      currentcategory: null,
      currentcategoryindex: null,
      currentsubcategory: null,
      subcatanimationstate: "closing",
      subcattopdistance: 0,
    };
    this.newinterval = intervalsetter();
    this.smcateginterval = undefined;
    this.smsubcateinterval = undefined;
  }
  componentDidMount() {
    if (
      this.props.cardsstate.category !== "all" &&
      this.props.cardsstate.category !== undefined
    ) {
      this.setState({
        currentcategory: this.props.cardsstate.category,
        currentcategoryindex: this.props.cardsstate.index,
      });
    }
    this.subcategoryextensionheightsetter();
    window.addEventListener("resize", this.categoryitemresetter);
  }
  subcatanimation = (b, a) => {
    return () => {
      clearInterval(this.newinterval[b].interval);

      if (this.props.location.pathname !== "/categories") {
        this.props.history.push("/categories");
      }
      this.setState({ currentcategory: a.name });
      if (this.state.animation[b].animationtopdistance === 0) {
        this.props.getcards({ category: a.name, index: b })();
      }
      let animationtopdistance = this.state.animation[b].animationtopdistance;
      let animationcopy = [...this.state.animation];
      this.state.animation.forEach((c, d) => {
        if (c.animationtopdistance > 0 && d !== b) {
          this.collapseanimation(d);
        }
      });

      if (this.state.animation[b].animationstate === "closing") {
        animationcopy[b].animationstate = "expanding";
        this.setState({ animation: animationcopy });
      } else {
        animationcopy[b].animationstate = "closing";
        this.setState({ animation: animationcopy });
        this.setState({ currentsubcategory: undefined });
      }
      this.newinterval[b].interval = setInterval(() => {
        if (!this.newinterval) {
          clearInterval(asd);
        }
        if (
          this.state.animation[b].animationstate === "expanding" &&
          animationtopdistance < 100
        ) {
          animationcopy[b].subcategoryextensionheight =
            animationcopy[b].subcategoryextensionheight +
            this.categoryheightadder(b);
          animationtopdistance++;
          animationcopy[b].animationtopdistance = animationtopdistance;

          this.setState({ animation: animationcopy });
        } else if (
          this.state.animation[b].animationstate === "closing" &&
          animationtopdistance > 0
        ) {
          animationcopy[b].subcategoryextensionheight =
            animationcopy[b].subcategoryextensionheight -
            this.categoryheightadder(b);
          animationtopdistance = animationtopdistance - 1;
          animationcopy[b].animationtopdistance = animationtopdistance;
          this.setState({ animation: animationcopy });
        } else {
          this.setState({ animation: animationcopy });
          clearInterval(this.newinterval[b].interval);
        }
      }, 5);
      let asd = this.newinterval[b].interval;
    };
  };
  componentWillUnmount() {
    this.newinterval = undefined;
    this.smcateginterval = undefined;
    this.smsubcateinterval = undefined;
  }

  collapseanimation = (d) => {
    clearInterval(this.newinterval[d].interval);

    let animationcopy = [...this.state.animation];
    animationcopy[d].animationstate = "closing";
    animationcopy[d].animationtopdistance = 0;
    animationcopy[d].subcategoryextensionheight = this.state.heightreference;
    this.setState({ animation: animationcopy, currentsubcategory: undefined });
  };
  subcatindexchecker = (b, d) => {
    if (this.state.animation[b].animationstate !== "not going") {
      return this.state.animation[b].animationtopdistance * (d + 1);
    }
  };

  categoryheight = (arg) => {
    return this.state.heightreference * services[arg].children.length;
  };
  categoryheightadder = (arg) => {
    return this.categoryheight(arg) / 100;
  };

  categoryitemheight = () => {
    return window
      .getComputedStyle(this.subcatheightref)
      .getPropertyValue("height");
  };

  subcategoryextensionheightsetter = () => {
    this.setState((prevState) => {
      for (var i = 0; i < prevState.animation.length; i++) {
        if (prevState.animation[i].animationtopdistance === 0) {
          prevState.animation[i].subcategoryextensionheight = parseFloat(
            this.categoryitemheight().slice(
              0,
              this.categoryitemheight().length - 2
            )
          );
        } else {
          prevState.animation[i].subcategoryextensionheight =
            parseFloat(
              this.categoryitemheight().slice(
                0,
                this.categoryitemheight().length - 2
              )
            ) *
            (services[i].children.length + 1);
        }
      }
      return {
        animation: prevState.animation,
        heightreference: parseFloat(
          this.categoryitemheight().slice(
            0,
            this.categoryitemheight().length - 2
          )
        ),
      };
    });
  };

  categoryitemresetter = () => {
    for (var i = 0; i < this.state.animation.length; i++) {
      if (this.state.animation[i].animationstate === "not going") {
        continue;
      } else {
      }
    }

    this.subcategoryextensionheightsetter();
  };
  categoriesdropdown = () => {
    clearInterval(this.smcateginterval);
    let i = this.state.dropdowntopdistance;
    if (this.state.dropdownanimationstate === "closing") {
      this.setState({ dropdownanimationstate: "expanding" });
    } else {
      this.setState({ dropdownanimationstate: "closing" });
    }

    this.smcateginterval = setInterval(() => {
      if (!this.smcateginterval) {
        clearInterval(a);
      }
      if (this.state.dropdownanimationstate === "closing" && i > 0) {
        i = i - 1;
        this.setState({ dropdowntopdistance: i });
      } else if (this.state.dropdownanimationstate === "expanding" && i < 100) {
        i++;
        this.setState({ dropdowntopdistance: i });
      } else {
        clearInterval(this.smcateginterval);
      }
    }, 5);
    let a = this.smcateginterval;
  };

  subcatdropdown = () => {
    clearInterval(this.subcatinterval);
    let i = this.state.subcattopdistance;
    if (this.state.subcatanimationstate === "closing") {
      this.setState({ subcatanimationstate: "expanding" });
    } else {
      this.setState({ subcatanimationstate: "closing" });
    }
    this.subcatinterval = setInterval(() => {
      if (!this.subcatinterval) {
        clearInterval(a);
      }
      if (this.state.subcatanimationstate === "closing" && i > 0) {
        i = i - 1;
        this.setState({ subcattopdistance: i });
      } else if (this.state.subcatanimationstate === "expanding" && i < 100) {
        i++;
        this.setState({ subcattopdistance: i });
      } else {
        clearInterval(this.subcatinterval);
      }
    }, 5);
    let a = this.subcatinterval;
  };

  componentDidUpdate() {}
  subgetcards = (e) => {
    return () => {
      this.props.getcards({ ...e })();
      this.setState({ currentsubcategory: e.subcategory });
    };
  };
  render() {
    if (this.props.screensize.screensize >= 768 || window.innerWidth > 768) {
      return (
        <div
          className={
            this.props.page === "cardpage"
              ? "cardpagecategoriesxxl cardpagecategoriesxl cardpagecategorieslg cardpagecategoriesmd categoriespagecategories"
              : "categoriespagecategories categoriespagecategoriesmd categoriespagecategorieslg categoriespagecategoriesxl"
          }
          ref={(e) => (this.categ = e)}
        >
          {services.map((a, b, arr) => {
            return (
              <div
                className="categoriescont"
                style={{
                  height:
                    this.state.animation[b].subcategoryextensionheight + "px",
                }}
              >
                <div className="subcategories" style={{}}>
                  <div
                    style={
                      (arr.length - b < 1 &&
                      this.state.animation[b].animationtopdistance === 0
                        ? { paddingBottom: "1px" }
                        : {},
                      {
                        background:
                          this.state.currentcategory === a.name
                            ? "rgb(155, 223, 255)"
                            : null,
                      })
                    }
                    className="subcategoriesname"
                    onClick={this.subcatanimation(b, a)}
                    ref={b === 0 ? (e) => (this.subcatheightref = e) : null}
                  >
                    {a.name}
                  </div>
                  {a.children.map((c, d, ttt) => {
                    return (
                      <div
                        style={{
                          background:
                            this.state.currentsubcategory === c
                              ? "rgb(255, 208, 180)"
                              : null,
                          top: this.subcatindexchecker(b, d) + "%",
                          border:
                            this.state.animation[d].animationstate ===
                            "not going"
                              ? "1px solid rgb(218, 247, 247)"
                              : "1px solid rgb(181, 245, 245) ",
                          borderWidth: "1px 0 1px 0",
                        }}
                        onClick={this.subgetcards({
                          subcategory: c,
                          category: a.name,
                        })}
                        className="subsubcategories"
                      >
                        {c}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div
          className={
            this.props.page === "cardpage"
              ? "cardpagecategoriessm categoriespagecategoriessm"
              : "categoriespagecategoriessm"
          }
        >
          <div
            className="categoriespagecategoriescategoriescont"
            style={{ height: this.state.heightreference + "px" }}
          >
            <div
              onClick={() => {
                this.categoriesdropdown();
                clearInterval(this.subcatinterval);
                this.setState({
                  subcattopdistance: 0,
                  subcatanimationstate: "closing",
                });
              }}
              className="categoriespagecategoriescategories"
            >
              Category{" "}
              {this.state.currentcategory &&
                ` -  ${this.state.currentcategory}`}
              <div>
                <img src={dropdown} width="10px"></img>
              </div>
            </div>
            {services.map((a, b, arr) => {
              return (
                <div
                  className="categoriescontsm"
                  style={{
                    height:
                      this.state.animation[b].subcategoryextensionheight + "px",
                    zIndex: -1 - b,
                    top: this.state.dropdowntopdistance * (b + 1) + "%",
                  }}
                >
                  <div className="subcategories">
                    <div
                      style={{}}
                      onClick={() => {
                        if (this.props.location.pathname !== "/categories") {
                          this.props.history.push("/categories");
                        }
                        this.setState({
                          currentcategoryindex: b,
                          currentcategory: a.name,
                          currentsubcategory: null,
                        });
                        this.props.getcards({ category: a.name, index: b })();
                        this.categoriesdropdown();
                      }}
                      className="subcategoriesname"
                      ref={b === 0 ? (e) => (this.subcatheightref = e) : null}
                    >
                      {a.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="categoriespagecategoriescategoriescont"
            style={{ zIndex: -100, height: this.state.heightreference + "px" }}
          >
            <div
              onClick={() => {
                this.subcatdropdown();
                clearInterval(this.smcateginterval);
                this.setState({
                  dropdowntopdistance: 0,
                  dropdownanimationstate: "not going",
                });
              }}
              className="categoriespagecategoriescategories"
            >
              Subcategory
              {services[this.state.currentcategoryindex] &&
                services[this.state.currentcategoryindex].children.length ===
                  0 &&
                " - No Subcategories"}
              {this.state.currentsubcategory &&
                ` -  ${this.state.currentsubcategory}`}
              <div>
                <img src={dropdown} width="10px"></img>
              </div>
            </div>
            {services[this.state.currentcategoryindex] &&
            services[this.state.currentcategoryindex].children.length > 0
              ? services[this.state.currentcategoryindex].children.map(
                  (a, b) => {
                    return (
                      <div
                        onClick={() => {
                          if (this.props.location.pathname !== "/categories") {
                            this.props.history.push("/categories");
                          }
                          this.setState({ currentsubcategory: a });
                          this.subcatdropdown();
                          this.props.getcards({
                            category:
                              services[this.state.currentcategoryindex].name,
                            subcategory: a,
                            index: this.state.currentcategoryindex,
                          })();
                        }}
                        className="categoriescontsm"
                        style={{
                          top: this.state.subcattopdistance * (b + 1) + "%",
                          zIndex: -1 - b,
                          height: this.state.heightreference + "px",
                        }}
                      >
                        <div className="subcategoriesname">{a}</div>
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => ({
  getcards: (e) => {
    return () => dispatch(fetchcards(e));
  },
});
const mapStateToProps = (state) => ({
  cardsstate: state.getcards,
  screensize: state.screen,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categoriespagecategories);
