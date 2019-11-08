import React, { Component } from "react";
import "./Footer.css";
import facebook from "./facebook.svg";
import twitter from "./twitter.svg";
import gmail from "./gmail.svg";
import copyright from "./copyright.svg";

class Footer extends Component {
  render() {
    return (
      <div className="custfooter">
        <div className="custfootersm custfootermd custfooterlg">
          <div className="footergriditem">
            <div className="contactcontact">Contact us</div>
            <div className="contactscont">
              <div className="contactitem">
                <img className="contactitemimg" src={facebook}></img>
                <div>Facebook/Archos</div>
              </div>
              <div className="contactitem">
                <img className="contactitemimg" src={twitter}></img>

                <div>twitter/archos</div>
              </div>
              <div className="contactitem">
                <img className="contactitemimg" src={gmail}></img>
                <div>Archos@gmail.com</div>
              </div>
            </div>
          </div>
          {window.innerWidth >= 768 ? (
            <div className="footergriditem">
              <div className="copyright">
                <img src={copyright} />
                2019 Archos
              </div>
            </div>
          ) : null}

          <div className="footergriditem">
            <div className="aboutcont">
              <div className="aboutitem">Terms</div>
              <div className="aboutitem">Advertise</div>
              <div className="aboutitem">About</div>
            </div>
          </div>
        </div>
        {window.innerWidth < 768 ? (
          <div className="footergriditem">
            <div className="copyright">
              <img src={copyright} />
              2019 Archos
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Footer;
