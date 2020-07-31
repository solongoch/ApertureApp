import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './profileposts.css';

class ProfilePosts extends Component {
  render() {

    const { posts } = this.props;
    return (

      <div class="profileposts">
        {posts.map(post => {
          return (
            <div class="profilepost-div" tabindex="0" key={post._id}>
              <Link to={`/post/${post._id}`}>
                <img src={post.photo} class="profilepost-img" alt="" />
                <div class="profilepost-info">
                  <ul>
                    <li class="profilepost-likes">
                      <i class="fas fa-heart" aria-hidden="true"></i> {post.likesCount}
                    </li>
                    <li class="profilepost-comments">
                      <i class="fas fa-comment" aria-hidden="true"></i> {post.commentsCount}
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

export default ProfilePosts;
