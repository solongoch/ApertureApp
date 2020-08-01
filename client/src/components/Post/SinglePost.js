import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getSinglePost } from '../../actions/postActions';
// import CSS
import './single-post.css';
// import images
import post from '../../image/img-sq.jpg';
// import Components
import PostSidebar from './PostSidebar';
import PostHeader from './PostHeader';

class SinglePost extends Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.post_id)
  }

  render() {
    return (
      <div id="single-post-div">
        <div className="single-post">
        <PostHeader></PostHeader>
          <div className="post-image">
            <img src={post} alt="Post" />
          </div>
        </div>
        <PostSidebar></PostSidebar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getSinglePost })(withRouter(SinglePost));