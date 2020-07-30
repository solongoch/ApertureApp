import React, { Component } from 'react'
import logoImage from "../../image/avatar.png";
import './changepassword.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component {
  constructor() {

    super();
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      errors: {}
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

  //trigger whenever we get newProps 
  //Usage  assign this.props.errors to local setState.errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const{errors} = this.state;
    return (
       <div className="container">
          <div className="chgpwd-container">
          <div className="row">
                  <div className="card chgpwd-card">
                    <form className="Chgpwd-form" onSubmit={this.onSubmit}>
                        <div className="form-group chgpwduser-div col-sm-12 col-md-12 col-lg-12">
                          <div className="  ">
                            <img className="chgpwdavatar-img" src={logoImage} alt="Avatar" />
                          </div>
                            <div className="username-div"> 
                               <h1 className="username-h1">rambhaindra_</h1>
                            </div>
                        </div>
                        
                        <div className="form-group form-inline">
                          <label htmlFor="oldpassword" className="col-form-label password-label col-sm-5 col-md-5">Old Password</label>
                          <input
                              type="password" 
                              name="oldpassword"
                              className={classNames('form-control shadow-none col-sm-7 col-md-7' , 
                                {'is-invalid' : errors.oldpassword})
                              }
                              id="oldpassword" placeholder="Current Password"
                              value={this.state.oldpassword} onChange={this.onChange}
                          />
                              {/*show invalid-feedback div only if errors.oldPassword is true */}
                              {errors.oldpassword && (<div className="invalid-feedback">{errors.oldpassword}</div>)}
                        </div>
                      
                        <div className="form-group form-inline">
                          <label htmlFor="newpassword" className="col-form-label password-label col-sm-5 col-md-5 col-lg-5" >New Password</label>
                          <input
                              type="password" name="newpassword"
                              className=
                              {classNames('form-control shadow-none col-sm-7 col-md-7 col-lg-7' , 
                                {'is-invalid' : errors.newpassword})
                              }
                              id="newpassword" placeholder="New Password"
                              value={this.state.newpassword} onChange={this.onChange}/>
                                {errors.newpassword && (<div className="invalid-feedback">{errors.newpassword}</div>)
                                }
                        </div>
                
                        <div className="form-group form-inline">
                          <label htmlFor="confirmpassword"  className="col-form-label password-label col-sm-5 col-md-5 col-lg-5">Confirm New Password</label>
                          <input
                            type="password" name="confirmpassword"
                            className=
                            {
                              classNames('form-control shadow-none col-sm-7 col-md-7 col-lg-7' , 
                              {'is-invalid' : errors.confirmpassword})
                            }
                            id="confirmpassword" placeholder="Confirm New Password"
                            value={this.state.confirmpassword} onChange={this.onChange} />
                             {
                                errors.confirmpassword && (<div className="invalid-feedback">{errors.confirmpassword}</div>)
                             }
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
    )
  }
}

//state:redux state (Assign redux state.errors to this.props.errors)
const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { changePassword })(withRouter(ChangePassword));