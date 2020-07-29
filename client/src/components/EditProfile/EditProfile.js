import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './createprofile.css';
import axios from 'axios';
import classnames from 'classnames';
import Uploadavatar from './Uploadavatar';
import TextFieldGroup from '../common/TextFieldGroup';
import DeleteProfile from './DeleteProfile';

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      avatar: '',
      website: '',
      bio: '',
      email: '',
      mobile: '',
      errors: {},
      visible: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
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
      .post('/api/profile/edit', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="row">
          <div className="col-11 col-sm-4 col-md-4 col-lg-3 mr-3 ml-3 sidebar-maindiv">
            <div className="sidebar">
              <Uploadavatar />
              <hr />
              <div className="div-editchgpwd pb-3">
                <Link to="/changepassword" className="btn btn-primary">Change Password</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-7 col-md-7 col-lg-8 profile-info">
            <div className="form-group">
              <form onSubmit={this.onSubmit}>
                <h3>User Profile</h3>
                <div className="col-12">
                  <label htmlFor="Name"><h5>Name</h5></label>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <p className="createprofile-info">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                </div>

                <div className="col-12">
                  <label htmlFor="Name"><h5>Username</h5></label>
                  <TextFieldGroup
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.onChange}
                    error={errors.username}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Name"><h5>Website</h5></label>
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    type="text"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Name"><h5>Bio</h5></label>
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    rows="3"
                    placeholder=""
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  />
                </div>

                <h3>Personal Info</h3>
                <p className="createprofile-info">Provide your personal information. This won't be a part of your public profile</p>

                <div className="col-12">
                  <label htmlFor="Name"><h5>Email</h5></label>
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Name"><h5>Phone Number</h5></label>
                  <TextFieldGroup
                    placeholder="Phone Number"
                    name="mobile"
                    type="text"
                    value={this.state.mobile}
                    onChange={this.onChange}
                    error={errors.mobile}
                  />
                </div>

                <div className="form-group">
                  <label className="control-label pl-3"><h5>Gender</h5></label>
                  <div className="col-12 form-control-lg ui-select">
                    <select id="gender" className="form-control">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Custom">Custom</option>
                      <option value="Prefer Not To Say">Prefer Not to Say</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label pl-3"><h5>Account Privacy</h5></label>
                  <div className="col-12 form-control-lg ui-select">
                    <select id="privacy" className="form-control">
                      <option value="Male">Public</option>
                      <option value="Female">Private</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary col-4 btn-createprofile" type="submit">Submit
                </button>
              </form>
            </div>
            <DeleteProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;