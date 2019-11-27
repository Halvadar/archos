import React, { Component } from "react";
import "./Postservice.css";
import { services } from "../../Categories/Categoriespagecategories/Categoriespagecategories";
import { connect } from "react-redux";
import { createcard } from "../../../Actions/Actions";

class Postservice extends Component {
  constructor() {
    super();
    this.state = {
      categorydisplay: "none",
      subcategorydisplay: "none",
      currentlyselectedcategory: "Not Selected",
      currentlyselectedcategoryindex: 0,
      currentlyselectedsubcategory: "Not Selected"
    };
  }
  componentDidMount() {
    console.log(services[0]);
  }

  categorydisplaysetter = () => {
    if (this.state.categorydisplay === "none") {
      this.setState({ categorydisplay: "initial" });
    } else {
      this.setState({ categorydisplay: "none" });
    }
  };
  subcategorydisplaysetter = () => {
    if (this.state.subcategorydisplay === "none") {
      this.setState({ subcategorydisplay: "initial" });
    } else {
      this.setState({ subcategorydisplay: "none" });
    }
  };

  currentlyselectedcategorysetter = (a, b) => {
    return () => {
      this.setState({
        currentlyselectedcategory: a,
        currentlyselectedcategoryindex: b
      });
      this.setState({
        categorydisplay: "none",
        currentlyselectedsubcategory: "Not Selected"
      });
    };
  };
  currentlyselectedsubcategorysetter = a => {
    return () => {
      this.setState({
        currentlyselectedsubcategory: a,
        subcategorydisplay: "none"
      });
    };
  };
  currenttitledescription = () => {
    if (this.titleref.value.length > 0) {
      return {
        title: this.titleref.value,
        description: this.descriptionref.value
      };
    }
    return null;
  };
  submitservice = () => {
    console.log(this.imageref.files);
    /* if (
      this.state.currentlyselectedcategory !== "Not Selected" &&
      this.currenttitledescription !== null &&
      this.imageref.value !== (null || undefined || "")
    ) */
    this.props.createcard({
      ...this.currenttitledescription,
      category: this.state.currentlyselectedcategory,
      subcategory: this.state.currentlyselectedsubcategory,
      image: this.imageref.files[0]
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="addaservice">
          <div>Add a New Service</div>
        </div>
        <div className="postservicecontcont">
          <div className="postservicecont">
            <div className="postserviceinputtitle">
              <div className="forminputtitle">Title</div>
              <input
                ref={a => (this.titleref = a)}
                className="postserviceinput"
              ></input>
            </div>
            <div className="postserviceinputdescription">
              <div className="forminputtitle">Description</div>
              <textarea
                ref={a => (this.descriptionref = a)}
                className="postserviceinput"
              ></textarea>
            </div>
            <div className="postserviceselectcat">
              <div className="forminputtitlecat">Select a Category</div>
              <div className="selectcategrelative">
                <div
                  onClick={this.categorydisplaysetter}
                  className="postserviceselectcatname"
                >
                  {this.state.currentlyselectedcategory}
                </div>
                <div
                  style={{ display: this.state.categorydisplay }}
                  className="postserviceselectcatcatcont"
                >
                  {services.map((a, b) => {
                    return (
                      <div
                        onClick={this.currentlyselectedcategorysetter(
                          a.name,
                          b
                        )}
                        className="postserviceselectcatcat"
                      >
                        {a.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="postserviceselectcat">
              <div className="forminputtitlecat"> Select a Subcategory</div>
              <div className="selectcategrelative">
                <div
                  onClick={this.subcategorydisplaysetter}
                  className="postserviceselectcatname"
                >
                  {this.state.currentlyselectedsubcategory}
                </div>
                <div
                  style={{ display: this.state.subcategorydisplay }}
                  className="postserviceselectcatcatcont"
                >
                  {services[this.state.currentlyselectedcategoryindex].children
                    .length > 0 ? (
                    services[
                      this.state.currentlyselectedcategoryindex
                    ].children.map((a, b, c) => {
                      return (
                        <div
                          onClick={this.currentlyselectedsubcategorysetter(a)}
                          className="postserviceselectcatcat"
                        >
                          {a}
                        </div>
                      );
                    })
                  ) : (
                    <div className="postserviceselectcatcat">
                      No Subcategories
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="postserviceaddimg">
              <div className="forminputtitle">Upload an Image</div>
              <div className="postserviceinputimgcont">
                <input
                  ref={a => (this.imageref = a)}
                  className="postserviceinputimg"
                  name="image"
                  type="file"
                ></input>
              </div>
            </div>
            <div className="postservicesubmitcont">
              <div onClick={this.submitservice} className="postservicesubmit">
                Submit
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {};
const mapDispatchToProps = dispatch => ({
  createcard: e => dispatch(createcard(e))
});

export default connect(null, mapDispatchToProps)(Postservice);
