import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Actions
import { followUser, unfollowUser, getAuthUserFollowings } from '../../actions/profileActions';

class Follow extends Component {
  constructor() {
    super();
    this.state = {};

    this.onClickToFollow = this.onClickToFollow.bind(this);
    this.onClickToUnFollow = this.onClickToUnFollow.bind(this);
  }

  componentDidMount() {
    this.props.getAuthUserFollowings(this.props.auth.user.username);
  }

  onClickToFollow(e) {
    this.props.followUser(this.props.userId);
  }

  onClickToUnFollow(e) {
    this.props.unfollowUser(this.props.userId);
  }

  render() {
    const { auth, userId, myFollowingList } = this.props;
    console.log('My Following List: ', this.props.myFollowingList)
    console.log('UserId: ', userId)
    //  Follow Button
    let followBtn = (
      <button className="btn ml-3 btn-sm btn-follow" onClick={this.onClickToFollow}>Follow</button>);
    // Following Button
    let followingBtn = (
      <button className="btn btn-sm btn-primary-outline" onClick={this.onClickToUnFollow}>Following</button>);

    let followButton = null;
    //If followers follows the authuser then display null
    if (userId === auth.user.id) {
      followButton = (<Fragment></Fragment>)
    } else {
      followButton = ((myFollowingList && myFollowingList.length !== 0)
        ? (myFollowingList.some(following => following.user._id === userId)
          ? followingBtn
          : followBtn)
        : followBtn);
    }

    return (
      (auth.isAuthenticated)
        ? <Fragment>{followButton}</Fragment>
        : null
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  myFollowingList: state.profile.myFollowingList
})

export default connect(mapStateToProps, {getAuthUserFollowings, followUser, unfollowUser})(Follow);