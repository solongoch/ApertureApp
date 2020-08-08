import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Actions
import { getFollowers, getFollowings } from '../../actions/profileActions';
// import Components
import FollowOrEdit from './FollowOrEdit';
import Followers from '../Follow/Followers';
import Followings from '../Follow/Followings';
// import CSS
import './profile.css';
import PropTypes from 'prop-types';

// import Action

toast.configure();
class ProfileHeader extends Component {
  constructor() {
    super();
    this.state = {
      _showFollowings: false,
      _showFollowers: false
    }
    this.toastOpts = {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: 0,
    };
  }

  //to show and hide Following component 
  showFollowings = () => {
    const { followingCount } = this.props.profile;
    const { isAuthenticated } = this.props.auth
    //display Following component only if user has followingCount > 0
    //Check is authenticated to show the following component
    if (isAuthenticated) {
      if (followingCount > 0) {
        this.setState({ _showFollowings: true });
      }
    } else {
      toast.info("Login to see more...", this.toastOpts)
    }
  }
  hideFollowings = () => {
    this.setState({ _showFollowings: false });
  }

  //to show and hide Followers component 
  showFollowers = () => {
    const { followersCount } = this.props.profile;
    const { isAuthenticated } = this.props.auth
    //display Followers component only if user has followersCount > 0
    //Check is authenticated to show the follower component
    if (isAuthenticated) {
      if (followersCount > 0) {
        this.setState({ _showFollowers: true });
      }
    }
    else {
      toast.info("Login to see more...", this.toastOpts)
    }
  }
  hideFollowers = () => {
    this.setState({ _showFollowers: false })
  }

  render() {
    const { profile, followingList, followersList } = this.props;

    return (
      <div className="profile-info-header d-flex flex-row">
        {/* Avatar */}
        <img className="round-image image-150 profile-image" src={profile.avatar} alt="Profile" />
        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            {/* Username */}
            <div className="profile-username">{profile.username}</div>
            {/* Diplay Follow/Following Or Edit Profile button */}
            <FollowOrEdit profile={profile} />
          </div>
          <ul className="counts d-flex flex-row">
            {/* Total number of posts */}
            <li className="count"><span className="font-weight-bold">{profile.noOfPosts}</span> posts</li>
            {/* Total number of followers */}
            <li className="count" onClick={this.showFollowers}>
              <span className="font-weight-bold">{followersList.length}</span> followers
              </li>
            {/* Total number of following */}
            <li className="count" onClick={this.showFollowings}>
              <span className="font-weight-bold">{followingList.length}</span> followings
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

ProfileHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  followersList: state.profile.followersLists,
  followingList: state.profile.followingLists
})

export default connect(mapStateToProps, {getFollowers, getFollowings})(ProfileHeader);