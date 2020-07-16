import React, { Component } from 'react'
import '../css/Edit-profile.css';
import {Link} from 'react-router-dom';
import Avatar from '../../img/instav.png';


class Profile extends Component {
  render() {
    return (
      <div className="edit-profile">
        <h1>Edit Profile</h1>
        <hr/>
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <img src={Avatar} className="avatar img-circle" alt="avatar" />
              <h6 className="text-center">Change Avatar</h6>
              <input type="file" class="form-control"></input>
              <Link to="/changepassword" className="btn btn-lg btn-info mr-2">Change Password</Link>
            </div>
            </div>

        <div className="profile-info col-md-9">

          <form class="form-horizontal">
            <div className="form-group">
              <label className="col-lg-3 control label">Name</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="Name"></input>
              </div>
            </div>

            <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Username</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="Username"></input>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Website</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="Website"></input>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Bio</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value=""></input>
              </div>
            </div>

            <h3>Personal Info</h3>
            <p>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Email</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="Email"></input>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Mobile</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" value="Mobile"></input>
              </div>
            </div>

            <div class="form-group">
            <label class="col-lg-3 control-label">Gender</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Custom">Custom</option>
                  <option value="Prefer Not To Say">Prefer Not to Say</option>
                </select>
              </div>
            </div>
          </div>

            <div className="form-group">
              <label className="col-md-3 control-label"></label>
              <div className="col-md-8">
                <input type="reset" className="btn btn-default" value="Save Changes"></input>
                <span></span>
                <Link to="/remove" className="btn btn-lg btn-info mr-2">Delete Account</Link>
              </div>
            </div>


          </form>
          </div>

        </div>
      </div>




    );
  }
}

export default Profile;