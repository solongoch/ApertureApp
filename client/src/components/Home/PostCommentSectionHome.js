import React, { Component } from "react";
import PropTypes from 'prop-types';
import PostCommentItemHome from './PostCommentItemHome';

class PostCommentSectionHome extends Component {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
      <PostCommentItemHome key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

PostCommentSectionHome.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default PostCommentSectionHome;