import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PhoneImage from '../../image/insta2.png';
import logoImage from '../../image/logo2.png';
import AppleBadge from '../../image/Applebadge.png';
import GoogleBadge from '../../image/googleplay.png';
import '../css/signup.css';
import classNames from 'classnames';

class Signup extends Component {
  constructor() {

    super();
    //Initialize state
    this.state = {
      email: '',
      name: '',
      username: '',
      password: '',
      password2: '',
      errors: {},
      isPasswordShown: false,
      isPassword2Shown: false
    };
    //bind input values to this.onChange()
    this.onChange = this.onChange.bind(this);
    //bind the onSubmit of form when user clicks the signIn button(submit type)
    this.onSubmit = this.onSubmit.bind(this);
  }

  //toggle password eye icon
  togglePasswordVisiblity = () => {
    this.setState({
      isPasswordShown:!this.state.isPasswordShown
    });
  }
//toggle password2 eye icon
  togglePassword2Visiblity = () => {
    this.setState({
      isPassword2Shown:!this.state.isPassword2Shown
    });
  }
  //read values from input field to state
  onChange(e){ 
    this.setState(
      {
        [e.target.name] : e.target.value
      });
  }

  //Make API call onSubmit of the form
  onSubmit(e){
    //cancels default behavoiur of submit button from routing to another page 
    e.preventDefault();
    //build user object to make API call
    const newUser = {
      email: this.state.email,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    //API call
    axios
      .post('/api/users/signup', newUser)
      .then(res=> console.log(res.data))
      .catch(err => console.log(this.setState({errors: err.response.data})));
  }
  
  render() {
    const {isPasswordShown,isPassword2Shown,errors,password,password2} = this.state;
    return (
      <div className="signup-wrapper">
        <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-7 d-none d-sm-none d-md-block d-lg-block">
              <img className="signin-phoneImg" src={PhoneImage} alt="HomeImage" />
            </div>
          <div className="right-column-container col-md-5 col-lg-5 col-xl-5 ">
            <div className="right-column">
              <h1 className="logoText">aperture</h1>
              <h2 className="info">Sign up to see photos and videos from your friends.</h2>
              <form className="signup-form" onSubmit={this.onSubmit}>
                <div className="form-group signup_fg text-xs-center col-auto">
                  <input
                    type="text"
                    className={classNames("form-control inputstyles shadow-none" , {"is-invalid" : errors.email})}
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {/*show invalid-feedback error-style div only if errors.name is true */}
                  {errors.email && (<div className="invalid-feedback error-style">{errors.email}</div>)}
                </div>
                <div className="form-group signup_fg col-auto">
                  <input
                    type="text"
                    className={ classNames("form-control inputstyles shadow-none" , {'is-invalid' : errors.name})}
                    placeholder="Full Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (<div className="invalid-feedback error-style">{errors.name}</div>)}
                </div>
                <div className="form-group signup_fg col-auto">
                  <input
                    type="text"
                    className={ classNames("form-control inputstyles shadow-none" , {'is-invalid' : errors.username})}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (<div className="invalid-feedback error-style">{errors.username}</div>)}
                </div>
                <div className="form-group signup_fg col-auto">
                 <input
                    type={isPasswordShown ? "text" : "password"}
                    className={ classNames("form-control inputstyles shadow-none" , {'is-invalid' : errors.password})}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {/* display eye icon only if password has value */} 
                  {password &&( 
                      <span className={`fa fa-eyeicon ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={this.togglePasswordVisiblity} 
                      />)           
                  } 
                  {errors.password && (<div className="invalid-feedback error-style">{errors.password}</div>)}
                </div>
                <div className="form-group signup_fg col-auto">
                  <input
                    type={isPassword2Shown ? "text" : "password"}
                    className={ classNames("form-control inputstyles shadow-none" , {'is-invalid' : errors.password2})}
                    placeholder="Confirm password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {/* display eye icon only if password2 has value */} 
                  {password2 && ( 
                      <span className={`fa fa-eyeicon ${ isPassword2Shown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={this.togglePassword2Visiblity}
                      />)
                  }
                  {errors.password2 && (<div className="invalid-feedback error-style ">{errors.password2}</div>)}
                </div>
                <div className ="col-auto mb-5">
                <button type="submit" className="btn btn-block btn-primary shadow-none btn-signup">Sign up</button>
                </div>
              </form>           
                  <p className="terms col-auto">
                  By signing up, you agree to our <b>Terms , Data Policy</b> and <b>Cookies Policy</b>.
                  </p>
            </div>
            <div className="right-column-login">
              <p className="have-an-account">Have an account? <Link className='have-login' to="/login">Log in</Link> </p>
            </div>
            <div className="get-the-app">
              <img src={logoImage} alt="LogoImage" style={{ width: 30 }} />
              <span>Get the app.</span>
              <div className="badges">
                <img src={AppleBadge} alt="AppStore" />
                <img src={GoogleBadge} alt="GoolgePlay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Signup;
