import React, { Component } from "react";
import "./Jumbotron.css";
import Desk from "./Desk.jpg";
import happywoman from "./happywoman.jpg";
import happyman from "./happyman.jpg";
import logo from "../../Header/Navbar/logo.svg";

class Jumbotron extends Component {
  render() {
    return (
      <div
        className="jumbsm jumbmd jumblg"
        style={{ backgroundImage: `url(${Desk})` }}
      >
        <div>
          <div className="review">
            <div>
              <img className="reviewimg" src={happywoman}></img>
            </div>
            <div className="textwrapper">
              <p className="speech">
                Archos has completely removed the stress of selecting a service
                provider from my life. Having a broken pipe at home is enough on
                its own to ruin your day.
              </p>
              <p className="author"> - Lynda</p>
            </div>
          </div>
        </div>
        {window.innerWidth >= 1024 ? (
          <div className="centerimage">
            <img src={logo} className="logo" />
          </div>
        ) : (
          <div className="rodcontainer">
            <div className="rod"></div>
          </div>
        )}

        <div>
          <div className="review">
            <img className="reviewimg" src={happyman}></img>
            <div className="textwrapper">
              <p className="speech">
                My wife and I were having a hard time finding qualified people
                for the repairment of our new home. Then My friend showed me
                This website. Finding a quality service provider has never been
                easier since.
              </p>
              <p className="author"> - Joseph </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
