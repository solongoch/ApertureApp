import React, { Component } from 'react'
import logoImage from "../../image/avatar.png";
import './changepassword.css';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import ChangePasswordInputField from './ChangePasswordInputField';

class ChangePassword extends Component {
  constructor() {

    super();
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      errors: {},
      avatar: '',
      username: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
  }


   //call after component is mounted in browser
   componentDidMount() {
    if (this.props.auth.user) {
      let { avatar, username } = this.props.auth.user;
      this.setState({ avatar: avatar });
      this.setState({ username: username })
    }
  }
  //trigger whenever we get newProps 
  //Usage  assign this.props.errors to local setState.errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors, avatar, username } = this.state;
    return (
       <div className="container">
          <div className="chgpwd-container">
          <div className="row">
                  <div className="card chgpwd-card">
                    <form className="Chgpwd-form" onSubmit={this.onSubmit}>
                        <div className="form-group chgpwduser-div col-sm-12 col-md-12 col-lg-12">
                          <div className="  ">
                            <img className="chgpwdavatar-img" src={avatar} alt="Avatar" />
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
                              placeholder="Current Password"
                              value={this.state.oldpassword}
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
                              value={this.state.newpassword}
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
                            value={this.state.confirmpassword}
                            onChange={this.onChange}
                            />
                          </div>
                        
                      
                      <div className="form-row">                        
                        <div className="form-group col-sm-12 col-md-12 col-lg-12">                          
                        <button type="submit" 
                                className="btn mt-3 btn-primary submit-btn">Change Password</button>
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
  auth: state.auth
});

export default connect(mapStateToProps, { changePassword })(withRouter(ChangePassword));