import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
// import Components
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
// import CSS
import './profile.css';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {}
  }
    
  componentDidMount() {
    this.props.getProfileByUsername(this.props.match.params.username, this.props.history);
  }

  render() {
    // TODO: "Profile loading"
    // if (this.props.profileState.loading) {
    //   return <div>Loading...</div>
    // }
    return (
      <div className="profile">
        <ProfileHeader profile={ this.props.profileState.profile } />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>
        <ProfilePosts  posts={ this.props.profileState.profile.posts }/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profileState: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(withRouter(ProfilePage));