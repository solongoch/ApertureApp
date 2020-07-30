import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class ProfilePosts extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { post } = this.props;
    return(
        <div className="post">
          <img className="image" src={post.photo} alt="Post" />
          <div className="overlay">
            <Link to={'/single-post/${post._id}'}>
              <div className="numbers">
                <span className="right-15">
                  <i className="far fa-heart"></i> {post.likesCount}
                </span>
                <span>
                  <i className="far fa-comment"></i>{post.commentsCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
    
    );
  }
}

export default ProfilePosts;
