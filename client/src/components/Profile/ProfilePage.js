import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
// import CSS
import './profile.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="profile">
        <ProfileHeader />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>
        <ProfilePosts />
      </div>
    )
  }
}

export default ProfilePage;