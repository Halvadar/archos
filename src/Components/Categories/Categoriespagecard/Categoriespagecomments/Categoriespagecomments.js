import React, { Component } from "react";
import "./Categoriespagecomments.css";
import { connect } from "react-redux";
import { comment } from "../../../../Actions/Actions";

class Categoriespagecomments extends Component {
  constructor() {
    super();
    this.state = {
      invalidcomment: false
    };
    this.timeout = undefined;
  }

  submitcomment = () => {
    clearTimeout(this.timeout);
    this.setState({ invalidcomment: false });
    if (this.commentref.value.length > 0) {
      this.props.comment({
        id: this.props.match.params.id,
        comment: this.commentref.value
      });
    } else {
      this.setState({ invalidcomment: true });
      this.timeout = setTimeout(() => {
        this.setState({ invalidcomment: false });
      }, 1500);
    }
  };
  

  render() {
    return (
      <div className="cateogriespagecommentscont categoriespagecommentsinputcontmd categoriespagecommentsinputcontlg categoriespagecommentsinputcontxl categoriespagecommentsinputcontxxl">
        <div className="categoriespagecommentsinputcont ">
          <textarea
            placeholder={this.state.invalidcomment ? "Input is empty" : null}
            ref={a => (this.commentref = a)}
            className="categoriespagecommentsinput"
          ></textarea>
        </div>

        <div
          onClick={this.submitcomment}
          className="categoriespagecommentsbutton"
        >
          Add Comment
        </div>
        <div
          style={{
            width: "100%",
            background: "rgb(206, 206, 206)",
            height: "1px",
            marginBottom: "1rem"
          }}
        ></div>
        <div className="categoriepagecommentscommentscont">
          {(() => {
            if (this.props.comments) {
              if (this.props.comments.length > 0) {
                return this.props.comments.map(comment => {
                  return (
                    <div className="categoriespagecommentscomment">
                      <div className="categoriespagecommentauthor">
                        {comment.commentedby.username}
                      </div>
                      {comment.comment}
                      <div
                        style={{
                          textAlign: "end",
                          color: "rgb(147, 212, 255)"
                        }}
                      >
                        {new Date(parseInt(comment.date)).toDateString()}
                      </div>
                    </div>
                  );
                });
              } else {
                return (
                  <div
                    style={{
                      width: "100%",
                      color: "green",
                      textAlign: "center"
                    }}
                  >
                    Be The first to comment!
                  </div>
                );
              }
            } else {
              return (
                <div
                  style={{ width: "100%", color: "green", textAlign: "center" }}
                >
                  Be The first to comment!
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  comment: e => dispatch(comment(e))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categoriespagecomments);
