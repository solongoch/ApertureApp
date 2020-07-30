import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
// import Components
import Followers from '../Follow/Followers';
import Followings from '../Follow/Followings';
// import CSS
import './profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      _showFollowings:false,
      _showFollowers:false
    }
  }
    
  componentDidMount() {
    this.props.getProfileByUsername(this.props.match.params.username, this.props.history);
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
    const { profile } = this.props;
    return (
        <div className="profile-info-header d-flex flex-row">
          <Link to="/"><img className="round-image image-150 profile-image" src={profile.avatar} alt="Profile" /></Link>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="profile-username">{profile.username}</div>
              <div className="white-bg button font-weight-bold"><Link to="/edit">Edit Profile</Link></div>
              <Link to="/"><i className="fas fa-cog fa-lg"></i></Link>
            </div>
            <ul className="counts d-flex flex-row">
              <li className="count"><span className="font-weight-bold">{profile.noOfPosts}</span> posts</li>
              <li className="count" onClick={this.showFollowers}>
                <span className="font-weight-bold">{profile.followersCount}</span> followers
              </li>
              <li className="count" onClick={this.showFollowings}>
                <span className="font-weight-bold">{profile.followingCount}</span> followings
              </li>
            </ul>
            <Followers _showFollowers={this.state._showFollowers} followersClose={this.hideFollowers}/>
            <Followings _showFollowings={this.state._showFollowings} followingsClose={this.hideFollowings}/>
            <div className="font-weight-bold">{profile.name}</div>
            <div>{profile.bio}</div>
            <div><Link to="/" target="_blank">{profile.website}</Link></div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(withRouter(Profile));