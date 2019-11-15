import React, { Component } from "react";
import "./categoriespagecards.css";
import { connect } from "react-redux";
import { fetchcards, setcards } from "../../../Actions/Actions";

export class Categoriespagecards extends Component {
  componentDidMount() {
    console.log(this.props.location.pathname);
    this.props.getcards();
  }
  render() {
    return (
      <div className="categoriespagecards">
        {this.props.cardsstate.isfetching ? (
          <h1>loading</h1>
        ) : (
          this.props.cardsstate.cards.map((a, b) => {
            return (
              <div className="categoriespagecard">
                <div className="categoriespagecardimage"></div>
                <div className="categoriespagecardtitle">{a.title}</div>
                <div className="categoriespagecarddescription">
                  {a.description}
                </div>
                <div className="categoriespagecardscore">
                  {(() => {
                    let score = 0;
                    let i = 0;
                    while (i < a.score.length) {
                      i++;
                      score = score + a.score[i];
                    }
                    score = score / a.score.length;
                    console.log(score);
                    return i.toString();
                  })()}
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
