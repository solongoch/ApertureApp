import React, { Component } from 'react';
import "../css/follow.css";
import { Link } from "react-router-dom";
import users from './Data';
import Unfollow from './Unfollow';


class Followings extends Component {
  constructor() {
    super();
    this.state = {
      _showUnfollow: false
    }
  }

  showUnfollow = () => {
    this.setState({ _showUnfollow: true })
  }
  hideUnfollow = () => {
    this.setState({ _showUnfollow: false });
  }

  render() {
    if (!this.props._showFollowings) {
      return null;
    }
    return (
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
                users.map((user) => {
                  return (
                    <div className='row' key={user.userId}>

                      <div className='avatar-div col-2 col-sm-2 col-md-2 col-lg-2 col-xxs-2'>
                        <Link to='/profile'>
                          <img
                            className='user-avatar'
                            src={user.avatar}
                            alt='Avatar'
                          />
                        </Link>
                      </div>
                      <div className='userinfo-div col-6 col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
                        <Link
                          to='/profile'
                          className='username-link'>
                          <span className="username"> {user.username} </span>
                        </Link>
                        <span className="name"> {user.name}  </span>
                      </div>
                      <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
                        <button className='btn btn-primary-outline'
                          onClick={this.showUnfollow}>
                          Followings
                        </button>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <Unfollow _showUnfollow={this.state._showUnfollow} hideUnfollow={this.hideUnfollow} />
          </div>
        </div>
      </div>
  
    );
  }
}
export default Followings;