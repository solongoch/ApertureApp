import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import CSS
import '../css/single-post.css';
// import images
import post from '../../image/img-sq.jpg';

class SinglePost extends Component {
  render() {
    return (
      <div id="single-post-div">
        <div className="single-post">
          <div className="post-image">
            <img src={post} alt="Post" />
          </div>
        </div>
        <div className="post-details">
          <div className="post-header">
            <Link to="/profile">
              <img className="round-image image-32" src={post} alt="Post author" />
            </Link>
            <div className="d-flex flex-column left-15">
              <div className="font-weight-bold">
                <Link to="/profile">Name</Link>
              </div>
              {/* <div><Link to="/">Location</Link></div> */}
            </div>
          </div>
          <div className="comments">
            <div className="comment-div">
              <div>
                <Link to="/profile">
                  <img className="round-image image-32 commentor-image" src={post} alt="Post author" />
                </Link>
              </div>
              <div className="d-flex flex-column left-15">
                <div>
                  <Link className="font-weight-bold" to="/profile">Name</Link>
                  <div className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum sit amet quam vitae dapibus. Praesent lobortis sem sollicitudin tortor gravida dictum. Suspendisse a sem turpis. Proin finibus dignissim quam, in bibendum sapien dapibus sed. Cras dictum neque at lorem placerat vulputate. </div>
                </div>
              </div>
            </div>

            <div className="comment-div">
              <div>
                <Link to="/profile">
                  <img className="round-image image-32 commentor-image" src={post} alt="Post author" />
                </Link>
              </div>
              <div className="d-flex flex-column left-15">
                <div>
                  <Link className="font-weight-bold" to="/profile">Name</Link>
                  <div className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum sit amet quam vitae dapibus. Praesent lobortis sem sollicitudin tortor gravida dictum. Suspendisse a sem turpis. Proin finibus dignissim quam, in bibendum sapien dapibus sed. Cras dictum neque at lorem placerat vulputate. </div>
                </div>
              </div>
            </div>

            <div className="comment-div">
              <div>
                <Link to="/profile">
                  <img className="round-image image-32 commentor-image" src={post} alt="Post author" />
                </Link>
              </div>
              <div className="d-flex flex-column left-15">
                <div>
                  <Link className="font-weight-bold" to="/profile">Name</Link>
                  <div className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum sit amet quam vitae dapibus. Praesent lobortis sem sollicitudin tortor gravida dictum. Suspendisse a sem turpis. Proin finibus dignissim quam, in bibendum sapien dapibus sed. Cras dictum neque at lorem placerat vulputate. </div>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            <i className="far fa-heart fa-2x action"></i>
            <i className="far fa-comment fa-2x action"></i>
            <i className="far fa-paper-plane fa-2x action"></i>
            <i className="far fa-bookmark fa-2x action"></i>
          </div>
          <div className="likes">
            {/* <img src={post} className="round-image image-22" /> */}
            <span className="font-weight-bold">1234 likes</span>
          </div>
          <div className="posted-date">May 23</div>
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
    )
  }
}

export default SinglePost;