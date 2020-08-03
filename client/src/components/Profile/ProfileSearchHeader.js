import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import Components
import Followers from '../Follow/Followers';
import Followings from '../Follow/Followings';
// import CSS
import './profile.css';
import { followUser } from '../../actions/profileActions';

class ProfileSearchHeader extends Component {
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
      this.setState({ _showFollowings: true })
    }
  }
  hideFollowings = () => {
    this.setState({ _showFollowings: false })
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

  handleFollow = (id) => {
    this.props.followUser(id);
  }

  render() {
    const { profile } = this.props;
    var _searchProfile;
    if (profile) {

      _searchProfile = (
        <div className="profile-info-header d-flex flex-row">
          {/* Avatar */}
          <img className="round-image image-150 profile-image" src={profile.avatar} alt="Profile" />
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              {/* Username */}
              <div className="profile-username">{profile.username}</div>
              {/* Edit Profile */}
              <div className="blue-bg button font-weight-bold" style={{ "color": 'white' }}>
                <Link to="" onClick={this.handleFollow.bind(this, profile.id)}>Follow</Link>
              </div>
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
      );

    }
    return (
      <div className="">
        {_searchProfile}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.searchedUserProfile
})

export default connect(mapStateToProps, { followUser })(ProfileSearchHeader);