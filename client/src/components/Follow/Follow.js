import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Action
import { followUser, unfollowUser, getFollowings } from '../../actions/profileActions';
//import Unfollow component
import Unfollow from './Unfollow';

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _showUnfollow: false,
      _unfollowUser: {}
    };
  }

  // call followUser action(API)
  onClickToFollow = (user) => {
    this.props.followUser(user._id);
  }

  //show unfollow User component on click of following button
  //passing _unfollowUserobject to unfollow component as props
  showUnfollow = (user) => {
    this.setState({ _showUnfollow: true });
    this.setState({ _unfollowUser: user });
  }

  //hide unfollow User component on click of unfollow button in unfollow component
  hideUnfollow = () => {
    //Calling unfollowUser action(API)
    this.props.unfollowUser(this.state._unfollowUser._id)
    this.setState({ _showUnfollow: false });
  }

  //back to following component on click of cancel btn in unfollow component 
  cancelUnfollow = () => {
    this.setState({ _showUnfollow: false });
  }

  //Calling authUser getFollowings api
  componentDidMount() {
    this.props.getFollowings(this.props.auth.user.username);
  }

  render() {
    const { auth, user } = this.props;
    const { _unfollowUser } = this.state; //to pass unfollow component
    const followingList = this.props.followingLists;

    //User object passed from parent component
    var userId = (user) ? user._id : '';

    //  Follow Button
    let followBtn = (
      <button className="btn ml-3 btn-sm btn-follow" onClick={this.onClickToFollow.bind(this, user)}>Follow</button>
    );

    // Following Button to popoup unfollow component on overlay
    let followingBtn = (
      <div className='following-btn'>
        <button className="btn  ml-2 btn-sm btn-primary-outline"
          onClick={this.showUnfollow.bind(this, user)}>Following
        </button>
      </div>
    );

    //holds Follow or Following button based on condition
    let followButton = null;

    //If followers follows the authuser then display nothing
    if (userId === auth.user.id) {
      followButton = (<Fragment></Fragment>)
    } else {//Check user to follow is already in authUser's following lists
      followButton = ((followingList && followingList.length !== 0)
        ? (followingList.some(following => following.user._id === userId)
          ? followingBtn
          : followBtn)
        : followBtn);
    }

    return (
      (auth.isAuthenticated)
        ?
          <Fragment>
            {followButton}
            {/* Unfollow component will display only if this.state._showUnfollow  is true*/}
            <Unfollow _showUnfollow={this.state._showUnfollow}
              hideUnfollow={this.hideUnfollow} _unfollowUser={_unfollowUser}
              cancelUnfollow={this.cancelUnfollow}
            />
          </Fragment>
        : null
    );
  }
} //End of class

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  followingLists: state.profile.followingLists
})

export default connect(mapStateToProps, { getFollowings, followUser, unfollowUser })(Follow);