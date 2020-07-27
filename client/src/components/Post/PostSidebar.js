import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import images
import PostHeader from './PostHeader';
import PostCommentSection from './PostCommentSection';
import PostActions from './PostActions';

class PostSidebar extends Component {
  render() {
    return (
      
        
        <div className="post-details">
          <PostHeader></PostHeader>
          <PostCommentSection></PostCommentSection>
          <PostActions></PostActions>
        </div>
      
    )
  }
}

export default PostSidebar;