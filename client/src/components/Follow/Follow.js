import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
// import Action
import { followUser, getFollowings } from '../../actions/profileActions';

class Follow extends Component {
  constructor() {
    super();
    this.state = {
      textBtn: false
    };
    
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getFollowings(this.props.auth.user.username);
  }

  onClick(e) {
    this.props.followUser(this.props.userId);
  }

  render() {
    const { auth, userId } = this.props;
    const followingList = this.props.profile.profile.following;
    const profileBtnName = ((followingList.length !== 0)
      ? (followingList.some(following => following.user === userId) 
        ? 'Following' 
        : 'Follow')
      : 'Follow');

    return (
      (auth.isAuthenticated) 
      ?
        <Fragment>
          <button className="log-in-button blue-bg button font-weight-bold follow" onClick={this.onClick}>
            {profileBtnName}
          </button>
        </Fragment> 
      : null
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {followUser, getFollowings})(Follow);