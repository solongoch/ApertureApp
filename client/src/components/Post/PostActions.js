import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import images

class PostAction extends Component {
  render() {
    return (
      
        <div>
          <div className="actions">
            <i className="far fa-heart fa-2x action"></i>
            <i className="far fa-comment fa-2x action"></i>
            <i className="far fa-paper-plane fa-2x action"></i>
            <i className="far fa-bookmark fa-2x action"></i>
            <i className="fa fa-trash fa-2x action"></i>
          </div>
          <div className="likes">
            {/* <img src={post} className="round-image image-22" /> */}
            <span className="font-weight-bold">1234 likes</span>
          </div>
          <div className="posted-date">May 23</div>
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
      
    )
  }
}

export default PostAction;