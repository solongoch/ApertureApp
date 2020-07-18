import React, { Component } from 'react';
import '../css/navbar.css';
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
        <nav class="navbar navbar-expand-lg navbar-light mx-auto">
          {/* Logo */}
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <a href="#"><img id="logo" src={logo} alt="ApertureApp logo" /></a>
          </div>
          {/* Search */}
          <div class="col-lg-4 col-md-4 col-sm-4">
            <form class="form-inline">
              <input
                id="search"
                class="form-control mr-sm-2"
                type="search"
                name="search"
                placeholder="Search"
                value="Search"
                aria-label="Search"
              />
            </form>
          </div>
          {/* Menus */}
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 d-inline-flex justify-content-end">
            <ul class="navbar-nav">
              {/* <li class="nav-item menu blue-bg button"><a id="log-in" class="nav-link" href="#">Log In</a></li>
              <li class="nav-item menu"><a class="sign-up" class="nav-link" href="#">Sign Up</a></li> */}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  {/* <img class="menu" src={home} aria-label="Home" /> */}
                  <img class="menu active" src={homeActive} aria-label="Home" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img class="menu" src={findPeople} aria-label="Find People" />
                  {/* <img class="menu active" src={findPeopleActive} aria-label="Find People" /> */}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img class="menu" src={heart} aria-label="Notification" />
                  {/* <img class="menu active" src={heartActive} aria-label="Notification" /> */}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img class="menu round-image image-22" src={profilePicture} alt="explore"/>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar;