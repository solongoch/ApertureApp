import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import Components
import PostCommentSection from './PostCommentSection';
import PostActions from './PostActions';

class PostSidebar extends Component {
  render() {
    const {post} = this.props.post;
    return (
      
        <div className="post-details">
          <PostCommentSection post={post}></PostCommentSection>
          <PostActions post={post}></PostActions>
        </div>
      
    )
  }
}

export default PostSidebar;