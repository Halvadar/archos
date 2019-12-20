import React, { Component } from "react";
import "./Postservice.css";
import { services } from "../../Categories/Categoriespagecategories/Categoriespagecategories";
import { connect } from "react-redux";
import { createcard } from "../../../Actions/Actions";
import {
  isLength,
  isEmpty,
  isEmail,
  isAlphanumeric,
  isInt,
  blacklist,
  trim,
  matches
} from "validator";
import exclamation from "../../Authenticate/Register/exclamation-mark.svg";
import { format } from "path";
class Postservice extends Component {
  constructor() {
    super();

    this.state = {
      categorydisplay: "hidden",
      subcategorydisplay: "hidden",
      currentlyselectedcategory: "Not Selected",
      currentlyselectedcategoryindex: 0,
      currentlyselectedsubcategory: "Not Selected",
      title: null,
      description: null,
      email: null,
      phone: null,
      category: null,
      image: null,
      showerror: [0, 0, 0, 0, 0, 0, 0],
      closecategrefheight: 0,
      currentlyexpanded: null,
      success: null
    };
    this.redirecttimeout = null;
  }
  componentDidMount() {
    let categname = window
      .getComputedStyle(this.selectcategnameref)
      .getPropertyValue("height");
    let categcateg = window
      .getComputedStyle(this.selectcategcategref)
      .getPropertyValue("height");
    this.setState({
      closecategrefheight:
        parseFloat(categname.slice(0, categname.length - 2)) +
        parseFloat(categcateg.slice(0, categcateg.length - 2))
    });
  }
  componentWillUnmount() {
    clearTimeout(this.redirecttimeout);
  }
  componentDidUpdate() {}
  closecategfunc = e => {
    if (
      e.clientX <
        this[this.state.currentlyexpanded].getBoundingClientRect().left ||
      e.clientX >
        this[this.state.currentlyexpanded].getBoundingClientRect().right ||
      e.clientY <
        this[this.state.currentlyexpanded].getBoundingClientRect().top ||
      e.clientY >
        this[this.state.currentlyexpanded].getBoundingClientRect().bottom
    ) {
      this.setState({
        categorydisplay: "hidden",
        subcategorydisplay: "hidden"
      });
      window.removeEventListener("mousedown", this.closecategfunc);
    }
  };
  categorydisplaysetter = () => {
    console.log(this.state.closecategrefheight);
    this.setState({ subcategorydisplay: "hidden" });
    if (this.state.categorydisplay === "hidden") {
      this.setState({
        categorydisplay: "initial",
        currentlyexpanded: "closecategref"
      });
      window.addEventListener("mousedown", this.closecategfunc);
    } else {
      this.setState({ categorydisplay: "hidden" });
      window.removeEventListener("mousedown", this.closecategfunc);
    }
  };
  subcategorydisplaysetter = () => {
    this.setState({ categorydisplay: "hidden" });
    if (this.state.subcategorydisplay === "hidden") {
      this.setState({
        subcategorydisplay: "initial",
        currentlyexpanded: "closesubcategref"
      });
      window.addEventListener("mousedown", this.closecategfunc);
    } else {
      this.setState({ subcategorydisplay: "hidden" });
      window.removeEventListener("mousedown", this.closecategfunc);
    }
  };

  currentlyselectedcategorysetter = (a, b) => {
    return () => {
      this.setState({
        currentlyselectedcategory: a,
        currentlyselectedcategoryindex: b
      });
      this.setState({
        categorydisplay: "hidden",
        currentlyselectedsubcategory: "Not Selected"
      });
      window.removeEventListener("mousedown", this.closecategfunc);
    };
  };

  currentlyselectedsubcategorysetter = a => {
    return () => {
      this.setState({
        currentlyselectedsubcategory: a,
        subcategorydisplay: "hidden"
      });
      window.removeEventListener("mousedown", this.closecategfunc);
    };
  };

  currenttitledescription = () => {
    if (this.titleref.value.length > 0) {
      return {
        title: trim(this.titleref.value),
        description: trim(this.descriptionref.value)
      };
    }
    return null;
  };
  currentemail = () => {
    return this.emailref.value.length > 0 ? { email: this.emailref.value } : {};
  };
  currentphone = () => {
    return this.phoneref.value.length > 0
      ? { phone: parseInt(this.phoneref.value) }
      : {};
  };
  submitservice = async () => {
    if (
      !this.validationfunc(
        { arg: this.titleref.value, name: "title", length: 100 },
        { arg: this.descriptionref.value, name: "description", length: 2000 },
        { arg: this.emailref.value, name: "email", length: 50 },
        { arg: this.phoneref.value, name: "phone", length: 20 }
      )
    ) {
      let res;
      res = await this.props.createcard({
        ...this.currenttitledescription(),
        ...this.currentemail(),
        ...this.currentphone(),
        category: this.state.currentlyselectedcategory,
        subcategory: this.state.currentlyselectedsubcategory,
        image: this.imageref.files[0]
      });
      console.log(res);
      if (res) {
        this.setState({ success: true });
        this.redirecttimeout = setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      }
    }
  };
  loginwidthsetter = () => {
    let i = window.innerWidth;

    if (i >= 1920) {
      return "30%";
    } else if (i >= 1660) {
      return "35%";
    } else if (i >= 1440) {
      return "40%";
    } else if (i >= 1024) {
      return "50%";
    } else if (i >= 768) {
      return "70%";
    } else if (i >= 500) {
      return "90%";
    }
    return "100%";
  };

  validationfuncext = args => {
    let { arg, name, length } = args;

    let errors = [];
    if (name !== "phone" && name !== "email") {
      if (isEmpty(arg)) {
        errors.push("Input is Empty");
      }
    }

    if (!isLength(arg, { max: length })) {
      errors.push(`${name} is Too Long`);
    }
    if (name === "email") {
      if (isEmpty(this.phoneref.value)) {
        if (isEmpty(arg)) {
          errors.push(
            "Both Email and phone cant be empty. please sing at least one of them "
          );
        }
      }
      if (!isEmpty(arg)) {
        if (!isEmail(arg)) {
          errors.push("Email needs to be in a given format - aaa@gmail.com");
        }
      }
    }
    if (name !== "phone" && name !== "email" && name !== "description") {
      if (!isAlphanumeric(blacklist(arg, " "))) {
        errors.push(`${name} can only contain letters and numbers`);
      }
    } else if (name === "phone") {
      if (!isEmpty(arg)) {
        if (!isInt(arg)) {
          errors.push(`${name} can only contain numbers`);
        }
      } else {
        if (isEmpty(this.emailref.value)) {
          errors.push(
            "Both Email and phone cant be empty. please sing at least one of them "
          );
        }
      }
    } else if (name === "description") {
      if (matches(arg, /<script>/i)) {
        errors.push("Invalid input");
      }
    }
    if (errors.length > 0) {
      this.setState(prevstate => {
        prevstate[name] = errors;

        return prevstate;
      });
      return true;
    } else {
      this.setState(prevstate => {
        prevstate[name] = null;
        return prevstate;
      });
      return false;
    }
  };

  validationfunc = (...args) => {
    console.log(this.imageref.files);
    let imageerrors = [];
    let errorexists = false;
    args.forEach((a, b) => {
      if (this.validationfuncext(a)) {
        if (!errorexists) {
          errorexists = true;
        }
      }
    });
    if (this.state.currentlyselectedcategory === "Not Selected") {
      this.setState({ category: ["Category is not selected"] });
      if (!errorexists) {
        errorexists = true;
      }
    } else {
      this.setState({ category: null });
    }
    if (this.imageref.files.length !== 0) {
      if (
        this.imageref.files[0].type !== "image/jpeg" &&
        this.imageref.files[0].type !== "image/png" &&
        this.imageref.files[0].type !== "image/svg"
      ) {
        imageerrors.push(
          "File type is not Supported. Select image file in given format:.PNG/.JPEG/.SVG"
        );
        if (!errorexists) {
          errorexists = true;
        }
      }
      if (this.imageref.files[0].size > 4000000) {
        imageerrors.push("Image is too big");
        if (!errorexists) {
          errorexists = true;
        }
      }
    }
    if (imageerrors.length > 0) {
      this.setState({ image: imageerrors });
    } else {
      this.setState({ image: null });
    }
    if (errorexists) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="addaservice">
          <div>Add a New Service</div>
        </div>

        <div className="postservicecontcont">
          <div
            className="postservicecont"
            style={{ width: this.loginwidthsetter() }}
          >
            {!this.state.success ? (
              <React.Fragment>
                <div
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                  className="postserviceinputtitle"
                >
                  <div className="forminputtitle">Title</div>
                  <div
                    className="postserviceinput"
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%" }
                        : {}
                    }
                  >
                    <input
                      onChange={() => {
                        this.validationfuncext({
                          arg: this.titleref.value,
                          name: "title",
                          length: 100
                        });
                      }}
                      style={{ width: "100%", border: 0, height: "100%" }}
                      ref={a => (this.titleref = a)}
                    ></input>
                    <div className="inputerrorsmark">
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[0] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          background: "white",
                          paddingRight: "2px",
                          display: this.state.title ? "initial" : "none"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[0] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.title && this.state.title[0]}
                    </div>
                  </div>
                </div>
                <div
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                  className="postserviceinputdescription"
                >
                  <div className="forminputtitle">Description</div>
                  <div
                    className="postserviceinput"
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%", height: "5rem" }
                        : {}
                    }
                  >
                    <textarea
                      onChange={() => {
                        this.validationfuncext({
                          arg: this.descriptionref.value,
                          name: "description",
                          length: 2000
                        });
                      }}
                      style={{
                        width: "100%",
                        border: 0,
                        height: "100%",
                        resize: "none"
                      }}
                      ref={a => (this.descriptionref = a)}
                    ></textarea>
                    <div
                      style={{
                        display: this.state.description ? "initial" : "none"
                      }}
                      className="inputerrorsmark"
                    >
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[1] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          background: "white",
                          paddingRight: "2px"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[1] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.description && this.state.description[0]}
                    </div>
                  </div>
                </div>
                <div
                  className="postserviceselectcat"
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                >
                  <div className="forminputtitlecat">Select a Category</div>
                  <div
                    className="selectcategrelative"
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%" }
                        : {}
                    }
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        zIndex: -100,
                        height: this.state.closecategrefheight + "px"
                      }}
                      ref={a => (this.closecategref = a)}
                    ></div>
                    <div style={{ width: "100%", border: 0, height: "100%" }}>
                      <div
                        ref={a => (this.selectcategnameref = a)}
                        onClick={this.categorydisplaysetter}
                        className="postserviceselectcatname"
                      >
                        {this.state.currentlyselectedcategory}
                      </div>
                      <div
                        ref={a => (this.selectcategcategref = a)}
                        style={{ visibility: this.state.categorydisplay }}
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
                    <div
                      className="inputerrorsmark"
                      style={{
                        background: "rgb(0, 183, 255)",
                        border: 0,
                        display: this.state.category ? "initial" : "none"
                      }}
                    >
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[2] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          paddingRight: "2px",
                          display: this.state.title ? "initial" : "none"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[2] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.category && this.state.category[0]}
                    </div>
                  </div>
                </div>
                <div
                  className="postserviceselectcat"
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                >
                  <div className="forminputtitlecat"> Select a Subcategory</div>
                  <div
                    className="selectcategrelative"
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%" }
                        : {}
                    }
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        zIndex: -100,
                        height: this.state.closecategrefheight + "px"
                      }}
                      ref={a => (this.closesubcategref = a)}
                    ></div>
                    <div style={{ width: "100%", border: 0, height: "100%" }}>
                      <div
                        onClick={this.subcategorydisplaysetter}
                        className="postserviceselectcatname"
                      >
                        {this.state.currentlyselectedsubcategory}
                      </div>
                      <div
                        style={{ visibility: this.state.subcategorydisplay }}
                        className="postserviceselectcatcatcont"
                      >
                        {services[this.state.currentlyselectedcategoryindex]
                          .children.length > 0 ? (
                          services[
                            this.state.currentlyselectedcategoryindex
                          ].children.map((a, b, c) => {
                            return (
                              <div
                                onClick={this.currentlyselectedsubcategorysetter(
                                  a
                                )}
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
                </div>
                <div
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                  className="postserviceinputtitle"
                >
                  <div className="forminputtitle">Contact Email</div>
                  <div
                    className="postserviceinput"
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%" }
                        : {}
                    }
                  >
                    <input
                      onChange={() => {
                        this.validationfuncext({
                          arg: this.emailref.value,
                          name: "email",
                          length: 50
                        });
                        this.validationfuncext({
                          arg: this.phoneref.value,
                          name: "phone",
                          length: 20
                        });
                      }}
                      style={{ width: "100%", border: 0, height: "100%" }}
                      ref={a => (this.emailref = a)}
                    ></input>

                    <div
                      className="inputerrorsmark"
                      style={{ display: this.state.email ? "initial" : "none" }}
                    >
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[4] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          background: "white",
                          paddingRight: "2px"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[4] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.email && this.state.email[0]}
                    </div>
                  </div>
                </div>
                <div
                  style={
                    window.innerWidth <= 500
                      ? {
                          height: "fit-content",
                          flexDirection: "column"
                        }
                      : {}
                  }
                  className="postserviceinputtitle"
                >
                  <div className="forminputtitle">Contact Phone</div>
                  <div
                    style={
                      window.innerWidth <= 768
                        ? { margin: 0, width: "100%" }
                        : {}
                    }
                    className="postserviceinput"
                  >
                    <input
                      onChange={() => {
                        this.validationfuncext({
                          arg: this.emailref.value,
                          name: "email",
                          length: 50
                        });
                        this.validationfuncext({
                          arg: this.phoneref.value,
                          name: "phone",
                          length: 20
                        });
                      }}
                      style={{ width: "100%", border: 0, height: "100%" }}
                      ref={a => (this.phoneref = a)}
                    ></input>
                    <div
                      className="inputerrorsmark"
                      style={{ display: this.state.phone ? "initial" : "none" }}
                    >
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[5] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          background: "white",
                          paddingRight: "2px"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[5] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.phone && this.state.phone[0]}
                    </div>
                  </div>
                </div>
                <div className="postserviceaddimg">
                  <div className="forminputtitle">Upload an Image</div>
                  <div className="postserviceinputimgcont">
                    <input
                      className="postserviceinputimg"
                      ref={a => (this.imageref = a)}
                      name="image"
                      type="file"
                    ></input>
                    <div
                      className="inputerrorsmark"
                      style={{
                        display: this.state.image ? "initial" : "none",
                        background: "rgb(194, 241, 255)"
                      }}
                    >
                      <img
                        onMouseEnter={() => {
                          this.setState(prevstate => {
                            prevstate.showerror[6] = 1;
                            return { showerror: prevstate.showerror };
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({ showerror: [0, 0, 0, 0, 0, 0, 0] });
                        }}
                        style={{
                          paddingRight: "2px"
                        }}
                        src={exclamation}
                        width="20px"
                      ></img>
                    </div>
                    <div
                      style={{
                        display: this.state.showerror[6] ? "initial" : "none"
                      }}
                      className="inputerrors"
                    >
                      {this.state.image && this.state.image[0]}
                    </div>
                  </div>
                </div>
                <div className="postservicesubmitcont">
                  <div
                    style={{ width: window.innerWidth <= 500 ? "40%" : null }}
                    onClick={this.submitservice}
                    className="postservicesubmit"
                  >
                    Submit
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div
                style={{ color: "rgb(77, 179, 68)" }}
                className="manageaccountmessages"
              >
                Service Added
              </div>
            )}
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
