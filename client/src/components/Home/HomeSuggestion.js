import React, { Component } from 'react'
import { Link } from "react-router-dom";
import profilePicture from '../../image/img-sq.jpg';

class HomeSuggestion extends Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <span className="font-weight-bold">Suggestions For You</span>
          <Link to="/" className="font-weight-bold">See all</Link>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-32" src={profilePicture} alt="User" />
            </Link>
            <div>
              <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
              <div className="make-gray left-15">Followed by xyz + 14 more</div>
            </div>
          </div>
          <div className="sign-up-button font-weight-bold follow">Follow</div>
        </div>


        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-32" src={profilePicture} alt="User" />
            </Link>
            <div>
              <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
              <div className="make-gray left-15">Followed by xyz + 14 more</div>
            </div>
          </div>
          <div className="sign-up-button font-weight-bold follow">Follow</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-32" src={profilePicture} alt="User" />
            </Link>
            <div>
              <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
              <div className="make-gray left-15">Followed by xyz + 14 more</div>
            </div>
          </div>
          <div className="sign-up-button font-weight-bold follow">Follow</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-32" src={profilePicture} alt="User" />
            </Link>
          <div>
              <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
              <div className="make-gray left-15">Followed by xyz + 14 more</div>
            </div>
          </div>
          <div className="sign-up-button font-weight-bold follow">Follow</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-section">
            <Link to="/">
              <img className="round-image image-32" src={profilePicture} alt="User" />
            </Link>
            <div>
              <div className="font-weight-bold left-15"><Link to="/">Username</Link></div>
              <div className="make-gray left-15">Followed by xyz + 14 more</div>
            </div>
          </div>
          <div className="sign-up-button font-weight-bold follow">Follow</div>
        </div>
      </div>
    )
  }
}

export default HomeSuggestion;