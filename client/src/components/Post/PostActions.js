import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
// import CSS
import "./single-post.css";
// import Component
import PostComment from "./PostComment";
import PropTypes from 'prop-types';
import {addLike, removeLike} from '../../actions/postActions';

class PostActions extends Component {
  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth } = this.props;
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
          {
            (post.postedBy._id !== this.props.auth.user.id) 
            ? (<i className="fa fa-trash fa-2x action d-none"></i>) 
            : (<i className="fa fa-trash fa-2x action"></i>)   
          }       
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

PostActions.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {addLike, removeLike}
)(PostActions);
