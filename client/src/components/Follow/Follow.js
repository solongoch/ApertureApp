import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Action
import { followUser, getFollowings } from '../../actions/profileActions';

class Follow extends Component {
  constructor() {
    super();
    this.state = {
      textBtn: false
    };

    this.onClickToFollow = this.onClickToFollow.bind(this);
  }

  componentDidMount() {
    this.props.getFollowings(this.props.auth.user.username);
  }

  onClickToFollow(e) {
    this.props.followUser(this.props.userId);
  }

  render() {
    const { userId, auth } = this.props;
    //  Follow Button
    let followBtn = (<button className="btn ml-3 btn-sm btn-follow"
      onClick={this.onClick}> Follow </button>);

    // Following Button
    let followingBtn = (<button className="btn btn-sm btn-primary-outline" > Following </button>)

    const followingList = this.props.followingLists;
    const profileBtnName = ((followingList.length !== 0)
      ? (followingList.some(following => following.user._id === userId))
        ? followingBtn
        : followBtn
      : followBtn);

    return (
      (auth.isAuthenticated) ? <Fragment> {profileBtnName} </Fragment> : null
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  followingLists: state.profile.followingLists
})

export default connect(mapStateToProps, { getFollowings, followUser })(Follow);
