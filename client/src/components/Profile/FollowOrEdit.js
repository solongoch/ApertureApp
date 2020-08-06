import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class FollowOrEdit extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     followersList: []
  //   }
  // }

  render() {
    const { profile } = this.props;
    const authUsername = this.props.auth.username;
    let profileBtn;
    if (profile.username === authUsername) {

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

    const userFollowersLists = profile.followers;
    const profileBtnName = ((userFollowersLists.length !== 0)
      ? (userFollowersLists.some(follower => follower.user.username === authUsername) ? 'Following' : 'Follow')
      : 'Follow')

    // Follow OR Following button
    profileBtn = (<div>
      <button className="btn ml-3 btn-sm btn-follow" >
        {/* Follow */}
        {profileBtnName}
      </button>
    </div>)

    return (
      <div>
        {profileBtn}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.user
});

export default connect(mapStateToProps, null)(FollowOrEdit);