import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PhoneImage from '../../../image/insta2.png';
import logoImage from '../../../image/logo2.png';
import AppleBadge from '../../../image/Applebadge.png';
import GoogleBadge from '../../../image/googleplay.png';
import './signup.css';
import SignupInputField from './SignupInputField';
import SignupPasswordField from './SignupPasswordField';
import PropTypes from "prop-types";

//import connect used to talk to the redux store 
import { connect } from 'react-redux';
//import registerUser action to trigger action
import { registerUser } from '../../../actions/authActions';

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
      isPasswordShown: !this.state.isPasswordShown
    });
  }
  //toggle password2 eye icon
  togglePassword2Visiblity = () => {
    this.setState({
      isPassword2Shown: !this.state.isPassword2Shown
    });
  }
  //read values from input field to state
  onChange(e) {
    this.setState(
      {
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
  canBeSubmitted() {
    const { name, username, email, password, password2 } = this.state;
    return (
      email.length > 0 && name.length > 0 && username.length > 0 &&
      password.length > 0 && password2.length > 0
    );
  }
  //Make API call onSubmit of the form
  onSubmit(e) {
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
    //trigger action
    this.props.registerUser(newUser, this.props.history);
  }

  //trigger whenever we get newProps 
  //Usage  assign this.props.errors to local setState.errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { name, username, email, isPasswordShown, isPassword2Shown, errors, password, password2 } = this.state;
    const isEnabled = this.canBeSubmitted();


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

                <SignupInputField
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <SignupInputField
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <SignupInputField
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <SignupPasswordField
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                  onClick={this.togglePasswordVisiblity}
                  isPasswordShown={isPasswordShown}
                />
                <SignupPasswordField
                  type={isPassword2Shown ? "text" : "password"}
                  name="password2"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  onClick={this.togglePassword2Visiblity}
                  isPassword2Shown={isPassword2Shown}
                />
                <div className="col-auto mb-5">
                  <button type="submit"
                    className="btn btn-block btn-primary shadow-none btn-signup"
                    disabled={!isEnabled}>Sign up
                  </button>
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

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

//state:redux state (Assign redux state.errors to this.props.errors)
const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
