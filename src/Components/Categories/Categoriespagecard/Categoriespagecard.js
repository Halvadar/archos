import React, { Component } from "react";
import "./Categoriespagecard.css";
import Categoriespagecategories from "../Categoriespagecategories/Categoriespagecategories";
import { connect } from "react-redux";
import { getcard } from "../../../Actions/Actions";
import spin from "./spin.gif";
import star from "./star.svg";
import activestar from "./activestar.svg";

class Categoriespagecard extends Component {
  constructor() {
    super();
    this.state = {
      starstate: 0,
      clicked: false
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    console.log(this.props.card);
    this.props.getcard({ id: this.props.match.params.id });
  }
  onmousenterevent = i => {
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
  onclickevent = i => {
    return () => {
      this.setState({ starstate: i, clicked: true });
    };
  };
  starbackgroundsetter = i => {
    if (i <= this.state.starstate) {
      return true;
    }
  };

  render() {
    return (
      <div className="cardpage cardpagemd">
        <Categoriespagecategories
          location={this.props.location}
        ></Categoriespagecategories>

        <div></div>
        {this.props.card.isfetching ? (
          <div style={{ gridColumn: "span 5", textAlign: "center" }}>
            <img src={spin} width="20px" alt="" />
          </div>
        ) : this.props.card.card ? (
          <div className="cardpagecard">
            <div className="cardpagecardmaininfo">
              <div
                className="cardpagecardimage"
                style={{
                  backgroundImage: `url(${this.props.card.card.image})`
                }}
              ></div>
              <div className="cardpagecardtitle">
                {" "}
                {this.props.card.card.title}
              </div>
              <div
                style={{ width: "90%", background: "gray", height: "1px" }}
              ></div>
              <div className="cardpagecarddescription">
                {this.props.card.card.description}
              </div>
              <div className="cardpagecardcategory">
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
            <div className="cardpagecardinfo">
              <div className="cardpagecardemail cardpagedisplayflexcolumn">
                <div className="cardpagedisplayflexcolumnchild">Email</div>
                <div>
                  {this.props.card.card.email
                    ? this.props.card.card.email
                    : "Not Specified"}
                </div>
              </div>
              <div className="cardpagecardphone cardpagedisplayflexcolumn">
                <div className="cardpagedisplayflexcolumnchild">Phone</div>
                <div>
                  {this.props.card.card.phone
                    ? this.props.card.card.phoen
                    : "Not Specifed"}
                </div>
              </div>
              <div className="cardpagecarduser cardpagedisplayflexcolumn">
                <div className="cardpagedisplayflexcolumnchild">Posted By</div>
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
                          while (i < this.props.card.card.score.length - 1) {
                            i++;
                            score =
                              score + parseFloat(this.props.card.card.score[i]);

                            console.log(
                              parseFloat(this.props.card.card.score[i])
                            );
                          }
                          score = score / this.props.card.card.score.length;
                          console.log(score);
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
                <div className="cardpagecardratehimrate"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cardpagenocardmessage">
            Card with given ID Doesn't Exist
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  card: state.setcurrentcard
});

const mapDispatchToProps = dispatch => ({
  getcard: e => dispatch(getcard(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categoriespagecard);
