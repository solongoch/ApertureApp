import React, { Component } from 'react'
import axios from "axios";
import classnames from "classnames";
import '../css/login.css';
import Logo from '../../image/aperturelogo.png';
import {Link} from 'react-router-dom';

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

    axios
      .post("/api/users/login", user)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="row">
          
          <div className="phone-app-demo">       
          </div>

          <div className="form-data">
            <form onSubmit={this.onSubmit}>
              <div className="logo">
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
                <button className="btn btn-primary" type="submit">Log In</button>
              </form>
              <div className="sign-up">
                Don't have an account? <Link to="/signup" className="btn btn-lg btn-info mr-2">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;