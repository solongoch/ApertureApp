import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Action
import { followUser } from '../../actions/profileActions';

class Follow extends Component {
  constructor() {
    super();
    this.state = {
    };
    
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.followUser(this.props.userId);
  }

  render() {
    const { followers, auth } = this.props;
    const profileBtnName = ((followers.length !== 0)
      ? (followers.some(follower => follower.user.username === auth.user.username) 
        ? 'Following' 
        : 'Follow')
      : 'Follow');
    console.log(this.props.userId);

    return (
      (auth.isAuthenticated) ?
      <div>
        <button className="log-in-button blue-bg button font-weight-bold follow" onClick={this.onClick}>
          {profileBtnName}
        </button>
      </div> : null
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {followUser})(Follow);