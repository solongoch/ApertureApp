import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/Landing.css'
import Logo from '../../img/aperturelogo.png';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
              <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="logo"><img src={Logo} alt="Logo" /></div>
                    <p className="lead"> Sign up to share photos with your friends </p>
                    <Link to="/login" className="btn btn-lg btn-light">Log in with username or email</Link>
                    <hr/>
                    <Link to="/signup" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                  </div>
                </div>
              </div>
        )
    }
}
