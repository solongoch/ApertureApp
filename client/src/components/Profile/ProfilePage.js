import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
// import Components
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
// import CSS
import './profile.css';
import Spinner from '../common/Spinner';

class ProfilePage extends Component {

  componentDidMount() {
    this.props.getProfileByUsername(this.props.match.params.username, this.props.history);
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.profile){

  //   }

  // }

  render() {
    const { profile, loading } = this.props.profileState;

    //let profileItems;
    // if (profile === null || !loading) {
    //   profileItems = <Spinner />;
    // } else {

    var _posts = this.props.profileState.profile.posts;
    if (_posts) {
      var _profilePosts = _posts.map(post => <ProfilePosts key={post._id} post={post} />)
    }

    return (
      <div className="profile">
        <ProfileHeader profile={profile} />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>
        <div className="posts d-flex flex-column">
        <div className="single-row d-flex flex-row justify-content-between">
        {_profilePosts}
      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileState: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(withRouter(ProfilePage));