import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import images
import post from '../../image/img-sq.jpg';
import PostSidebar from './PostSidebar';

import PostHeader from './PostHeader';

class SinglePost extends Component {
  render() {
    return (
      <div id="single-post-div">
        <div className="single-post">
        <PostHeader></PostHeader>
          <div className="post-image">
            <img src={post} alt="Post" />
          </div>
        </div>
        <PostSidebar></PostSidebar>
      </div>
    )
  }
}

export default SinglePost;