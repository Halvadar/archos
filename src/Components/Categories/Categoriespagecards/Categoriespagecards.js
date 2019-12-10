import React, { Component } from "react";
import "./categoriespagecards.css";
import { connect } from "react-redux";
import { fetchcards, setcards } from "../../../Actions/Actions";

export class Categoriespagecards extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
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
      <div className="categoriespagecards categoriespagecardsmd categoriespagecardslg categoriespagecardsxl">
        {this.props.cardsstate.isfetching ? (
          <h1>loading</h1>
        ) : (
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
                <div className="categoriespagecardtitle flex">{a.title}</div>
                <div className="categoriespagecarddescription flex">
                  {a.description}
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
