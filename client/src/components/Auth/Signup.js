import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PhoneImage from '../../image/insta2.png';
import logoImage from '../../image/logo2.png';
import AppleBadge from '../../image/Applebadge.png';
import GoogleBadge from '../../image/googleplay.png';
import '../css/Signup.css';

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
    //bind password eye onclick methods
    this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
    this.togglePassword2Visiblity = this.togglePassword2Visiblity.bind(this);
  }

  //toggle password eye icon
  togglePasswordVisiblity =()=>{
    this.setState({
      isPasswordShown:!this.state.isPasswordShown
    });
  }
//toggle password2 eye icon
  togglePassword2Visiblity =()=>{
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
      .catch(err => console.log(err.response.data));
  }
  
  render() {
    const {isPasswordShown,isPassword2Shown} = this.state;
    return (
      <div className="signup-wrapper">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xl-7 d-none d-sm-none d-md-block d-lg-block">
            <img className="phoneImg" src={PhoneImage} alt="HomeImage" />
          </div>
          <div className="col-md-6 col-lg-5 col-xl-5 right-column-container">
            <div className="right-column">
              <h1 className="logoText">aperture</h1>
              <h2 className="info">Sign up to see photos and videos from your friends.</h2>
              <form className="signup-form" onSubmit={this.onSubmit}>
                <div className="form-group text-xs-center">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Full Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type={isPasswordShown ? "text" : "password"}
                    className="form-control shadow-none"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    
                  />
                  { this.state.password ? 
                      <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={this.togglePasswordVisiblity} 
                      />
                    : null
                  }
                
                </div>
                <div className="form-group">
                  <input
                    type={isPassword2Shown ? "text" : "password"}
                    className="form-control shadow-none"
                    placeholder="Confirm password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    required
                  />
                  { this.state.password2 ? 
                      <i 
                        className={`fa ${ isPassword2Shown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={this.togglePassword2Visiblity}
                      />
                    : null
                  }
                </div>
                <button type="submit" className="btn btn-block btn-primary">Sign up</button>
              </form>
              <p className="terms">
                By signing up, you agree to our <b>Terms , Data Policy</b> and <b>Cookies Policy</b>.
              </p>
            </div>
            <div className="right-column-login">
              <p className="have-an-account">Have an account? <Link to="/">Log in</Link> </p>
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
