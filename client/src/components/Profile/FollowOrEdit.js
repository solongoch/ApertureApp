import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Component
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

    // Follow OR Following button
    profileBtn = (
     <Fragment>
      <Follow 
        userId={this.props.searchedProfile.id} 
      />
    </Fragment>)

    return (
      <Fragment>
        {profileBtn}
      </Fragment>
    )
  }
}

FollowOrEdit.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  searchedProfile: state.profile.searchedProfile
});

export default connect(mapStateToProps, null)(FollowOrEdit);
