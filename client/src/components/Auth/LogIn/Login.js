import React, { Component } from 'react'
import {connect} from 'react-redux';
import {loginUser} from '../../../actions/authActions';
import './login.css';
import Logo from '../../../image/aperturelogo.png';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginId: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      loginId: this.state.loginId,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login-beta">
        <div className="row-login">
          
          <div className="phone-app-demo-beta">       
          </div>

          <div className="form-data-beta">
            <form onSubmit={this.onSubmit}>
              <div className="logo-beta">
                <img src={Logo} alt="Logo" />
              </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Username or Email Address"
                    name="loginId"
                    type="loginId"
                    value={this.state.loginId}
                    onChange={this.onChange}
                    error={errors.loginId}
                  />
                  </div>
                  <div className="form-group">
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  </div>
                  
                <button className="btn-beta btn-primary" type="submit">Log In</button>
              </form>
              <div className="sign-up-beta">
                <p className="have-an-account">Don't have an account? <Link to="/signup" className="have-signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);