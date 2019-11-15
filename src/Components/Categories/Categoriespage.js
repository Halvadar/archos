import React, { Component } from "react";
import Categoriespagecategories from "./Categoriespagecategories/Categoriespagecategories";
import Categoriespagecards from "./Categoriespagecards/Categoriespagecards";
import "./Categoriespage.css";

class Categoriespage extends Component {
  componentDidMount() {
    console.log(this.props.location);
  }
  render() {
    console.log(this.props.location);
    return (
      <div className="categoriespage">
        <Categoriespagecategories
          location={this.props.location}
        ></Categoriespagecategories>
        <Categoriespagecards
          location={this.props.location}
        ></Categoriespagecards>
      </div>
    );
  }
}

export default Categoriespage;
