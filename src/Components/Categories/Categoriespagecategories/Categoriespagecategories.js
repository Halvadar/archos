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
    children: args
  };
};
const services = [
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
  cr("IT", "Computer Network Wiring", "Troubleshooting")
];

const car = () =>
  services.map((a, b) => {
    return {
      animationstate: "not going",
      animationtopdistance: 0,
      subcategoryextensionheight: undefined
    };
  });

class Categoriespagecategories extends Component {
  constructor() {
    super();
    this.state = {
      animation: car(),
      heightreference: undefined,
      dropdownanimationstate: "not going",
      dropdowntopdistance: 0
    };
  }
  subcatanimation = e => {
    return () => {
      let animationtopdistance = this.state.animation[e].animationtopdistance;
      let animationcopy = [...this.state.animation];
      if (this.state.animation[e].animationstate === "not going") {
        if (this.state.animation[e].animationtopdistance === 0) {
          animationcopy[e].animationstate = "expanding";
          this.setState({ animation: animationcopy });
        } else {
          animationcopy[e].animationstate = "closing";
          this.setState({ animation: animationcopy });
        }
        let interval = setInterval(() => {
          if (
            this.state.animation[e].animationstate === "expanding" &&
            animationtopdistance < 100
          ) {
            animationcopy[e].subcategoryextensionheight =
              animationcopy[e].subcategoryextensionheight +
              this.categoryheightadder(e);
            animationtopdistance++;
            animationcopy[e].animationtopdistance = animationtopdistance;

            this.setState({ animation: animationcopy });
          } else if (
            this.state.animation[e].animationstate === "closing" &&
            animationtopdistance > 0
          ) {
            animationcopy[e].subcategoryextensionheight =
              animationcopy[e].subcategoryextensionheight -
              this.categoryheightadder(e);
            animationtopdistance = animationtopdistance - 1;
            animationcopy[e].animationtopdistance = animationtopdistance;
            this.setState({ animation: animationcopy });
          } else {
            animationcopy[e].animationstate = "not going";
            this.setState({ animation: animationcopy });
            clearInterval(interval);
          }
        }, 5);
      }
    };
  };
  componentDidUpdate() {}

  subcatindexchecker = (b, d) => {
    if (this.state.animation[b].animationstate !== "not going") {
      return this.state.animation[b].animationtopdistance * (d + 1);
    }
  };

  categoryheight = arg => {
    return this.state.heightreference * services[arg].children.length;
  };
  categoryheightadder = arg => {
    return this.categoryheight(arg) / 100;
  };

  categoryitemheight = () => {
    return window
      .getComputedStyle(this.subcatheightref)
      .getPropertyValue("height");
  };

  subcategoryextensionheightsetter = () => {
    this.setState(prevState => {
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
        )
      };
    });
  };

  categoryitemresetter = () => {
    for (var i = 0; i < this.state.animation.length; i++) {
      if (this.state.animation[i].animationstate === "not going") {
        continue;
      } else {
        return console.log("not passed");
      }
    }

    this.subcategoryextensionheightsetter();
  };
  categoriesdropdown = () => {
    if (this.state.dropdownanimationstate !== "going") {
      let i = this.state.dropdowntopdistance;
      if (i === 0) {
        this.setState({ dropdownanimationstate: "going" });
        var newinterval = setInterval(() => {
          if (i < 100) {
            i++;
            this.setState({ dropdowntopdistance: i });
          } else {
            clearInterval(newinterval);
            this.setState({ dropdownanimationstate: "not going" });
          }
        }, 5);
      } else if (i === 100) {
        this.setState({ dropdownanimationstate: "going" });
        var newinterval = setInterval(() => {
          if (i > 0) {
            i = i - 1;
            this.setState({ dropdowntopdistance: i });
          } else {
            clearInterval(newinterval);
            this.setState({ dropdownanimationstate: "not going" });
          }
        }, 5);
      }
    }
  };

  componentDidMount() {
    this.subcategoryextensionheightsetter();
    window.addEventListener("resize", this.categoryitemresetter);
  }
  render() {
    if (window.innerWidth >= 768) {
      return (
        <div
          className="categoriespagecategories categoriespagecategoriesmd categoriespagecategorieslg categoriespagecategoriesxl  "
          ref={e => (this.categ = e)}
        >
          {services.map((a, b, arr) => {
            return (
              <div
                className="categoriescont"
                style={{
                  height:
                    this.state.animation[b].subcategoryextensionheight + "px"
                }}
              >
                <div className="subcategories">
                  <div
                    style={
                      arr.length - b < 1 &&
                      this.state.animation[b].animationtopdistance === 0
                        ? { paddingBottom: "1px" }
                        : {}
                    }
                    className="subcategoriesname"
                    onClick={this.subcatanimation(b)}
                    ref={b === 0 ? e => (this.subcatheightref = e) : null}
                  >
                    {a.name}
                  </div>
                  {a.children.map((c, d, ttt) => {
                    return (
                      <div
                        style={{
                          top: this.subcatindexchecker(b, d) + "%",
                          border:
                            this.state.animation[d].animationstate ===
                            "not going"
                              ? "1px solid rgb(218, 247, 247)"
                              : "1px solid rgb(181, 245, 245) ",
                          borderWidth: "1px 0 1px 0"
                        }}
                        onClick={this.props.getcards({
                          subcategory: c,
                          category: a.name
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
        <div className="categoriespagecategoriessm">
          <div
            className="categoriespagecategoriescategoriescont"
            style={{ height: this.state.heightreference + "px" }}
          >
            <div
              onClick={this.categoriesdropdown}
              className="categoriespagecategoriescategories"
            >
              Categories
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
                    top: this.state.dropdowntopdistance * (b + 1) + "%"
                  }}
                >
                  <div className="subcategories">
                    <div
                      style={{
                        border:
                          this.state.dropdownanimationstate === "not going"
                            ? "1px solid rgb(181, 245, 245)"
                            : "1px solid rgb(218, 247, 247)",
                        borderWidth: "1px 0 1px 0",
                        paddingBottom:
                          arr.length - b < 1 &&
                          this.state.animation[b].animationtopdistance === 0
                            ? "1px"
                            : null
                      }}
                      className="subcategoriesname"
                      onClick={this.subcatanimation(b)}
                      ref={b === 0 ? e => (this.subcatheightref = e) : null}
                    >
                      <NavLink to={`${this.props.location.pathname}/${a.name}`}>
                        {a.name}
                      </NavLink>
                    </div>
                    {a.children.map((c, d, ttt) => {
                      return (
                        <div
                          style={{
                            top: this.subcatindexchecker(b, d) + "%",
                            border:
                              this.state.animation[d].animationstate ===
                              "not going"
                                ? "1px solid rgb(218, 247, 247)"
                                : "1px solid rgb(181, 245, 245) ",
                            borderWidth: "1px 0 1px 0"
                          }}
                          className="subsubcategories"
                          onClick={this.props.getcards({
                            subcategory: c,
                            category: a
                          })}
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
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({
  getcards: e => {
    return () => dispatch(fetchcards(e));
  }
});

export default connect(null, mapDispatchToProps)(Categoriespagecategories);
