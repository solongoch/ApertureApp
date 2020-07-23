import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import CSS
import '../css/homepage.css';
// import images 
import profilePicture from '../../image/img-sq.jpg';
import postPicture from '../../image/img1.jpg';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
    }

    axios
      .get('/api/home')
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div id="homepage-body">
        <div id="posts">
          {/* .post-div will be repeated */}
          <div className="post-div d-flex flex-column">
            <div className="post-header">
              <Link to="/profile">
                <img className="round-image image-32" src={profilePicture} alt="Post author" />
              </Link>
              <div className="d-flex flex-column left-15">
                <div className="font-weight-bold"><Link to="/profile">Name</Link></div>
                {/* <div><Link to="/">Location</Link></div> */}
              </div>
            </div>
            <div className="post-image-div">
              <img className="post-image" src={postPicture} alt="Post" />
            </div>
            <div className="post-footer">
              <div className="actions">
                <i className="far fa-heart fa-2x action"></i>
                <i className="far fa-comment fa-2x action"></i>
                <i className="far fa-paper-plane fa-2x action"></i>
                <i className="far fa-bookmark fa-2x action"></i>
              </div>
              <div className="font-weight-bold line"><Link to="/likes">27013 likes</Link></div>
              <div className="line">
                <Link to="/profile" className="font-weight-bold">Name</Link>
                Description Ra-Ra Rama-Ma Ga-Ga Oh-La-La Doo-Bee-Doo-Bee-Doo
                <Link to="/" className="make-gray">... more</Link>
              </div>
              <div className="line"><Link to="/" className="make-gray">View all 1737 comments</Link></div>
              <div className="line"><Link to="/profile" className="font-weight-bold">Commentor name</Link> Comment</div>
              <div className="post-time line">8 hours ago</div>
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
          </div>

          <div className="post-div d-flex flex-column">
            <div className="post-header">
              <Link to="/profile">
                <img className="round-image image-32" src={profilePicture} alt="Post author" />
              </Link>
              <div className="d-flex flex-column left-15">
                <div className="font-weight-bold"><Link to="/profile">Name</Link></div>
                {/* <div><Link to="/">Location</Link></div> */}
              </div>
            </div>
            <div className="post-image-div">
              <img className="post-image" src={profilePicture} alt="Post" />
            </div>
            <div className="post-footer">
              <div className="actions">
                <i className="far fa-heart fa-2x action"></i>
                <i className="far fa-comment fa-2x action"></i>
                <i className="far fa-paper-plane fa-2x action"></i>
                <i className="far fa-bookmark fa-2x action"></i>
              </div>
              <div className="font-weight-bold line"><Link to="/">27013 likes</Link></div>
              <div className="line">
                <Link to="/" className="font-weight-bold">Name</Link>
                Description Ra-Ra Rama-Ma Ga-Ga Oh-La-La Doo-Bee-Doo-Bee-Doo
                <Link to="/" className="make-gray">... more</Link>
              </div>
              <div className="line"><Link to="/" className="make-gray">View all 1737 comments</Link></div>
              <div className="line"><Link to="/" className="font-weight-bold">Commentor name</Link> Comment</div>
              <div className="post-time line">8 hours ago</div>
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT BAR */}
        <div id="right-bar">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-50" src={profilePicture} alt="User" />
            </Link>
            <div className="left-15">
              <div className="font-weight-bold"><Link to="/">Username</Link></div>
              <div>Name</div>
            </div>
          </div>

          {/* Follower suggestion */}
          <div className="d-flex justify-content-between">
            <span className="font-weight-bold">Suggestions For You</span>
            <Link to="/" className="font-weight-bold">See all</Link>
          </div>

          {/* .profile-section below will be repeated */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="profile-section">
              <Link to="/">
                <img className="round-image image-32" src={profilePicture} alt="User" />
              </Link>
              <div>
                <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <div className="sign-up font-weight-bold follow">Follow</div>
          </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <Link to="/">
                  <img className="round-image image-32" src={profilePicture} alt="User" />
                </Link>
                <div>
                  <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <Link to="/">
                  <img className="round-image image-32" src={profilePicture} alt="User" />
                </Link>
                <div>
                  <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <Link to="/">
                  <img className="round-image image-32" src={profilePicture} alt="User" />
                </Link>
                <div>
                  <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <Link to="/">
                  <img className="round-image image-32" src={profilePicture} alt="User" />
                </Link>
                <div>
                  <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>
        </div>
      </div>
    )
  }
}

export default Homepage;