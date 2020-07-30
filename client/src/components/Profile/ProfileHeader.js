import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import Components
import Followers from '../Follow/Followers';
import Followings from '../Follow/Followings';
// import CSS
import './profile.css';

class ProfileHeader extends Component {
  constructor() {
    super();
    this.state = {
      _showFollowings: false,
      _showFollowers: false
    }
  }

  //to show and hide Following component 
  showFollowings = () => {
    this.setState({ _showFollowings: true })
  }
  hideFollowings = () => {
    this.setState({ _showFollowings: false })
  }

  //to show and hide Followers component 
  showFollowers = () => {
    this.setState({ _showFollowers: true })
  }
  hideFollowers = () => {
    this.setState({ _showFollowers: false })
  }

  render() {
    const { profile } = this.props;
    return (
      <div className="profile-info-header d-flex flex-row">
        {/* Avatar */}
        <img className="round-image image-150 profile-image" src={profile.avatar} alt="Profile" />
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            {/* Username */}
            <div className="profile-username">{profile.username}</div>
            {/* Edit Profile */}
            <div className="white-bg button font-weight-bold">
              <Link to={`/edit/${this.props.profile.username}`}>Edit Profile</Link>
            </div>
            {/* Settings (no functionality right now. TODO:) */}
            <Link to="/"><i className="fas fa-cog fa-lg"></i></Link>
          </div>
          <ul className="counts d-flex flex-row">
            {/* Total number of posts */}
            <li className="count"><span className="font-weight-bold">{profile.noOfPosts}</span> posts</li>
            {/* Total number of followers */}
            <li className="count" onClick={this.showFollowers}>
              <span className="font-weight-bold">{profile.followersCount}</span> followers
              </li>
            {/* Total number of following */}
            <li className="count" onClick={this.showFollowings}>
              <span className="font-weight-bold">{profile.followingCount}</span> followings
              </li>
          </ul>
          <Followers _showFollowers={this.state._showFollowers} followersClose={this.hideFollowers} />
          <Followings _showFollowings={this.state._showFollowings} followingsClose={this.hideFollowings} />
          {/* Name */}
          <div className="font-weight-bold">{profile.name}</div>
          {/* Bio */}
          <div>{profile.bio}</div>
          {/* Website */}
          <div><Link to="/" className="url" target="_blank">{profile.website}</Link></div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader;