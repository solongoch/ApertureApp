import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from '../common/Spinner'
import { getFollowers } from '../../actions/profileActions';

class FollowOrEdit extends Component {
  constructor() {
    super();
    this.state = {
      followersList: []
    }
  }
  componentDidMount() {
    // this.props.getFollowers(this.props.profile.username)
  }

  render() {
    const { profile, followersList } = this.props;
    const myUsername = this.props.auth.user.username;
    let profileBtn;

    if (profile.username === myUsername) {
      return profileBtn = 
      (
        // Edit Profile button
        <div>
          <div className="white-bg button font-weight-bold">
            <Link to={`/edit/${profile.username}`}>Edit Profile</Link>
          </div>
          {/* Settings (no functionality right now. TODO:) */}
          {/* <Link to="/"><i className="fas fa-cog fa-lg"></i></Link> */}
        </div>
      )
    }

    if (!followersList) {
      return <Spinner />
    }
    console.log(followersList);

    // followersList.filter(follower => {
    //   console.log('Profile username: ', follower.user.username);
    //   console.log('My username: ', myUsername)
    //   console.log('is same: ', (follower.user.username === myUsername))
    // });
    const profileBtnName = ((followersList.length !== 0) 
    ? (followersList.filter(follower => follower.username === myUsername) ? 'Following' : 'Follow')
    : 'Follow')

    // Follow OR Following button
    profileBtn = (<div>
      <Link className="log-in-button blue-bg button font-weight-bold follow" to="/">
        {/* Follow */}
        {profileBtnName}
      </Link>
    </div>)

    return (
      <div>
        {profileBtn}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  followersList: state.profile.followersLists
});

export default connect(mapStateToProps, { getFollowers })(FollowOrEdit);