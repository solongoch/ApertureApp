import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from '../common/Spinner'
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
    this.state = {
      posts:[]
    }
  }
    
  componentDidMount() {
    this.props.getProfileByUsername(this.props.match.params.username, this.props.history);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.profileState.profile)
    {
      this.setState({posts: nextProps.profileState.profile.posts })
    }
  }

  render() {
    const { profile } = this.props.profileState;
    if (!profile) {
      return (<Spinner />)
    }
    if(profile){
      var _posts = profile.posts;
      var _profilePosts;
      if (_posts) {
        _profilePosts = <ProfilePosts posts={_posts} />
      }
    }
    
    // console.log(_posts.length);
    return (
      <div className="profile">
        <ProfileHeader profile={ profile } auth={ this.props.auth } />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>  
        {_profilePosts}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profileState: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByUsername })(withRouter(ProfilePage));