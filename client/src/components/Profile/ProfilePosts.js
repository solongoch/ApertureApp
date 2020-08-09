import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import CSS
import './profileposts.css';

class ProfilePosts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="profileposts">
        {posts.map(post => {
          return (
            <div className="profilepost-div" key={post._id}>
              <Link to={`/post/${post._id}`}>
                <img src={post.photo} className="profilepost-img" alt="" />
                <div className="profilepost-info">
                  <ul>
                    <li className="profilepost-likes">
                      <i className="fas fa-heart" aria-hidden="true"></i> {post.likesCount}
                    </li>
                    <li className="profilepost-comments">
                      <i className="fas fa-comment" aria-hidden="true"></i> {post.commentsCount}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default (ProfilePosts);