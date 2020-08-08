import React, { Component } from 'react'
import './changepassword.css';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/profileActions';
import { withRouter, Link } from 'react-router-dom';
import ChangePasswordInputField from './ChangePasswordInputField';

class ChangePassword extends Component {
  constructor() {

    super();
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      errors: {},
      loading: false,
      isEnabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value, isEnabled: true });
    if ((this.state.errors.hasOwnProperty([e.target.name]))) {
      this.clearError(e.target.name);
    }
  }

  //clear errors onChange
  clearError(errorProperty) {
    var errors = this.state.errors;
    var errPropertyValue = errors[errorProperty];
    if (errPropertyValue.length > 0) {
      errors[errorProperty] = ''
      this.setState({ errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const changePass = {
      oldpassword: this.state.oldpassword,
      newpassword: this.state.newpassword,
      confirmpassword: this.state.confirmpassword
    };
    //trigger action
    this.props.changePassword(changePass, this.props.history);
    this.setState({ loading: true , isEnabled: false })
  }


  //trigger whenever we get newProps 
  //Usage  assign this.props.errors to local setState.errors
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false , isEnabled: false })
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { username } = this.props.auth.user;
    const { oldpassword, newpassword, confirmpassword, errors, loading, isEnabled } = this.state
    const profileAvatar = this.props.profile.avatar;
    let userAvatar = null;

    if (profileAvatar) { //Navbar avatar will change if user uploads the new avatar  
      userAvatar = (<img className="chgpwdavatar-img" src={profileAvatar} alt={username} />);
    }
    return (
      <div className="container">
        <div className="chgpwd-container">
          <div className="row">
            <div className="card chgpwd-card">
              <Link to={`/edit/${username}`} className="chgpwd-cancel">
                <i className="fa fa-times " style={{ float: 'right', fontSize: '20px' }} aria-hidden="true"></i>
              </Link>
              <form className="Chgpwd-form" onSubmit={this.onSubmit}>
                <div className="form-group chgpwduser-div col-sm-12 col-md-12 col-lg-12">
                  <div className="Chgpwd-avatar  ">
                    {userAvatar}
                  </div>
                  <div className="username-div">
                    <h1 className="username-h1">{username}</h1>
                  </div>
                </div>

                <div className="form-group form-inline">
                  <label htmlFor="oldpassword"
                    className="col-form-label password-label col-sm-5 col-md-5">Old Password</label>
                  <ChangePasswordInputField
                    type="password"
                    name="oldpassword"
                    placeholder="Old Password"
                    value={oldpassword}
                    onChange={this.onChange}
                    error={errors.oldpassword}
                  />
                </div>

                <div className="form-group form-inline">
                  <label htmlFor="newpassword"
                    className="col-form-label password-label col-sm-5 col-md-5 col-lg-5" >New Password</label>
                  <ChangePasswordInputField
                    type="password"
                    name="newpassword"
                    placeholder="New Password"
                    value={newpassword}
                    onChange={this.onChange}
                    error={errors.newpassword}
                  />
                </div>

                <div className="form-group form-inline">
                  <label htmlFor="confirmpassword"
                    className="col-form-label password-label col-sm-5 col-md-5 col-lg-5">Confirm New Password</label>
                  <ChangePasswordInputField
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm New Password"
                    value={confirmpassword}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group col-sm-12 col-md-12 col-lg-12">
                    <button type="submit"
                      className="btn mt-3 btn-primary submit-btn" disabled={!isEnabled}>Change Password
                       {loading && <i className="fa fa-refresh fa-spin ml-2" style={{ marginRight: "10px", fontSize: "15px" }} />}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  auth: state.auth,
  profile: state.profile.profile
});

export default connect(mapStateToProps, { changePassword })(withRouter(ChangePassword));