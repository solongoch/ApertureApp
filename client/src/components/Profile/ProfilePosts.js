import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './profileposts.css';
import {getAllPosts} from '../../actions/postActions';
import {connect} from 'react-redux';


class ProfilePosts extends Component {

  componentDidMount(){
    this.props.getAllPosts();
  }
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

export default connect(null, {getAllPosts}) (ProfilePosts);
