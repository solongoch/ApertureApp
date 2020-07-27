import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Followers from './Followers';
import Followings from './Followings';
import ProfilePosts from './ProfilePosts';
// import CSS
import '../css/profile.css';
// import images
import profilePicture from '../../image/img-sq.jpg';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      _showFollowings:false,
      _showFollowers:false
    }

    axios
      .get('/api/profile/:username')
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));
  }

  //to show and hide Following component 
  showFollowings = () => {
    this.setState({_showFollowings:true})  
   }
  hideFollowings = () => {
    this.setState({_showFollowings:false})    
  }

  //to show and hide Followers component 
  showFollowers = () => {
    this.setState({_showFollowers:true})  
   }
  hideFollowers = () => {
    this.setState({_showFollowers:false})    
  }

  render() {
    return (
      <div className="profile">
        <div className="profile-info-header d-flex flex-row">
          <Link to="/"><img className="round-image image-150 profile-image" src={profilePicture} alt="Profile" /></Link>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="profile-username">Username</div>
              <div className="white-bg button font-weight-bold"><Link to="/edit">Edit Profile</Link></div>
              <Link to="/"><i className="fas fa-cog fa-lg"></i></Link>
            </div>
            <ul className="counts d-flex flex-row">
              <li className="count"><span className="font-weight-bold">100</span> posts</li>
              <li className="count" onClick={this.showFollowers}>
                <span className="font-weight-bold">133</span> followers
              </li>
              <li className="count" onClick={this.showFollowings}>
                <span className="font-weight-bold">388</span> followings
              </li>
            </ul>
            <Followers _showFollowers={this.state._showFollowers} followersClose={this.hideFollowers}/>
            <Followings _showFollowings={this.state._showFollowings} followingsClose={this.hideFollowings}/>
            <div className="font-weight-bold">Name</div>
            <div>This is bio section</div>
            <div><Link to="/" target="_blank">https://www.instagram.com/</Link></div>
          </div>
        </div>

        <div className="top-post-menu d-flex flex-row justify-content-center">
        </div>
        {/* Posts goes here */}
        <ProfilePosts></ProfilePosts>
      </div>
    )
  }
}

export default Profile;