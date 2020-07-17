import React, { Component } from 'react'
import logoImage from "../../image/avatar.png";
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
     <div className="chgpwd-div">
       <div className="container">
          <div className="row align-items-center">
                <div className="col-12 col-sm-12 col-md-10 col-lg-7 col-xxs-6 mx-auto ">
                  <div className="card">
                    <form>
                      <div className="form-group">
                        <div className=" col-sm-10 col-md-12 col-lg-12">
                          <img className="avatar-img " src={logoImage} alt="Avatar" />
                        </div>
                          <div className="username-div col-sm-12 col-md-12 col-lg-12">
                                <h1 className="username-h1">rambhaindran_
                                </h1>
                          </div>
                        </div>
                        
                        <div className="form-group form-inline">
                          <label htmlFor="oldpassword"  className="col-form-label col-sm-5" 
                          style={{textAlign: 'right'}}>Old Password</label>
                          <input
                              type="password" name="oldpassword"
                              className="form-control shadow-none col-sm-7"
                              id="oldpassword" placeholder="Current Password"
                              value={this.state.oldpassword} onChange={this.onChange}/>
                        </div>
                      
                        <div className="form-group form-inline">
                          <label htmlFor="oldpassword" className="col-form-label col-sm-5" 
                          style={{textAlign: 'right'}}>New Password</label>
                          <input
                              type="password" name="newpassword"
                              className="form-control shadow-none col-sm-7"
                              id="newpassword" placeholder="New Password"
                              value={this.state.newpassword} onChange={this.onChange}/>

                        </div>
                
                        <div className="form-group form-inline">
                          <label htmlFor="oldpassword"  className="col-form-label col-sm-5" style={{textAlign: 'right'}}>Confirm New Password</label>
                          <input
                            type="password" name="confirmpassword"
                            className="form-control shadow-none col-sm-7"
                            id="confirmpassword" placeholder="Confirm New Password"
                            value={this.state.confirmpassword} onChange={this.onChange} />
                        </div>
                      
                      <div className="form-row">
                        
                        <div className="form-group col-md-10">
                          
                        <button type="submit" className="btn mt-3 btn-primary submit-btn ">Change Password</button>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
            </div>
         </div>
     </div>
    )
  }
}

export default ChangePassword;