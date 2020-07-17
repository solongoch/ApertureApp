import React, { Component } from 'react'
import '../css/Edit-profile.css';
import {Link} from 'react-router-dom';
import Avatar from '../../img/instav.png';
import axios from 'axios';
import classnames from 'classnames';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      website: '',
      bio: '',
      email: '',
      mobile: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      name: this.state.name,
      username: this.state.email,
      website: this.state.website,
      bio: this.state.bio,
      email: this.state.email,
      mobile: this.state.mobile
    };

    axios
      .get('/api/profile/accounts/edit', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="edit-profile">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <img src={Avatar} className="avatar img-circle" alt="avatar" />
              <h6 className="text-center">Change Avatar</h6>
              <input type="file" className="form-control"></input>
              <Link to="/changepassword" className="btn btn-lg mr-2">Change Password</Link>
            </div>
            </div>

        <div className="profile-info col-md-9">

        <Link to="/changepassword" className="btn btn-lg mr-2 password-mobile">Change Password</Link>
          <form onSubmit={this.onSubmit}>
          <h3> Edit User Profile</h3>
            <div className="form-group">
              <label className="col-lg-3 control-label">Name</label>
              <div className="col-lg-10">
                <input 
                type="text" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>

            <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Username</label>
              <div className="col-lg-10">
                <input 
                type="text" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.username
                })}
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Website</label>
              <div className="col-lg-10">
                <input 
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.website
                })} 
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                />
                {errors.website && (
                  <div className="invalid-feedback">{errors.website}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Bio</label>
              <div className="col-lg-10">
                <input 
                type="text"
                className={classnames("bio form-control form-control-lg", {
                  "is-invalid": errors.bio
                })} 
                placeholder=""
                name="Bio"
                value={this.state.bio}
                onChange={this.onChange}
                />
                {errors.bio && (
                  <div className="invalid-feedback">{errors.bio}</div>
                )}
              </div>
            </div>
            <h3>Edit Personal Info</h3>
            <p>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Email</label>
              <div className="col-lg-10">
                <input 
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })} 
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Phone Number</label>
              <div className="col-lg-10">
                <input 
                type="text" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.mobile
                })}
                placeholder="Phone Number"
                name="Moble"
                value={this.state.mobile}
                onChange={this.onChange}
                />
                {errors.mobile && (
                  <div className="invalid=feedback">{errors.mobile}</div>
                )}
              </div>
            </div>

            <div className="form-group">
            <label className="col-lg-3 control-label">Gender</label>
            <div className="col-lg-10">
              <div className="ui-select">
                <select id="gender" className="form-control">
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
              <div className="col-md-10">
                <button className="btn btn-primary" type="submit">Update Profile</button>
                <div className="has-separator">Terminate Account</div>
                <Link to="/remove" className="btn btn-lg btn-info mr-2 delete">Delete Account</Link>
              </div>
            </div>


          </form>
          </div>
        </div>
      </div>




    );
  }
}

export default EditProfile;