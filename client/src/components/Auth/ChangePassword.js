import React, { Component } from 'react'
import logoImage from '../../image/Applebadge.png';
import '../css/ChangePassword.css';
import axios from 'axios'

class ChangePassword extends Component {
  constructor() {

    super();
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const changePass = {
      oldpassword: this.state.oldpassword,
      newpassword: this.state.newpassword,
      confirmpassword: this.state.confirmpassword
    };
    //API call
    axios
      .post('/api/changepassword', changePass)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  }
  render() {
    return (
      <div className="chgpwd-wrapper col-md-6 offset-md-4">
        <div className="row">
          <div className=" row userinfo-div">
            <img className="avatar-img" src={logoImage} alt="Avatar" />
            <div className="username-div">
              <h1 className="username-h1">rambhaindran_</h1>
            </div>
          </div>
          <div className="changepassword-div">
            <form className="changepassword-form" onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="oldpassword"
                  className="col-sm-6 col-lg-5 col-form-label">Old Password
                        </label>
                <div className="col-sm-6 col-lg-6">
                  <input
                    type="password"
                    name="oldpassword"
                    className="form-control shadow-none"
                    id="oldpassword"
                    placeholder="Current Password"
                    value={this.state.oldpassword}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="newpassword"
                  className="col-sm-6 col-lg-5 col-form-label">New Password
                        </label>
                <div className="col-sm-6 col-lg-6">
                  <input
                    type="password"
                    name="newpassword"
                    className="form-control shadow-none"
                    id="newpassword"
                    placeholder="New Password"
                    value={this.state.newpassword}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="confirmpassword"
                  className="col-sm-6 col-lg-5 col-form-label">Confirm New Password
                        </label>
                <div className="col-sm-6 col-lg-6">
                  <input
                    type="password"
                    name="confirmpassword"
                    className="form-control shadow-none"
                    id="confirmpassword"
                    placeholder="Confirm New Password"
                    value={this.state.confirmpassword}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">Change Password</button>
            </form>
          </div>

        </div>
      </div>


    )
  }
}

export default ChangePassword;