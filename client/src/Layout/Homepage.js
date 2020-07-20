import React, { Component } from 'react';
// load CSS
import '../css/global.css';
import '../css/homepage.css';
// load images 
import profilePicture from '../image/img-sq.jpg';
import postPicture from '../image/img1.jpg';
import heartIcon from '../image/heart.svg';
import commentIcon from '../image/comment.svg';
import shareIcon from '../image/share.svg';
import saveIcon from '../image/save.svg';

class Homepage extends Component {
  render() {
    return (
      <div id="page-body">
        <div id="posts">
          {/* .post-div will be repeated */}
          <div className="post-div d-flex flex-column">
            <div className="post-header">
              <a href="#">
                <img className="round-image image-32" src={profilePicture} alt="Post author's image" />
              </a>
              <div className="d-flex flex-column left-15">
                <div className="font-weight-bold"><a href="#">Name</a></div>
                {/* <div><a href="#">Location</a></div> */}
              </div>
            </div>
            <div className="post-image-div">
              <img className="post-image" src={postPicture} alt="Post" />
            </div>
            <div className="post-footer">
              <div className="actions">
                <img className="action  image-22" src={heartIcon} height="24px" width="24px" aria-label="Like" alt="Like" />
                <img className="action  image-22" src={commentIcon} aria-label="Comment" alt="Comment" />
                <img className="action  image-22" src={shareIcon} aria-label="Share" alt="Share" />
                <img className="action  image-22" src={saveIcon} aria-label="Save" alt="Save" />
              </div>
              <div className="font-weight-bold line"><a href="#">27013 likes</a></div>
              <div className="line">
                <a href="#" className="font-weight-bold">Name</a>
                Description Ra-Ra Rama-Ma Ga-Ga Oh-La-La Doo-Bee-Doo-Bee-Doo
                <a href="#" className="make-gray">... more</a>
              </div>
              <div className="line"><a href="#" className="make-gray">View all 1737 comments</a></div>
              <div className="line"><a href="#" className="font-weight-bold">Commentor name</a> Comment</div>
              <div className="post-time line">8 hours ago</div>
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
          </div>

          <div className="post-div d-flex flex-column">
            <div className="post-header">
              <a href="#">
                <img className="round-image image-32" src={profilePicture} alt="Post author's image" />
              </a>
              <div className="d-flex flex-column left-15">
                <div className="font-weight-bold"><a href="#">Name</a></div>
                {/* <div><a href="#">Location</a></div> */}
              </div>
            </div>
            <div className="post-image-div">
              <img className="post-image" src={profilePicture} alt="Post" />
            </div>
            <div className="post-footer">
              <div className="actions">
                <img className="action  image-22" src={heartIcon} height="24px" width="24px" aria-label="Like" alt="Like" />
                <img className="action  image-22" src={commentIcon} aria-label="Comment" alt="Comment" />
                <img className="action  image-22" src={shareIcon} aria-label="Share" alt="Share" />
                <img className="action  image-22" src={saveIcon} aria-label="Save" alt="Save" />
              </div>
              <div className="font-weight-bold line"><a href="#">27013 likes</a></div>
              <div className="line">
                <a href="#" className="font-weight-bold">Name</a>
                Description Ra-Ra Rama-Ma Ga-Ga Oh-La-La Doo-Bee-Doo-Bee-Doo
                <a href="#" className="make-gray">... more</a>
              </div>
              <div className="line"><a href="#" className="make-gray">View all 1737 comments</a></div>
              <div className="line"><a href="#" className="font-weight-bold">Commentor name</a> Comment</div>
              <div className="post-time line">8 hours ago</div>
              <form>
                <input
                  className="add-comment"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT BAR */}
        <div id="right-bar">
          <div className="profile-section">
            <a href="#">
              <img className="round-image image-50" src={profilePicture} alt="User image" />
            </a>
            <div className="left-15">
              <div className="font-weight-bold"><a href="#">Username</a></div>
              <div>Name</div>
            </div>
          </div>

          {/* Follower suggestion */}
          <div className="d-flex justify-content-between">
            <span className="font-weight-bold">Suggestions For You</span>
            <a className="font-weight-bold">See all</a>
          </div>

          {/* .profile-section below will be repeated */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="profile-section">
              <a href="#">
                <img className="round-image image-32" src={profilePicture} alt="User image" />
              </a>
              <div>
                <div className="font-weight-bold left-15"><a href="#">Username</a></div>
                <div className="make-gray left-15">Followed by xyz + 14 more</div>
              </div>
            </div>
            <div className="sign-up font-weight-bold follow">Follow</div>
          </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <a href="#">
                  <img className="round-image image-32" src={profilePicture} alt="User image" />
                </a>
                <div>
                  <div className="font-weight-bold left-15"><a href="#">Username</a></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <a href="#">
                  <img className="round-image image-32" src={profilePicture} alt="User image" />
                </a>
                <div>
                  <div className="font-weight-bold left-15"><a href="#">Username</a></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <a href="#">
                  <img className="round-image image-32" src={profilePicture} alt="User image" />
                </a>
                <div>
                  <div className="font-weight-bold left-15"><a href="#">Username</a></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>


          <div className="d-flex justify-content-between align-items-center">
              <div className="profile-section">
                <a href="#">
                  <img className="round-image image-32" src={profilePicture} alt="User image" />
                </a>
                <div>
                  <div className="font-weight-bold left-15"><a href="#">Username</a></div>
                  <div className="make-gray left-15">Followed by xyz + 14 more</div>
                </div>
              </div>
              <div className="sign-up font-weight-bold follow">Follow</div>
            </div>
        </div>
      </div>
    )
  }
}

export default Homepage;