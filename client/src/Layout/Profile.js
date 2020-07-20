import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import CSS
import '../css/profile.css';
// import images
import profilePicture from '../image/img-sq.jpg';
import settings from '../image/settings.svg';
import posts from '../image/posts.svg';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-info d-flex flex-row">
          <Link to="/"><img className="round-image image-150 profile-image" src={profilePicture} alt="Profile" /></Link>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="profile-username">Username</div>
              <div className="white-bg button font-weight-bold edit-profile-button"><Link to="/">Edit Profile</Link></div>
              <img src={settings} alt="Settings button" />
            </div>
            <ul className="counts d-flex flex-row">
              <li className="count"><span className="font-weight-bold">100</span> posts</li>
              <li className="count"><span className="font-weight-bold">133</span> followers</li>
              <li className="count"><span className="font-weight-bold">388</span> following</li>
            </ul>
            <div className="font-weight-bold">Name</div>
            <div>This is bio section</div>
            <div><Link to="/" target="_blank">https://www.instagram.com/</Link></div>
          </div>
        </div>

        <div className="top-post-menu d-flex flex-row justify-content-center">
          <div className="active">
            <img src={posts} width="16px" height="16px" alt="Posts" />
            <Link to="/">posts</Link>
          </div>
          <div><Link href="">IGTV</Link></div>
          <div><Link href="">saved</Link></div>
          <div><Link href="">tagged</Link></div>
        </div>
        {/* Posts */}
        <div className="posts d-flex flex-column">
          {/* This .single-row div will be repeated */}
          <div className="single-row d-flex flex-row justify-content-between">
            <div className="post"><img src={profilePicture} alt="Post" /></div>
            <div className="post"><img src={profilePicture} alt="Post" /></div>
            <div className="post"><img src={profilePicture} alt="Post" /></div>
          </div>

          <div className="single-row d-flex flex-row justify-content-between">
            <div className="post"><img src={profilePicture} alt="Post" /></div>
            <div className="post"><img src={profilePicture} alt="Post" /></div>
            <div className="post"><img src={profilePicture} alt="Post" /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;