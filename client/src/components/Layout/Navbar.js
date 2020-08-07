import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import CSS
import './navbar.css';
// import Components
import SearchComponent from './SearchProfile';
// import images
import logo from '../../image/aperture-logo.svg';
import home from '../../image/home.svg';
import homeActive from '../../image/home-active.svg';
import findPeople from '../../image/find-people.svg';
import findPeopleActive from '../../image/find-people-active.svg';
// for logout
import { logoutUser } from '../../actions/authActions';
import PropTypes from "prop-types";

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { avatar } = this.props.profile;
    const { pathname } = this.props.location;
    let userAvatar = null;

    if (avatar) { //Navbar avatar will change if user uploads the new avatar  
      userAvatar = (<img className="menu round-image image-22" src={avatar} alt={avatar} />);
    } else {
      userAvatar = (<img className="menu round-image image-22" src={user.avatar} alt={user.name} />);
    }

    // when user NOT logged in
    const guestMenus = (
      <ul className="navbar-nav">
        {/* LOG IN button */}
        <li className="nav-item blue-bg button">
          <Link className="nav-link unauth-button" to="/login"><span className="log-in-button">Log In</span></Link>
        </li>
        {/* SIGN UP button */}
        <li className="nav-item">
          <Link className="nav-link unauth-button" to="/signup"><span className="sign-up-button">Sign Up</span></Link>
        </li>
      </ul>
    );

    // when user logged in
    const userMenus = (
      <ul className="navbar-nav">
        {/* CREATE POST button */}
        <li className="nav-item">
          <Link className="nav-link" to="/create">
            {
              (pathname === '/create')
                ? <i className="fas fa-plus-square fa-2x"></i> 
                : <i className="far fa-plus-square fa-2x"></i>
            }
          </Link>
        </li>

        {/* HOME button */}
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            {
              (pathname === '/home')
                ? <img className="menu active" src={homeActive} aria-label="Home" alt="Active Home button" />
                : <img className="menu" src={home} aria-label="Home" alt="Home button" />
            }
          </Link>
        </li>

        {/* SUGGESTION button */}
        <li className="nav-item">
          <Link className="nav-link" to="/suggestion">
            {
              (pathname === '/suggestion')
                ? <img className="menu active" src={findPeopleActive} aria-label="Find People" alt="Active Suggestion button" />
                : <img className="menu" src={findPeople} aria-label="Find People" alt="Suggestion button" />
            }
          </Link>
        </li>

        {/* NOTIFICATION button */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/notification">
            {
              (pathname === '/notification')
                ? <i className="fas fa-heart fa-2x"></i>
                : <i className="far fa-heart fa-2x"></i>
            }
          </Link>
        </li> */}

        {/* DROPDOWN PROFILE menu button */}
        <li className="nav-item dropdown">
          <div className="nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {userAvatar}
          </div>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            {/* MY PROFILE button */}
            <Link className="dropdown-item" to={`/profile/${user.username}`}>My Profile</Link>
            <div className="dropdown-divider"></div>
            {/* LOG OUT button */}
            <Link className="dropdown-item" to="/" onClick={this.onLogoutClick.bind(this)}>Log out</Link>
          </div>
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
          <SearchComponent />

          {/* Menus */}
          <div className="menus-div col-lg-4 col-md-4 col-sm-4 col-xs-8">
            {isAuthenticated ? userMenus : guestMenus}
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
