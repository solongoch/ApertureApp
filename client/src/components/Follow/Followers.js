import React, { Component } from 'react';
import "./follow.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
// import Actions
import { getFollowers } from './../../actions/profileActions';
// import Component
import Follow from './Follow'

class Followers extends Component {
  componentDidMount() {
    if (!isEmpty(this.props.username)) {
      this.props.getFollowers(this.props.username)
    }
  }

  render() {
    if (!this.props._showFollowers) {
      return null;
    }

    const { followersLists } = this.props;
    return (
      <div className='mainwrapper-div'>
        <div className='subwrapper-div'>
          <div className='user-container'>
            <h5>Followers</h5>
            <span>
              <span>
                <i onClick={this.props.followersClose} className="fa fa-times close" aria-hidden="true"></i>
              </span>
            </span>
            <hr />
            <div className='scrolluser'>
              {
                followersLists.map((user) => {
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
                          to={`/profile/${user.user.username}`}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  followersLists: state.profile.followersLists
})

export default connect(mapStateToProps, ({ getFollowers }))(Followers);