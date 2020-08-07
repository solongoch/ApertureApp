import React, { Component } from "react";
import PropTypes from 'prop-types';
import PostCommentItem from './PostCommentItem';

class PostCommentSection extends Component {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
      <PostCommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

PostCommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default PostCommentSection;
