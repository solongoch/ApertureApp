import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import Components
import PostCommentSection from './PostCommentSection';
import PostActions from './PostActions';

class PostSidebar extends Component {
  render() {
    return (      
        <div className="post-details">
          <PostCommentSection />
          <PostActions />
        </div>      
    )
  }
}

export default PostSidebar;