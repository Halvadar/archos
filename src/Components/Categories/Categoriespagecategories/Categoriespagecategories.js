import React, { Component } from "react";
import "./Categoriespagecategories.css";
// CR=categrenderer
const cr = (categname, ...args) => {
  return { name: categname, children: args };
};

export class Categoriespagecategories extends Component {
  constructor() {
    super();
    this.state = {
      categorieslist: {
        services: [
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
          cr(
            "Carpentry",
            "Framing",
            "Closet Building",
            "Steel Beams Installment"
          ),
          cr("Locksmith"),
          cr(
            "Fences",
            "Wood Fence installment",
            "Metal Fence installment",
            "Barbed Wire installment"
          ),
          cr("Windows", "Window Installment", "Window Trim Installment"),
          cr("Doors", "Gates Installment"),
          cr(
            "Removal and Control",
            "Mold Removal",
            "Pest Control",
            "Asbestos Removal"
          ),
          cr("Moving"),
          cr("Garage Building"),
          cr("House Sitting", "Pet Sitting"),
          cr("IT", "Computer Network Wiring", "Troubleshooting")
        ]
      }
    };
  }
  componentDidMount() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="categoriespagecategories">
        <div></div>
        {this.state.categorieslist.services.map((a, b) => {
          console.log(a.name);
          return <div className="subcategories">{a.name}</div>;
        })}
      </div>
    );
  }
}

export default Categoriespagecategories;
