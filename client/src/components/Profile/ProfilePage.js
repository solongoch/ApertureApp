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

  componentDidMount() {
    this.props.getProfileByUsername(this.props.match.params.username, this.props.history);
  }

  render() {
    if (this.props.profileState.profile) {
      var _posts = this.props.profileState.profile.posts;
      var _profilePosts;
      if (_posts.length > 0) {
        _profilePosts = <ProfilePosts posts={_posts} />
      } else {
        _profilePosts = (<div>
          <h1 className="text-center"><i className="fa fa-camera" /></h1>
          <h3 className="text-center"> No Posts Yet</h3>
        </div>)
      }
    }
    return (
      <div className="profile">
        <ProfileHeader profile={this.props.profileState.profile} />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>
        {_profilePosts}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profileState: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(withRouter(ProfilePage));