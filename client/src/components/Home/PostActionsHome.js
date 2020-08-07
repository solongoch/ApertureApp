import React, { Component } from "react";
import Moment from "react-moment";
// import CSS
import "../Post/single-post.css";
// import Component
import PostComment from "../Post/PostComment";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from 'classnames';
import {deletePostById} from '../../actions/postActions';
import {addLikeHome} from '../../actions/homeActions';
import '../Post/postactions.css';
import { withRouter } from 'react-router-dom';

class PostActionsHome extends Component {

  onLikeClick(id) {
    this.props.addLikeHome(id, this.props.history);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Calling deletePostById action
  // @input : PostId, username and history
  handleDeletePost = (postId) => {
    let username = this.props.auth.user.username;
    this.props.deletePostById(postId, username, this.props.history)
  }

  render() {

    const { post, auth } = this.props
    var postedById = null;
    var postId = null;
    if (post.postedBy) {
      postedById = post.postedBy._id;
      postId = post._id
    }
   const showThrashIcon = (<i className="fa fa-trash fa-2x action" onClick={this.handleDeletePost.bind(this, postId)}  ></i>);

    return (
      <div>
        <div className="actions">
          
          <button 
            onClick={this.onLikeClick.bind(this, postId)}
            type="button"
            className="btn"
          >
            <i
              className={classnames('far fa-heart fa-2x', {
                'fas fa-heart fa-2x unlike': this.findUserLike(post.likes)
              })}
              />
          </button>
        
          {/* <i className="far fa-comment fa-2x action"></i>
          <i className="far fa-paper-plane fa-2x action"></i>
          <i className="far fa-bookmark fa-2x action"></i> */}
          {/* Loggedin user only can delete the post(Show thrash icon) */}
          {postedById === auth.user.id ?  showThrashIcon : null}
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
        <PostComment postId={post._id}></PostComment>
      </div>

    )
  }
}

PostActionsHome.propTypes = {
  addLikeHome: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{addLikeHome, deletePostById})(withRouter(PostActionsHome));