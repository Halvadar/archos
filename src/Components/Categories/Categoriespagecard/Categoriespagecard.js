import React, { Component } from "react";
import "./Categoriespagecard.css";
import Categoriespagecategories from "../Categoriespagecategories/Categoriespagecategories";
import { connect } from "react-redux";
import { getcard, ratecard } from "../../../Actions/Actions";
import spin from "./spin.gif";
import star from "./star.svg";
import activestar from "./activestar.svg";
import Categoriespagecomments from "./Categoriespagecomments/Categoriespagecomments";

class Categoriespagecard extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      starstate: 0,
      clicked: false,
      votesent: false,
      maininfowidth: null,
      showemail: false,
      showphone: false,
    };
    this.timeout = undefined;
  }
  componentDidUpdate() {}
  componentDidMount() {
    this.setState({ mounted: true });
    this.props.getcard({ id: this.props.match.params.id }).then((a) => {
      if (this.state.mounted) {
        let maininfowidth = window
          .getComputedStyle(this.imgref)
          .getPropertyValue("width");

        this.setState({
          maininfowidth: maininfowidth,
        });
        window.addEventListener("resize", this.resizefunc);
      }
    });
  }
  componentWillUnmount() {
    this.setState({ mounted: false });
    window.removeEventListener("resize", this.resizefunc);
  }
  resizefunc = () => {
    this.setState({
      maininfowidth: window
        .getComputedStyle(this.imgref)
        .getPropertyValue("width"),
    });
  };
  onmousenterevent = (i) => {
    return () => {
      if (this.state.clicked === false) {
        this.setState({ starstate: i });
      }
    };
  };
  onmouseleaveevent = () => {
    return () => {
      if (this.state.clicked === false) {
        this.setState({ starstate: 0 });
      }
    };
  };
  onclickevent = (i) => {
    return () => {
      clearTimeout(this.timeout);
      if (this.props.currentuser.username) {
        this.props
          .ratecard({ score: i, id: this.props.match.params.id })
          .then(() => {
            this.setState({ votesent: true, votesentfailed: false });
            this.timeout = setTimeout(() => {
              this.setState({ votesent: false });
            }, 5000);
          });
      } else {
        this.setState({ votesentfailed: true, votesent: false });
        this.timeout = setTimeout(() => {
          this.setState({ votesentfailed: false });
        }, 5000);
      }
      this.setState({ starstate: i, clicked: true });
    };
  };
  starbackgroundsetter = (i) => {
    if (i <= this.state.starstate) {
      return true;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="cardpage cardpagemd">
          <Categoriespagecategories
            history={this.props.history}
            page="cardpage"
            location={this.props.location}
          ></Categoriespagecategories>

          <div></div>
          {this.props.card.isfetching ? (
            <div style={{ flexGrow: 1 }}>
              <img
                src={spin}
                width="40px"
                height="40px"
                style={{
                  marginTop: "3rem",
                  marginLeft: "50%",
                }}
              ></img>
            </div>
          ) : this.props.card.card ? (
            <div className="cardpagecard cardpagecardmd cardpagecardlg cardpagecardxl cardpagecardxxl">
              <div className="cardpagecardmaininfo">
                <div
                  className="cardpagecardimage cardpagecardimagemd cardpagecardimagelg cardpagecardimagexl cardpagecardimagexxl"
                  style={{
                    backgroundImage: `url(${this.props.card.card.image})`,
                    height: this.state.maininfowidth
                      ? (this.state.maininfowidth.slice(
                          0,
                          this.state.maininfowidth.length - 2
                        ) *
                          3) /
                          4 +
                        "px"
                      : null,
                  }}
                  ref={(a) => (this.imgref = a)}
                ></div>
                <div
                  style={{ width: this.state.maininfowidth }}
                  className="cardpagecardtitle"
                >
                  {this.props.card.card.title}
                </div>
                <div
                  style={{ width: "90%", background: "gray", height: "1px" }}
                ></div>
                <div
                  style={{ width: this.state.maininfowidth }}
                  className="cardpagecarddescription"
                >
                  {this.props.card.card.description}
                </div>
                <div className="cardpagecardcategory cardpagecardcategorysm">
                  <div className="cardpagecardcategorycategory">
                    <div className="cardpagedisplayflexcolumnchild">
                      Category:
                    </div>
                    <div>{"\xa0" + this.props.card.card.category}</div>
                  </div>
                  <div className="cardpagecardcategorycategory">
                    <div className="cardpagedisplayflexcolumnchild">
                      Subcategory:
                    </div>
                    <div>
                      {this.props.card.card.subcategory
                        ? "\xa0" + this.props.card.card.subcategory
                        : " Not specified"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardpagecardinfo cardpagecardinfomd">
                <div className="cardpagecardemail cardpagedisplayflexcolumn">
                  <div className="cardpagedisplayflexcolumnchild">Email</div>
                  <div ref={(a) => (this.emailref = a)}>
                    {this.props.card.card.email ? (
                      <div
                        className="clicktoseestyle"
                        onMouseLeave={() => {
                          this.setState({ showemail: false });
                        }}
                        onMouseEnter={() => {
                          this.setState({ showemail: true });
                        }}
                      >
                        Click To See
                      </div>
                    ) : (
                      "Not Specified"
                    )}
                  </div>
                  <div
                    style={{
                      display: this.state.showemail ? "initial" : "none",
                    }}
                    className="clicktoseetext"
                  >
                    {this.props.card.card.email}
                  </div>
                </div>
                <div className="cardpagecardphone cardpagedisplayflexcolumn">
                  <div className="cardpagedisplayflexcolumnchild">Phone</div>
                  <div ref={(a) => (this.phoneref = a)}>
                    {this.props.card.card.phone ? (
                      <div
                        className="clicktoseestyle"
                        onMouseLeave={() => {
                          this.setState({ showphone: false });
                        }}
                        onMouseEnter={() => {
                          this.setState({ showphone: true });
                        }}
                      >
                        Click To See
                      </div>
                    ) : (
                      "Not Specified"
                    )}
                  </div>
                  <div
                    style={{
                      display: this.state.showphone ? "initial" : "none",
                    }}
                    className="clicktoseetext"
                  >
                    {this.props.card.card.phone}
                  </div>
                </div>
                <div className="cardpagecarduser cardpagedisplayflexcolumn">
                  <div className="cardpagedisplayflexcolumnchild">
                    Posted By
                  </div>
                  <div>{this.props.card.card.createdby.username}</div>
                </div>
                <div className="cardpagecardscore">
                  {this.props.card.card.score ? (
                    this.props.card.card.score.length > 0 ? (
                      <div className="categoriespagecardscorecont1">
                        <div className="categoriespagecardscore">Rating:</div>
                        <div className="categoriespagecardscoreindex">
                          {(() => {
                            let score = 0;
                            let i = 0;
                            while (i < this.props.card.card.score.length) {
                              score =
                                score +
                                parseFloat(this.props.card.card.score[i].score);
                              i++;
                            }

                            score = score / this.props.card.card.score.length;

                            return score.toFixed(2);
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div>Not rated</div>
                    )
                  ) : (
                    <div>Not rated</div>
                  )}
                </div>
                <div className="cardpagecardratehim">
                  <div className="cardpagecardratehimstars">
                    {(() => {
                      let list = [];
                      for (let i = 1; i <= 5; i++) {
                        list.push(
                          <div
                            onClick={this.onclickevent(i)}
                            onMouseEnter={this.onmousenterevent(i)}
                            onMouseLeave={this.onmouseleaveevent(i)}
                            className="cardpagecardratehimstar"
                          >
                            <img
                              src={
                                this.starbackgroundsetter(i) ? activestar : star
                              }
                              width="20px"
                            ></img>
                          </div>
                        );
                      }
                      return list;
                    })()}
                  </div>
                  <div
                    style={{ display: this.state.votesent ? "flex" : "none" }}
                    className="cardpagecardratehimrate"
                  >
                    Successfully rated
                  </div>
                  <div
                    style={{
                      color: "red",
                      display: this.state.votesentfailed ? "flex" : "none",
                    }}
                    className="cardpagecardratehimrate"
                  >
                    You need to Sign in
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cardpagenocardmessage">
              Card with given ID Doesn't Exist
            </div>
          )}
          <div
            style={{
              height: "1px",
              background: "rgb(196, 196, 196)",
              width: "90%",

              margin: "3rem",
            }}
          ></div>
          <Categoriespagecomments
            match={this.props.match}
            comments={
              this.props.card.card
                ? this.props.card.card.comments
                  ? this.props.card.card.comments
                  : undefined
                : undefined
            }
          ></Categoriespagecomments>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  card: state.setcurrentcard,
  currentuser: state.setcurrentuser,
});

const mapDispatchToProps = (dispatch) => ({
  getcard: (e) => dispatch(getcard(e)),
  ratecard: (e) => dispatch(ratecard(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categoriespagecard);
