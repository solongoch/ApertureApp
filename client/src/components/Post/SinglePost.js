import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
// import Action
import { getSinglePost } from '../../actions/postActions';
// import CSS
import './single-post.css';
// import Components
import PostSidebar from './PostSidebar';
import PostHeader from './PostHeader';

class SinglePost extends Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.postId, this.props.history)
  }

  render() {
    const { post }= this.props;
    if (!post) {
      return (<Spinner />)
    }
    return (
      <div id="single-post-div">
        <div className="single-post">
          <div className="post-image">
            <img src={post.photo} alt="Post" />
          </div>
        </div>
        <div className="sidebar">
          <PostHeader postedBy={post.postedBy} />
          <PostSidebar post={post} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post.post
});

export default connect(mapStateToProps, { getSinglePost })(SinglePost);