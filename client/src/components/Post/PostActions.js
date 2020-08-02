import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
// import CSS
import "./single-post.css";
// import Component
import PostComment from "./PostComment";

class PostActions extends Component {
  state = {
    likes: 0
  };

  addLike = () => {
    let newCount = this.state.likes + 1;
    this.setState({
      likes: newCount
    });
  };

  render() {
    const { post } = this.props;
    return (
      <div className="post-actions">
        <div className="actions">
          <button
            className="far fa-heart fa-2x action"
            onClick={this.addLike}
          ></button>
          <i className="far fa-comment fa-2x action"></i>
          {/* <i className="far fa-paper-plane fa-2x action"></i>
          <i className="far fa-bookmark fa-2x action"></i> */}
          <i className="fa fa-trash fa-2x action"></i>
        </div>
        <div className="likes">
          {/* <img src={post} className="round-image image-22" /> */}
          <span className="font-weight-bold">
            {(() => {
              const likes = post.likes.length;
              switch (likes) {
                case 0:
                  return null;
                case 1:
                  return <span>1 like</span>;
                default:
                  return <span>{likes} likes</span>;
              }
            })()}
          </span>
        </div>
        <div className="posted-date">
          <Moment format="MMM D YYYY">{post.timePosted}</Moment>
        </div>
        <PostComment></PostComment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.post
});

export default connect(
  mapStateToProps,
  {}
)(PostActions);
