import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../common/Spinner';
// import Action
import { getHomepagePosts } from "../../actions/homeActions";
import {getSinglePost} from "../../actions/postActions";
// import Component
import PostComment from '../Post/PostComment';
import HomeSuggestion from "./HomeSuggestion";
// import CSS
import "./homepage.css";
import PostActions from "../Post/PostActions";

class Homepage extends Component {
  componentDidMount() {
    this.props.getHomepagePosts(this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const { posts } = this.props.posts;
    if (!posts) {
      return (<Spinner />)
    }
    const postItem = posts.map(post => (     
      <div className="post-div d-flex flex-column" key={Math.random()}>
        {/* POST HEADER - Avatar and Username */}
        <div className="post-header">
          {/* AVATAR */}
          <Link to={`/profile/${post.postedBy.username}`}>
            <img
              className="round-image image-32"
              src={post.postedBy.avatar}
              alt="Post author"
            />
          </Link>
          {/* USERNAME */}
          <div className="d-flex flex-column left-15">
            <div className="font-weight-bold">
              <Link to={`/profile/${post.postedBy.username}`}>{post.postedBy.username}</Link>
            </div>
            {/* <div><Link to="/">Location</Link></div> */}
          </div>
        </div>

        {/* ACTUAL POST PHOTO */}
        <div className="post-image-div">
          <img className="post-image" src={post.photo} alt="Post" />
        </div>
        {/* POST FOOTER - Actions, Caption, Likes, Comments and Add comment form */}
        <div className="post-footer">
          {/* ACTIONS */}
          <PostActions post={post}/>
          {/* POST CAPTION */}
          {(post.caption) ?
            <div className="line">
              <Link to={`/profile/${post.postedBy.username}`} className="font-weight-bold right-5">
                {post.postedBy.username}
              </Link>
                {post.caption}
            </div>
            : null
          }
          {/* COMMENTS */}
          {(post.comments.length !== 0) ? 
            // (<div className="line">
            //   <Link to="/" className="make-gray">
            //     View all {post.comments.length} comments
            //   </Link>
            // </div>)
            (post.comments.map(comment => {
              return (
              <div className="line" key={Math.random()}>
                <Link to={`/profile/${comment.username}`} className="font-weight-bold right-5">
                  {comment.username}
                </Link>
                {comment.commentBody}
              </div> )}
              ))
            : null
          }
          <div className="post-time line">
            <Moment fromNow>{post.timePosted}</Moment>
          </div>
          {/* ADD COMMENT */}
          
        </div>
      </div>
    ));

    return (
      <div id="homepage-body">
        <div id="posts">
          {postItem}
        </div>

        {/* RIGHT BAR */}
        <div id="right-bar">
          <div className="profile-section">
            <Link to={`/profile/${user.username}`}>
              <img
                className="round-image image-50"
                src={user.avatar}
                alt="User"
              />
            </Link>
            <div className="left-15">
              <div className="font-weight-bold">
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
              </div>
              <div>{user.name}</div>
            </div>
          </div>

          {/* Follower suggestion */}
          <HomeSuggestion />
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.post
});

export default connect(mapStateToProps, { getHomepagePosts, getSinglePost })(Homepage);