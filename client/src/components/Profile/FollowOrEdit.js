import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// import Action
import Follow from '../Follow/Follow';

class FollowOrEdit extends Component {

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


    //  Follow Button
    let followBtn = (<Follow  userId={profile.id}> </Follow>)


    // Following Button
    let followingBtn = (<button className="btn ml-3 btn-sm btn-follow" > Following </button>)


    const userFollowersLists = profile.followers;

    // Chencl authUser is in Followers list if so Following else Follow
    const profileBtnName = ((userFollowersLists.length !== 0)
      ? (userFollowersLists.some(follower => follower.user.username === authUsername)
        ? followingBtn : followBtn)
      : followBtn);

    // Follow OR Following button


    profileBtn = (<Fragment> {profileBtnName} </Fragment>);

    return ( <Fragment> {profileBtn} </Fragment>);
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.user
});

export default connect(mapStateToProps, null)(FollowOrEdit);
