import React, { Component } from "react";
import { Link } from "react-router-dom";
// import CSS
import "./single-post.css";

class PostCommentSection extends Component {
  render() {
    const { comments } = this.props;
    
    if (!comments) {
      return null;
    }

    const commentItem = comments.map(comment => (
      <div className="comment-div" key={comment._id}>
        <div>
          <Link to={`/profile/${comment.commentedByUsername}`}>
            <img
              className="round-image image-32 commentor-image"
              src={comment.commentedByAvatar}
              alt="Post author"
            />
          </Link>
        </div>
        <div className="d-flex flex-column left-15">
          <div>
            <Link className="font-weight-bold" to={`/profile/${comment.commentedByUsername}`}>
              {comment.commentedByUsername}
            </Link>
            <div className="comment-text">{comment.commentBody}</div>
          </div>
        </div>
      </div>
    ));
    
    return <div className="comments">{commentItem}</div>;
  }
}

export default PostCommentSection;