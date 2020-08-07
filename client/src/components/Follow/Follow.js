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
    const { followers, auth } = this.props;
    //  Follow Button
    let followBtn = (<button className="log-in-button blue-bg button font-weight-bold follow" onClick={this.onClick}> Follow </button>);

    // Following Button
    let followingBtn = (<button className="btn ml-3 btn-sm btn-follow" > Following </button>)

    const profileBtnName = ((followers.length !== 0)
      ? (followers.some(follower => follower.user.username === auth.user.username)
        ? followingBtn
        : followBtn)
      : followBtn);
    console.log(this.props.userId);

    return (
      (auth.isAuthenticated) ? <Fragment> {profileBtnName} </Fragment> : null
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { followUser })(Follow);