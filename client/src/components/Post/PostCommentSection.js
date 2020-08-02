import React, { Component } from "react";
import { Link } from "react-router-dom";
// import CSS
import "./single-post.css";
// import images
import profilePic from "../../image/img-sq.jpg";

class PostCommentSection extends Component {
  render() {
    const { comments }= this.props;
    console.log(this.props.comments)
    if (!comments) { return null }

    const commentItem = comments.map(comment => 
      console.log(comment.commentBody)
      ( 
      <div className="comment-div">
        <div>
          <Link to="/profile">
            <img
              className="round-image image-32 commentor-image"
              src={profilePic}
              alt="Post author"
            />
          </Link>
        </div>
        <div className="d-flex flex-column left-15">
          <div>
            <Link className="font-weight-bold" to="/profile">
              {comment.commentedBy}
            </Link>
            <div className="comment-text">{comment.commentBody}</div>
          </div>
        </div>
      </div>
      )
    )
    
    return (
      <div className="comments">
        <div className="comment-div">
          {commentItem}
        </div>
      </div>
    );
  }
}

export default PostCommentSection;
