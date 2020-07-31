import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class ProfilePosts extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="row">
        {posts.map(post => {
          return (
            <div className="single-row col-md-4 col-lg-4 col-sm-4 col-12 text-center " 
            key={post._id}>
              <div className="post profileposts_div">
                <img className="image" src={post.photo} alt="Post" />
                <div className="overlay">
                  <Link to={`/post/${post._id}`}>
                    <div className="numbers">
                      <span className="right-15">
                        <i className="fa fa-heart"></i> {post.likesCount}
                      </span>
                      <span>
                        <i className="fa fa-comment"></i>{post.commentsCount}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}


export default ProfilePosts;
