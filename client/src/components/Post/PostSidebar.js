import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import CSS
import './single-post.css';
// import Components
import PostCommentSection from './PostCommentSection';
import PostActions from './PostActions';

class PostSidebar extends Component {
  render() {
    const { post }= this.props;
    const _caption = (post.caption) ?
      (<div className="comment-div">
        <div>
          <Link to={`/profile/${post.postedBy.username}`}>
            <img
              className="round-image image-32 commentor-image"
              src={post.postedBy.avatar}
              alt="Post author"
            />
          </Link>
        </div>
        <div className="d-flex flex-column left-15">
          <div>
            <Link className="font-weight-bold" to="/profile">
              {post.postedBy.username}
            </Link>
            <div className="comment-text">{post.caption}</div>
          </div>
        </div>
      </div>) : null
    return (  
        <div className="post-details">
          {_caption}  
          <PostCommentSection postId={post._id} comments={post.comments} postedBy={post.postedBy._id} />
          <PostActions post ={post} />
        </div>      
    )
  }
}


export default PostSidebar