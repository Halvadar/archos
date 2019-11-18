import React, { Component } from "react";
import "./categoriespagecards.css";
import { connect } from "react-redux";
import { fetchcards, setcards } from "../../../Actions/Actions";

export class Categoriespagecards extends Component {
  componentDidMount() {
    this.props.getcards({ category: "asds", subcategory: "asd" });
  }
  render() {
    return (
      <div className="categoriespagecards categoriespagecardsmd categoriespagecardslg categoriespagecardsxl">
        {this.props.cardsstate.isfetching ? (
          <h1>loading</h1>
        ) : (
          this.props.cardsstate.cards.map((a, b) => {
            console.log(a.score);
            return (
              <div className="categoriespagecard" key={a._id}>
                <div
                  className="categoriespagecardimage flex"
                  style={{ backgroundImage: `url(${a.image})` }}
                ></div>
                <div className="categoriespagecardtitle flex">{a.title}</div>
                <div className="categoriespagecarddescription flex">
                  {a.description}
                </div>
                <div className="categoriespagecardscorecont">
                  {a.score ? (
                    a.score.length > 0 ? (
                      <div className="categoriespagecardscorecont1">
                        <div className="categoriespagecardscore">Rating:</div>
                        <div className="categoriespagecardscoreindex">
                          {(() => {
                            let score = 0;
                            let i = 0;
                            while (i < a.score.length - 1) {
                              i++;
                              score = score + parseFloat(a.score[i]);
                              console.log(parseFloat(a.score[i]));
                            }
                            score = score / a.score.length;
                            console.log(score);
                            return score.toString();
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div>Not rated</div>
                    )
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
