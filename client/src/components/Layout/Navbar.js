import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import CSS
import '../css/navbar.css';
// import images
import logo from '../../image/aperture-logo.svg';
import profilePicture from '../../image/img-sq.jpg';
import home from '../../image/home.svg';
import homeActive from '../../image/home-active.svg';
import findPeople from '../../image/find-people.svg';
import findPeopleActive from '../../image/find-people-active.svg';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
  
    const guestMenus = (
      <ul className="navbar-nav">
        <li className="nav-item blue-bg button"><Link className="nav-link unauth-button" to="/login"><span className="log-in-button">Log In</span></Link></li>
        <li className="nav-item"><Link className="nav-link unauth-button" to="/signup"><span className="sign-up-button">Sign Up</span></Link></li>
      </ul>
    );
  
    const userMenus =(
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/create">
            {/* Active */}
            {/* <i className="fas fa-plus-square fa-2x"></i> */}
            {/* Not Active */}
            <i className="far fa-plus-square fa-2x"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            {/* <img className="menu" src={home} aria-label="Home" alt="Home button" /> */}
            <img className="menu active" src={homeActive} aria-label="Home" alt="Active Home button" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/suggestion">
            <img className="menu" src={findPeople} aria-label="Find People" alt="Suggestion button" />
            {/* <img className="menu active" src={findPeopleActive} aria-label="Find People" alt="Active Suggestion button" /> */}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="far fa-heart fa-2x"></i>
            {/* <i className="fas fa-heart fa-2x"></i> */}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            <img className="menu round-image image-22" src={profilePicture} alt="My profile"/>
          </Link>
        </li>
      </ul>
    );

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light mx-auto">
          {/* Logo */}
          <div className="logo-div col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <Link to="/home"><img id="logo" src={logo} alt="ApertureApp logo" /></Link>
          </div>
          {/* Search */}
          <div className="search-div col-lg-4 col-md-4 col-sm-4">
            <form className="form-inline">
              {/* <i className="fas fa-search" aria-hidden="true"></i> */}
              <input
                id="search"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          {/* Menus */}
          <div className="menus-div col-lg-4 col-md-4 col-sm-4 col-xs-8">
            {isAuthenticated ? userMenus : guestMenus }
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);