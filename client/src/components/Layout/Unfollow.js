import React, { Component } from 'react';
import logoImage from "../../image/avatar.png";
import { Link } from 'react-router-dom'
import '../css/unfollow.css';

class Unfollow extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className='subwrapper-div'>
          <div className="card unfollow-card mx-auto">
            <div className="row">
              <form className="following-form">
                <div className="form-group">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 text-center">
                    <img className="avatar-img-unfollow " src={logoImage} alt="Avatar" />
                  </div>
                  <div className="info-div col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6">
                    <p className="info-p">
                      Unfollow @keerthikadambala?
                    </p>
                  </div>               
                  <div className="action-div">
                    <button className=" btn-unfollow col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 shadow-none">
                      Unfollow</button>           
                    <Link to='/followings' className="link-cancel col-12 col-sm-12 col-md-12 col-lg-12 col-xxs-6 text-center">Cancel</Link>
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