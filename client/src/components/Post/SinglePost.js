import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
// import CSS
import './single-post.css';
// import images
import PostSidebar from './PostSidebar';

import PostHeader from './PostHeader';


class SinglePost extends Component {

  componentDidMount() {
    if (this.props.match.params.postId) {
      let postId = this.props.match.params.postId;
      this.props.getPost(postId);
    }
  }

  render() {
    const { post } = this.props;
    return (
      <div id="single-post-div">
        <div className="single-post">
          <PostHeader post={post}></PostHeader>
          <div className="post-image">
            <img src={post.photo} alt="Post" />
          </div>
        </div>
        <PostSidebar post={post}></PostSidebar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post.post
})

export default connect(mapStateToProps, { getPost })(SinglePost);