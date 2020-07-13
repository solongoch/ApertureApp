import React, { Component } from 'react'
import '../css/Navbar.css';

 class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container d-flex">            
            <a className="navbar-brand" href="www.youtube.com">Instagram</a>            
            <div className="m-auto d-none d-sm-block">
              <form className="form-inline search-form">
                <span className="fa fa-search-o searchIcon"> </span>
                <input className="form-control searchTerm" type="search" placeholder="Search" aria-label="Search"/>
              </form>
            </div>
            <div className="user-section">
              <a href="www.google.com"><i className="fa fa-compass"></i></a> 
              <a href="www.google.com"><i className="fa fa-heart-o"></i></a>
              <a href="www.google.com"><i className="fa fa-user-o"></i></a>
            </div>        
          </div>
      </nav> 
    );
  }
}

export default Navbar;