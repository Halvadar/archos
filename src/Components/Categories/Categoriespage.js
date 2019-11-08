import React, { Component } from "react";
import Categoriespagecategories from "./Categoriespagecategories/Categoriespagecategories";
import Categoriespagecards from "./Categoriespagecards/Categoriespagecards";
import "./Categoriespage.css";

class Categoriespage extends Component {
  render() {
    return (
      <div className="categoriespage">
        <Categoriespagecategories></Categoriespagecategories>
        {/* <Categoriespagecards></Categoriespagecards> */}
      </div>
    );
  }
}

export default Categoriespage;
