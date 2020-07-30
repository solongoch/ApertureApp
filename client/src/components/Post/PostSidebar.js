import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import images
import PostCommentSection from './PostCommentSection';
import PostAction from './PostActions';

class PostSidebar extends Component {
  render() {
    return (
      
        <div className="post-details">
          <PostCommentSection></PostCommentSection>
          <PostAction></PostAction>
        </div>
      
    )
  }
}

export default PostSidebar;