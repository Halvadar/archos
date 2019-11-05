import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import electrician from "./electrician.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";
import logo from "../Header/Navbar/logo.svg";
import CustomerHappiness from "./CustomerHappiness.jpg";
import "./Body.css";
import Desk from "./Desk.jpg";
import underline from "./underline.svg";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import lawyer from "./lawyer.jpg";
import locksmith from "./locksmith.jpg";

export default class Body extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <Jumbotron
            style={{
              backgroundImage: `url(${Desk})`,
              backgroundSize: "cover",
              backgroundPositionY: "50%",
              height: "300px"
            }}
            className="jumo w-90 d-flex flex-column justify-content-center align-items-center center "
          ></Jumbotron>
          <div className="dividiv">
            <img src={logo} width="15%" />

            <p style={{ display: "inline-block" }}>
              Get The Best Services In Town
              <div
                style={{
                  background: "rgb(10, 10, 18)",
                  width: "100%",
                  height: "1px"
                }}
              ></div>
            </p>
          </div>
          <div className="talkimage">
            <img style={{ borderRadius: "50%" }} width="30%" src={image1} />-
            Archos has completely removed the stress of selecting a service
            provider from my life. Having a broken pipe at home is enough on its
            own to ruin your day.
            <p
              style={{
                alignSelf: "flex-end",
                margin: "6px",
                fontSize: "1.2rem",
                color: "rgb(43, 41, 41)"
              }}
            >
              - Lynda
            </p>
          </div>
          <div
            className="talkimage"
            style={{
              paddingLeft: "1%",
              borderLeft: "1px solid rgb(150, 150, 150)",
              borderRight: "0px",
              left: "70%",
              top: "10%",
              color: "white"
            }}
          >
            <img style={{ borderRadius: "50%" }} width="30%" src={image2} />- My
            wife and I were having a hard time finding qualified people for the
            repairment of our new home. Then My friend showed me This website.
            Finding a quality service provider has never been easier since.
            <p
              style={{
                alignSelf: "flex-end",
                margin: "6px",
                fontSize: "1.2rem",
                color: "rgb(150, 150, 150)"
              }}
            >
              - Joseph
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <CardDeck className="justify-content-center w-75">
            <Card className="Card">
              <Card.Img variant="top" src={electrician}></Card.Img>
              <Card.Body>
                <Card.Title className="">Jeremy Mcwoltamper</Card.Title>
                <Card.Text style={{}}>
                  I was struck by lightning when i was 7. I can feel electricity
                  since then. Later, The event dictated my career choice too.
                  You won't find many electricians with this ability in here.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="Card">
              <Card.Img variant="top" src={lawyer}></Card.Img>
              <Card.Body>
                <Card.Title>Chad Longstool</Card.Title>
                <Card.Text style={{}} className="well">
                  I've saved quite a lot of suspected murderers in my time. No
                  prosecutor can Match with this convincing lying face.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="Card">
              <Card.Img variant="top" src={locksmith}></Card.Img>
              <Card.Body>
                <Card.Title>Johan Mcfertilizer</Card.Title>
                <Card.Text>
                  I'll unlock any lock efficiently and unharmfully, without
                  doing any damage to the lock. My expertize counts 10 years.
                  ive unlocked quite a lot of locks in that time. So, hire me
                  and you'll most definatelly not be left unsatisfied!
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      </React.Fragment>
    );
  }
}
