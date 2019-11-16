import React, { Component } from "react";
import Categoriespagecategories from "./Categoriespagecategories/Categoriespagecategories";
import Categoriespagecards from "./Categoriespagecards/Categoriespagecards";
import "./Categoriespage.css";

class Categoriespage extends Component {
  componentDidMount() {}
  render() {
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
