import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import Component
import PostComment from './PostComment';
import axios from 'axios';

class PostActions extends Component {  
  state = {
    likes: 0
  };

  addLike = () => {
    let newCount = this.state.likes +1;
    this.setState({
      likes: newCount
    });

    axios
      .put(`/api/posts/${postid}/lu`)
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (      
        <div>
          <div className="actions top-15">
            <button className="far fa-heart fa-2x action" onClick={this.addLike}></button>
            <i className="far fa-comment fa-2x action"></i>
            <i className="far fa-paper-plane fa-2x action"></i>
            <i className="far fa-bookmark fa-2x action"></i>
            <i className="fa fa-trash fa-2x action"></i>
          </div>
          <div className="likes">
            {/* <img src={post} className="round-image image-22" /> */}
            <span className="font-weight-bold">{this.state.likes} likes</span>
          </div>
          <div className="posted-date"></div>
              <PostComment></PostComment>
            </div>
    )
  }
}

export default PostActions;