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

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // when user not logged in
    const guestMenus = (
      <ul className="navbar-nav">
        <li className="nav-item blue-bg button"><Link className="nav-link unauth-button" to="/login"><span className="log-in-button">Log In</span></Link></li>
        <li className="nav-item"><Link className="nav-link unauth-button" to="/signup"><span className="sign-up-button">Sign Up</span></Link></li>
      </ul>
    );
  
    // when user logged in
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
        <li className="nav-item dropdown">
          <div className="nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img className="menu round-image image-22" src={user.avatar} alt={user.name} />
          </div>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${user.username}`}>My Profile</Link>
            <div className="dropdown-divider"></div>
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

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));