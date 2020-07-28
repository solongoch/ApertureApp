import React, { Component } from 'react';
// import CSS
import './single-post.css';
// import images

class PostComment extends Component {
  render() {
    return (
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
    )
  }
}

export default PostComment;