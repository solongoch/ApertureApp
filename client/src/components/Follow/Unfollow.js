import React, { Component } from 'react';
import './unfollow.css';

class Unfollow extends Component {
  render() {
    if (!this.props._showUnfollow) {
      return null;
    }
    const {_unfollowUser} = this.props;
    let user = _unfollowUser.user;
    return (
      <div className="mainWrapunfollow-div">
        <div className='subwrapperunfollow-div'>
          <div className="card unfollow-card mx-auto">
            <div className="row">
              <form className="following-form">
                <div className="form-group">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 text-center">
                    <img className="avatar-img-unfollow " src={user.avatar} alt="Avatar" />
                  </div>
                  <div className="info-div col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6">
                    <p className="info-p">
                      Unfollow @{user.username} ?
                    </p>
                  </div>
                  <div className="action-div">
                    <span onClick={this.props.hideUnfollow} className="link-unfollow col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 btn-unfollow text-center">Unfollow</span>
                    <span onClick={this.props.hideUnfollow} className="link-cancel col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 text-center">Cancel</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Unfollow;