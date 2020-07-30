import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilePicture from '../../image/img-sq.jpg';

class ProfilePosts extends Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    const {posts} = this.props;
    if (!posts) {
      return null
    }
    return (
      <div className="posts d-flex flex-column">
        {/* This .single-row div will be repeated */}
        <div className="single-row d-flex flex-row justify-content-between">
          <div className="post">
            <img className="image" src={posts[1].photo} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="post">
            <img className="image" src={profilePicture} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="post">
            <img className="image" src={profilePicture} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="single-row d-flex flex-row justify-content-between">
          <div className="post">
            <img className="image" src={profilePicture} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="post">
            <img className="image" src={profilePicture} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="post">
            <img className="image" src={profilePicture} alt="Post" />
            <div className="overlay">
              <Link to="/single-post">
                <div className="numbers">
                  <span className="right-15">
                    <i className="far fa-heart"></i> 987
                  </span>
                  <span>
                    <i className="far fa-comment"></i> 4321
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePosts;
