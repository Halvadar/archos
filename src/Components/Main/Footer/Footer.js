import React, { Component } from "react";
import "./Footer.css";
import facebook from "./facebook.svg";
import twitter from "./twitter.svg";
import gmail from "./gmail.svg";
import copyright from "./copyright.svg";

class Footer extends Component {
  render() {
    return (
      <div className="custfooter custfootermd custfooterlg">
        <div className="footergriditem">
          <div className="contactscont">
            <div style={{ paddingLeft: "10%" }}>Contact us</div>
            <div className="contactitem">
              <img className="contactitemimg" src={facebook}></img>
              Facebook/Archos
            </div>
            <div className="contactitem">
              <img className="contactitemimg" src={twitter}></img>
              twitter/archos
            </div>
            <div className="contactitem">
              <img className="contactitemimg" src={gmail}></img>
              Archos@gmail.com
            </div>
          </div>
        </div>
        <div className="footergriditem">
          <div>Terms</div>
          <div>Advertise</div>
          <div>About</div>
        </div>
        <div className="footergriditem">
          <div className="copyright">
            <img src={copyright} />
            2019 Archos
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
