import React, { Component } from "react";
import "./Postedservices.css";
import { connect } from "react-redux";
import { postedcards } from "../../../Actions/Actions";
class Postedservices extends Component {
  componentDidMount() {
    this.props.getpostedcards();
  }
  componentDidUpdate() {}
  render() {
    return (
      <React.Fragment>
        <div className="yourpostedservices">Your Posted Services</div>
        <div className="categoriespagecards categoriespagecardsmd categoriespagecardslg categoriespagecardsxl">
          {this.props.cardsstate.isfetching ? (
            <h1>loading</h1>
          ) : this.props.cardsstate.cards.length > 0 ? (
            this.props.cardsstate.cards.map((a, b, c) => {
              return (
                <div
                  onClick={() => {
                    this.props.history.push(`/cardinfo/${a._id}`);
                  }}
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
          ) : (
            <div> You have no Services posted</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cardsstate: state.getpostedcards
});

const mapDispatchToProps = dispatch => ({
  getpostedcards: () => dispatch(postedcards())
});

export default connect(mapStateToProps, mapDispatchToProps)(Postedservices);
