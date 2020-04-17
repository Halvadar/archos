import React, { Component } from "react";
import "./Categoriespagecomments.css";
import { connect } from "react-redux";
import { comment } from "../../../../Actions/Actions";

class Categoriespagecomments extends Component {
  constructor() {
    super();
    this.state = {
      invalidcomment: false,
      errormessagestate: "hidden",
    };
    this.timeout = undefined;
  }

  componentDidMount() {}

  submitcomment = () => {
    clearTimeout(this.timeout);
    this.setState({ invalidcomment: false });
    if (this.commentref.value.length > 0) {
      if (this.props.currentuser.username) {
        this.props.comment({
          id: this.props.match.params.id,
          comment: this.commentref.value,
        });
        this.commentref.value = "";
        this.setState({ errormessagestate: "hidden" });
      } else {
        this.setState({ errormessagestate: "initial" });
      }
    } else {
      this.setState({ invalidcomment: true, errormessagestate: "hidden" });
      this.timeout = setTimeout(() => {
        this.setState({ invalidcomment: false });
      }, 1500);
    }
  };

  render() {
    return (
      <div className="cateogriespagecommentscont categoriespagecommentsinputcontmd categoriespagecommentsinputcontlg categoriespagecommentsinputcontxl categoriespagecommentsinputcontxxl">
        <div
          style={{
            color: "rgb(255, 117, 117)",
            margin: "1rem",
            fontWeight: 600,
            visibility: this.state.errormessagestate,
            alignSelf: "center",
          }}
        >
          You need to be Signed in
        </div>
        <div className="categoriespagecommentsinputcont ">
          <textarea
            className="categoriespagecommentsinput"
            placeholder={this.state.invalidcomment ? "Input is empty" : null}
            ref={(a) => (this.commentref = a)}
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
            marginBottom: "1rem",
          }}
        ></div>
        <div className="categoriepagecommentscommentscont">
          {(() => {
            if (this.props.comments) {
              if (this.props.comments.length > 0) {
                return this.props.comments.map((comment) => {
                  return (
                    <div className="categoriespagecommentscomment">
                      <div className="categoriespagecommentauthor">
                        {comment.commentedby.username}
                      </div>
                      {comment.comment}
                      <div
                        style={{
                          textAlign: "end",
                          color: "rgb(147, 212, 255)",
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
                      textAlign: "center",
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
const mapStateToProps = (state) => ({
  currentuser: state.setcurrentuser,
});

const mapDispatchToProps = (dispatch) => ({
  comment: (e) => dispatch(comment(e)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categoriespagecomments);
