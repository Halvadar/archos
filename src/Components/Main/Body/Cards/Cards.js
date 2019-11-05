import React, { Component } from "react";
import "./Cards.css";
import electrician from "./electrician.jpg";
import lawyer from "./lawyer.jpg";
import locksmith from "./locksmith.jpg";

class Cards extends Component {
  render() {
    return (
      <div className="cardscont">
        <div className="cards cardslg cardsmd ">
          <div className="custcard">
            <div
              className="imgcontainer"
              style={{ backgroundImage: `url(${electrician})` }}
            ></div>
            <div className="title">Jeremy Woltamper</div>
            <div className="cardtext">
              I was struck by lightning when i was 7. I can feel electricity
              since then. Later, The event dictated my career choice too. You
              won't find many electricians with this ability in here.
            </div>
          </div>
          <div className="custcard">
            <div
              className="imgcontainer"
              style={{ backgroundImage: `url(${lawyer})` }}
            ></div>

            <div className="title">Chad Longstool</div>
            <div className="cardtext">
              I've saved quite a lot of suspected murderers in my time. No
              prosecutor can Match with this convincing lying face.
            </div>
          </div>
          <div className="custcard">
            <div
              className="imgcontainer"
              style={{ backgroundImage: `url(${locksmith})` }}
            ></div>

            <p className="title">Johan Mcfertilizer</p>
            <p className="cardtext">
              Been to jail 7 times. 7 out of 7 times i got out. my expertize
              counts 20 years. no lock stands in my way.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
