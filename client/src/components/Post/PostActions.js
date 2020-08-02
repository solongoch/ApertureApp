import React, { Component } from "react";
import Moment from "react-moment";
// import CSS
import "./single-post.css";
// import Component
import PostComment from "./PostComment";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deletePostById } from '../../actions/postActions';

class PostAction extends Component {

  state = {
    likes: 0,
    errors: {}
  };

  addLike = () => {
    let newCount = this.state.likes + 1;
    this.setState({
      likes: newCount
    });
  };

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
          <button className="far fa-heart fa-2x action" onClick={this.addLike}></button>
          <i className="far fa-comment fa-2x action"></i>
          <i className="far fa-paper-plane fa-2x action"></i>
          <i className="far fa-bookmark fa-2x action"></i>
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
        <PostComment></PostComment>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post.post
});

export default connect(mapStateToProps, { deletePostById })(withRouter(PostAction));
