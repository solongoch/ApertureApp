import React, { Component } from "react";
import { Link } from "react-router-dom";
// import CSS
import "./single-post.css";
// import images
import profilePhoto from "../../image/img-sq.jpg";

class PostHeader extends Component {
  render() {
    const { postedBy }= this.props;
    return (
      <div className="post-header">
        <Link to="/profile">
          <img className="round-image image-32" src={postedBy.avatar} alt="Post author" />
        </Link>
        <div className="d-flex flex-column left-15">
          <div className="font-weight-bold">
            <Link to={`/profile/${postedBy.username}`}>{postedBy.username}</Link>
          </div>
          {/* <div><Link to="/">Location</Link></div> */}
        </div>
      </div>
    );
  }
}


export default PostHeader;