import React, { Component } from "react";
import "./Categoriespagecategories.css";
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

export class Categoriespagecategories extends Component {
  constructor() {
    super();
    this.state = {
      animation: car(),
      heightreference: undefined
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
        }, 10);
      }
    };
  };
  componentDidUpdate() {
    console.log(this.state.animation[0].subcategoryextensionheight);
  }

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
    console.log(this.categoryitemheight());
    this.setState(prevState => {
      for (var i = 0; i < prevState.animation.length; i++) {
        if (prevState.animation[i].animationtopdistance === 0) {
          prevState.animation[i].subcategoryextensionheight = parseInt(
            this.categoryitemheight().slice(
              0,
              this.categoryitemheight().length - 2
            )
          );
        } else {
          prevState.animation[i].subcategoryextensionheight =
            parseInt(
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
        heightreference: parseInt(
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
    console.log("passed");
    this.subcategoryextensionheightsetter();
  };

  componentDidMount() {
    console.log(window.getComputedStyle(this.categ));
    console.log(this.categoryitemheight());
    this.subcategoryextensionheightsetter();
    window.addEventListener("resize", this.categoryitemresetter);
  }
  render() {
    return (
      <div
        className="categoriespagecategories categoriespagecategoriesmd categoriespagecategorieslg categoriespagecategoriesxl categoriespagecategoriesxxl "
        ref={e => (this.categ = e)}
      >
        {services.map((a, b) => {
          return (
            <div
              style={{
                height:
                  this.state.animation[b].subcategoryextensionheight + "px"
              }}
            >
              <div className="subcategories">
                <div
                  className="subcategoriesname"
                  onClick={this.subcatanimation(b)}
                  ref={b === 0 ? e => (this.subcatheightref = e) : null}
                >
                  {a.name}
                </div>
                {a.children.map((c, d, ttt) => {
                  return (
                    <div
                      style={{ top: this.subcatindexchecker(b, d) + "%" }}
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
  }
}

export default Categoriespagecategories;
