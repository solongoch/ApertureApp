import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      errors: {}
    };
    //bind input values to this.onChange()
    this.onChange = this.onChange.bind(this);

  }

  //read values from input field to state
  onChange(e){ 
    this.setState(
      {
        [e.target.name] : e.target.value
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-none d-sm-none d-md-block d-lg-block">
            <img className="phoneImg" src={PhoneImage} alt="HomeImage" />
          </div>
          <div className="col-lg-6 col-md-6 right-column-container">
            <div className="right-column">
              <img src={logoImage} alt="LogoImage" style={{ width: 50 }} />
              <h1 className="logoText">aperture</h1>
              <h2 className="info">Sign up to see photos and videos from your friends.</h2>
              <form className="signup-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary">Sign up
                </button>
              </form>
              <p className="terms">
                By signing up, you agree to our <b>Terms , Data Policy</b> and <b>Cookies Policy</b>.
              </p>
            </div>
            <div className="right-column-login">
              <p className="have-an-account">Have an account? <Link to="/">Log in</Link> </p>
            </div>
            <div className="get-the-app">
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
