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
    if(this.props.profileState.profile){

      var _posts = this.props.profileState.profile.posts;
      console.log("props",_posts);
      var _profilePosts;
      if (_posts) {
        _profilePosts = <ProfilePosts posts={_posts} />
      }
    }
    
    // console.log(_posts.length);
    return (
      <div className="profile">
        <ProfileHeader profile={ this.props.profileState.profile } />
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