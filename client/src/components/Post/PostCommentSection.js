import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import CSS
import './single-post.css';
// import images
import post from '../../image/img-sq.jpg';

class PostCommentSection extends Component {
  render() {
    return (

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
          
          
          
        
      
    )
  }
}

export default PostCommentSection;