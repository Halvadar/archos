import React, { Component } from "react";
import Categoriespagecategories from "./Categoriespagecategories/Categoriespagecategories";
import Categoriespagecards from "./Categoriespagecards/Categoriespagecards";
import Categoriespagefilters from "./Categoriespagefilters/Categoriespagefilters";
import "./Categoriespage.css";

class Categoriespage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="categoriespage categoriespagemd">
        <Categoriespagecategories
          location={this.props.location}
        ></Categoriespagecategories>
        <Categoriespagefilters></Categoriespagefilters>
        <Categoriespagecards
          location={this.props.location}
        ></Categoriespagecards>
      </div>
    );
  }
}

export default Categoriespage;
