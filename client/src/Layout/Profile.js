import React, { Component } from 'react';
import '../css/profile.css';
import profilePicture from '../image/img-sq.jpg';
import settings from '../image/settings.svg';
import posts from '../image/posts.svg';

class Profile extends Component {
  render() {
    return (
      <div class="profile">
        <div class="profile-info d-flex flex-row">
          <a href="#"><img class="round-image image-150 profile-image" src={profilePicture} /></a>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row">
              <div class="profile-username">Username</div>
              <div class="white-bg button font-weight-bold edit-profile-button"><a href="#">Edit Profile</a></div>
              <img src={settings} />
            </div>
            <ul class="counts d-flex flex-row">
              <li class="count"><span class="font-weight-bold">100</span> posts</li>
              <li class="count"><span class="font-weight-bold">133</span> followers</li>
              <li class="count"><span class="font-weight-bold">388</span> following</li>
            </ul>
            <div class="font-weight-bold">Name</div>
            <div>This is bio section</div>
            <div><a href="#" target="_blank">https://www.instagram.com/</a></div>
          </div>
        </div>

        <div class="top-post-menu d-flex flex-row justify-content-center">
          <div class="active">
            <img src={posts} width="16px" height="16px"/>
            <a href="#">posts</a>
          </div>
          <div><a href="">IGTV</a></div>
          <div><a href="">saved</a></div>
          <div><a href="">tagged</a></div>
        </div>
        {/* Posts */}
        <div class="posts d-flex flex-column">
          {/* This .single-row div will be repeated */}
          <div class="single-row d-flex flex-row justify-content-between">
            <div class="post"><img src={profilePicture} /></div>
            <div class="post"><img src={profilePicture} /></div>
            <div class="post"><img src={profilePicture} /></div>
          </div>

          <div class="single-row d-flex flex-row justify-content-between">
            <div class="post"><img src={profilePicture} /></div>
            <div class="post"><img src={profilePicture} /></div>
            <div class="post"><img src={profilePicture} /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;