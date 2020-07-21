import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// load CSS
import '../css/suggestion.css';
// load images
import profilePicture from '../image/img-sq.jpg';

class Suggestion extends Component {
  constructor() {
    super();
    this.state = {
    }

    axios
      .post('/api/suggestion')
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div id="page-body">
        <div className="suggested-div">
          <span className="font-weight-bold">Suggested</span>
        </div>
        {/* Follower suggestion */}
        <div className="suggestions">
          {/* 1 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 2 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 3 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 4 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 5 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 6 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 7 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 8 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 9 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" />
              </Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 10 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>

          {/* 11 */}
          <div className="suggestion">
            <div className="post-header">
              <Link to="/"><img className="round-image image-50" src= {profilePicture} alt="User" /></Link>
              <div>
                <div className="username-div left-15 col-row-4"><Link to="/">Username</Link></div>
                <div className="left-15 col-row-4"><Link to="/">Name</Link></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <Link className="log-in blue-bg button font-weight-bold follow" to="/">Follow</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Suggestion;