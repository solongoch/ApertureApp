import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
// import Components
import FollowOrEdit from './FollowOrEdit';
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
    const { followingCount } = this.props.profile;
    //display Following component only if user has followingCount > 0
    if (followingCount > 0) {
      this.setState({ _showFollowings: true });
    }
  }
  hideFollowings = () => {
    this.setState({ _showFollowings: false });
  }

  //to show and hide Followers component 
  showFollowers = () => {
    const { followersCount } = this.props.profile;
    //display Followers component only if user has followersCount > 0
    if (followersCount > 0) {
      this.setState({ _showFollowers: true })
    }
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
            {/* Diplay Follow/Following Or Edit Profile button */}
            <FollowOrEdit profile={ profile } auth={ this.props.auth } followers = { profile.followersList } />
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

          {(profile.username && profile.followersCount > 0) &&
            <Fragment>
              <Followers _showFollowers={this.state._showFollowers} followersClose={this.hideFollowers}
                username={profile.username} />
            </Fragment>
          }
          {(profile.username && profile.followingCount > 0) &&
            <Fragment>
              <Followings _showFollowings={this.state._showFollowings} followingsClose={this.hideFollowings} username={profile.username} />
            </Fragment>
          }
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

export default (ProfileHeader);