import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Unfollow from './Unfollow';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// import Actions
import { getFollowings, unfollowUser } from '../../actions/profileActions';
// import Component
import Follow from './Follow';
// import CSS
import "./follow.css";


class Followings extends Component {
  constructor() {
    super();
    this.state = {
      _showUnfollow: false,
      followingLists: {},
      _unfollowUser: {}

    }
  }
  //show unfollow User component on click of following button
  showUnfollow = (user) => {
    this.setState({ _showUnfollow: true });
    this.setState({ _unfollowUser: user });

  }

  //hide unfollow User component on click of unfollow button in unfollow component
  hideUnfollow = () => {
    //Calling Unfollowuser action
    this.props.unfollowUser(this.state._unfollowUser.user._id)
    this.setState({ _showUnfollow: false });
  }

  //back to following component on click of cancel btn in unfollow component 
  cancelUnfollow = () => {
    this.setState({ _showUnfollow: false });
  }

  componentDidMount() {
    this.props.getFollowings(this.props.username)
  }

  render() {
    if (!this.props._showFollowings) {
      return null;
    }
    const { followingLists , searchedFollowingLists } = this.props;
    const { _unfollowUser } = this.state;

    //for other users(searched Term) followerslist
    const searchedFollowingList = (searchedFollowingLists) ? searchedFollowingLists.followings : null;
    var _followinglists;
var checkUserFollowingLists = 
  (this.props.username === this.props.auth.username) ? followingLists : searchedFollowingList

    if (checkUserFollowingLists) {
      _followinglists = (
        <div className='mainwrapper-div'>
          <div className='subwrapper-div'>
            <div className='user-container'>
              <h5>Followings</h5>
              <span>
                <i onClick={this.props.followingsClose} className="fa fa-times close" aria-hidden="true"></i>
              </span>
              <hr />
              <div className='scrolluser'>
                {
                  checkUserFollowingLists.map((user) => {
                    return (
                      <div className='row' key={user.user._id}>

                        <div className='avatar-div col-2 col-sm-2 col-md-2 col-lg-2 col-xxs-2'>
                          <Link to={`/profile/${user.user.username}`}>
                            <img
                              className='user-avatar'
                              src={user.user.avatar}
                              alt='Avatar'
                            />
                          </Link>
                        </div>
                        <div className='userinfo-div col-6 col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
                          <Link
                            to={`/profile/${user.user.username}`} target='_blank'
                            className='username-link'>
                            <span className="username"> {user.user.username} </span>
                          </Link>
                          <span className="name"> {user.user.name}  </span>
                        </div>
                        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
                          <Follow userId={user.user._id}/>
                        </div>
                      </div>
                    )
                  })

                }
                <Unfollow _showUnfollow={this.state._showUnfollow}
                  hideUnfollow={this.hideUnfollow} _unfollowUser={_unfollowUser}
                  cancelUnfollow={this.cancelUnfollow}
                />
              </div>
            </div>
          </div>
        </div>

      );

    }
    return (

      <div className="">
        {_followinglists}
      </div>
    );
  }
}

Followings.propTypes = {
  getFollowings: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.user,
  followingLists: state.profile.followingLists,
  searchedFollowingLists : state.profile.searchedProfile
})

export default connect(mapStateToProps, ({ getFollowings, unfollowUser }))(Followings);
