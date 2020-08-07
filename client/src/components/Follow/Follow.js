import React, { Component, Fragment } from 'react';
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

  onClick() {
    this.props.followUser(this.props.userId);
  }

  render() {
    const { userId, followingLists, auth } = this.props;
    //  Follow Button
    let followBtn = (<button className="btn ml-3 btn-sm btn-follow"
      onClick={this.onClick}> Follow </button>);

    // Following Button
    let followingBtn = (<button className="btn btn-sm btn-primary-outline" > Following </button>)


    const profileBtnName = ((followingLists && followingLists.length !== 0)
      ? (followingLists.some(following => following.user._id === userId))
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
  followingLists: state.profile.followingLists,
  errors: state.errors
})

export default connect(mapStateToProps, { followUser })(Follow);