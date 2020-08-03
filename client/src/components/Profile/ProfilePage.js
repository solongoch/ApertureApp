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
      if (_posts && _posts.length > 0) { //has post display ProfilePosts component
        _profilePosts = <ProfilePosts posts={_posts} />
      } else { // else display no posts with camera icon 
        _profilePosts = (<div>
          <h1 className="text-center"><i className="fa fa-camera" style ={{fontSize: "40px"}} /></h1>
          <h3 className="text-center"> No Posts Yet</h3>
        </div>)
      }
    }
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