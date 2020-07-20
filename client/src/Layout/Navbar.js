import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import CSS
import '../css/navbar.css';
// import images
import logo from '../image/aperture-logo.svg';
import profilePicture from '../image/img-sq.jpg';
import home from '../image/home.svg';
import homeActive from '../image/home-active.svg';
import findPeople from '../image/find-people.svg';
import findPeopleActive from '../image/find-people-active.svg';
import heart from '../image/heart.svg';
import heartActive from '../image/heart-active.svg';

class Navbar extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light mx-auto">
          {/* Logo */}
          <div className="logo-div col-lg-4 col-md-4 col-sm-4">
            <Link to="/"><img id="logo" src={logo} alt="ApertureApp logo" /></Link>
          </div>
          {/* Search */}
          <div className="search-div col-lg-4 col-md-4 col-sm-4">
            <form className="form-inline">
              <input
                id="search"
                className="form-control mr-sm-2"
                type="search"
                name="search"
                placeholder="Search"
                value="Search"
                aria-label="Search"
              />
            </form>
          </div>
          {/* Menus */}
          <div className="menus-div col-lg-4 col-md-4 col-sm-4">
            <ul className="navbar-nav">
              {/* <li className="nav-item menu blue-bg button"><Link id="log-in" className="nav-Link" to="/">Log In</Link></li>
              <li className="nav-item menu"><Link className="sign-up" className="nav-Link" to="/">Sign Up</Link></li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
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
                  <img className="menu" src={heart} aria-label="Notification" alt="Notification button" />
                  {/* <img className="menu active" src={heartActive} aria-label="Notification" alt="Active Notification button" /> */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <img className="menu round-image image-22" src={profilePicture} alt="My profile"/>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar;