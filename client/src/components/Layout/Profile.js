import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import CSS
import '../css/profile.css';
// import images
import profilePicture from '../../image/img-sq.jpg';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
    }

    axios
      .post('/api/profile/:username')
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div className="profile">
        <div className="profile-info d-flex flex-row">
          <Link to="/"><img className="round-image image-150 profile-image" src={profilePicture} alt="Profile" /></Link>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="profile-username">Username</div>
              <div className="white-bg button font-weight-bold"><Link to="/">Edit Profile</Link></div>
              <Link to="/"><i className="fas fa-cog fa-lg"></i></Link>
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

        {/* <div className="top-post-menu d-flex flex-row justify-content-center">
        </div> */}
        {/* Posts */}
        <div className="posts d-flex flex-column">
          {/* This .single-row div will be repeated */}
          <div className="single-row d-flex flex-row justify-content-between">        
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/profile">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
                   
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
                   
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="single-row d-flex flex-row justify-content-between">
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
                   
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
                   
            <div className="post">
              <img className="image" src={profilePicture} alt="Post"/>
              <div className="overlay">
                <Link to="/">
                  <div className="numbers">
                    <span className="right-15"><i className="far fa-heart"></i> 987</span>
                    <span><i className="far fa-comment"></i> 4321</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;