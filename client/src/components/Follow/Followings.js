import React, { Component } from 'react';
import "./follow.css";
import { Link } from "react-router-dom";
import Unfollow from './Unfollow';
import { getFollowings } from '../../actions/profileActions';
import { connect } from 'react-redux'


class Followings extends Component {
  constructor() {
    super();
    this.state = {
      _showUnfollow: false,
      followingLists:{}
    }
  }

  showUnfollow = () => {
    this.setState({ _showUnfollow: true })
  }
  hideUnfollow = () => {
    this.setState({ _showUnfollow: false });
  }

  componentDidMount() {
    this.props.getFollowings(this.props.auth.username)
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.profile)
  //   {
  //     this.setState({followingLists:nextProps.profile.profile})
  //   }

  // }
  render() {
    if (!this.props._showFollowings) {
      return null;
    }
    const {followingLists} = this.props;

    if(followingLists.Following){

      console.log("hello",followingLists.Following);
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
                followingLists.Following.map((user) => {
                  return (
                    <div className='row' key={user.user._id}>

                      <div className='avatar-div col-2 col-sm-2 col-md-2 col-lg-2 col-xxs-2'>
                        <Link to='/profile'>
                          <img
                            className='user-avatar'
                            src={user.user.avatar}
                            alt='Avatar'
                          />
                        </Link>
                      </div>
                      <div className='userinfo-div col-6 col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
                        <Link
                          to='/profile'
                          className='username-link'>
                          <span className="username"> {user.user.username} </span>
                        </Link>
                        <span className="name"> {user.user.name}  </span>
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

const mapStateToProps = state => ({
  auth: state.auth.user,
  followingLists : state.profile.followingLists
})

export default connect(mapStateToProps, ({ getFollowings }))(Followings);