import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './landing.css'
import Logo from '../../image/aperturelogo.png';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class Landing extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
    return (
      <div className="landing">
        <div className="row-landing">
          <div className="col-md-12 text-center">
            <div className="logo-alpha"><img src={Logo} alt="Logo" /></div>
            <p className="lead"> Sign up to share photos with your friends </p>
            <Link to="/login" className="btn-alpha btn-lg">Log in with username or email</Link>
            <hr />
            <Link to="/signup" className="btn-alpha btn-lg mr-2">Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(withRouter(Landing));