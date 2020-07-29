import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './landing.css'
import Logo from '../../image/aperturelogo.png';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
              <div className="row-landing">
                  <div className="col-md-12 text-center">
                    <div className="logo-alpha"><img src={Logo} alt="Logo" /></div>
                    <p className="lead"> Sign up to share photos with your friends </p>
                    <Link to="/login" className="btn-alpha btn-lg">Log in with username or email</Link>
                    <hr/>
                    <Link to="/signup" className="btn-alpha btn-lg mr-2">Sign Up</Link>
                  </div>
                </div>
              </div>
        )
    }
}
