import React, { Component } from "react";
import "./categoriespagecards.css";
import { connect } from "react-redux";
import { fetchcards, setcards } from "../../../Actions/Actions";
import spin from "../Categoriespagecard/spin.gif";

export class Categoriespagecards extends Component {
  componentDidMount() {}
  componentDidUpdate(prevprops) {
    if (this.props.cardsstate.focuscards !== prevprops.cardsstate.focuscards) {
      this.cardscontref.scrollIntoView();
    }
  }
  cardinfo = e => {
    return () => {
      this.props.history.push(`cardinfo/${e}`);
    };
  };
  render() {
    let filteredcards = this.props.cardsstate.cards.filter((a, b) => {
      if (a.title.includes(this.props.cardsstate.filterinput)) {
        return a;
      }
    });
    return (
      <div
        ref={a => (this.cardscontref = a)}
        className="categoriespagecards categoriespagecardsmd categoriespagecardslg categoriespagecardsxl"
      >
        {this.props.cardsstate.isfetching ? (
          <img
            src={spin}
            width="40px"
            height="40px"
            style={{ marginTop: "3rem" }}
          ></img>
        ) : filteredcards.length > 0 ? (
          filteredcards.map((a, b) => {
            return (
              <div
                onClick={this.cardinfo(a._id)}
                className="categoriespagecard"
                key={a._id}
              >
                <div
                  className="categoriespagecardimage flex"
                  style={{ backgroundImage: `url(${a.image})` }}
                ></div>
                <div className="categoriespagecardtitle flex">
                  <div
                    style={{
                      overflow: "hidden",
                      width: "100%",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {a.title}
                  </div>
                </div>
                <div className="categoriespagecarddescription">
                  <div
                    style={{
                      overflow: "hidden",
                      height: "100%",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {a.description}
                  </div>
                </div>
                <div className="categoriespagecardscorecont">
                  {a.score !== "Not Rated" ? (
                    <div className="categoriespagecardscorecont1">
                      <div className="categoriespagecardscore">Rating:</div>
                      <div className="categoriespagecardscoreindex">
                        {a.score}
                      </div>
                    </div>
                  ) : (
                    <div>Not rated</div>
                  )}

                  <div className="categoriespagecardseemore">See more...</div>
                </div>
              </div>
            );
          })
        ) : this.props.cardsstate.category === "all" ? (
          <div className="nocards" style={{ color: "rgb(129, 197, 129)" }}>
            Choose a category
          </div>
        ) : (
          <div className="nocards">No Cards Found</div>
        )}
      </div>
    );
  }
}
const mapsStateToProps = state => ({
  cardsstate: { ...state.getcards }
});

const mapDispatchToProps = dispatch => ({
  getcards: e => dispatch(fetchcards(e))
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Categoriespagecards);
