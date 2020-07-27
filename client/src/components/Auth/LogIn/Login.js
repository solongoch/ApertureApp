import React, { Component } from 'react'
import classnames from "classnames";
import './login.css';
import Logo from '../../../image/aperturelogo.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../../actions/authActions';

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
                  <input
                    type="loginId"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.loginId,
                    })}
                    placeholder="Username or Email Address"
                    name="loginId"
                    value={this.state.loginId}
                    onChange={this.onChange}
                  />
                  {errors.loginId && (
                    <div className="invalid-feedback">{errors.loginId}</div>
                  )}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                <button className="btn-beta btn-primary" type="submit">Log In</button>
              </form>
              <div className="sign-up-beta">
                Don't have an account? <Link to="/signup" className="btn-beta btn-lg btn-info mr-2">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);