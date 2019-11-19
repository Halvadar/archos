import React, { Component } from "react";
import Categoriespagecategories from "./Categoriespagecategories/Categoriespagecategories";
import Categoriespagecards from "./Categoriespagecards/Categoriespagecards";
import Categoriespagefilters from "./Categoriespagefilters/Categoriespagefilters";
import "./Categoriespage.css";

class Categoriespage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div className="categoriespage categoriespagemd categoriespagelg">
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
